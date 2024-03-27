
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import voucherModelService from "../../services/voucher/voucherModelService";
import { AxiosResponse } from "axios";
import Loader from "../Common/Loader/Loader";
import { handleApiError } from "../../utils/apiUtils";
import VoucherHistory from "./VoucherHistory";
import { formatDate } from "../../utils/dateConvertionUtils";

const VoucherModel = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState<VoucherModelProps>();
  const [vouchersHistory, setVouchersHistory] = useState<VoucherModelProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    voucherModelService
      .getById(`${id}`)
      .then((res: AxiosResponse) => {
        setVoucher(res.data.currentVoucher);
        setVouchersHistory(res.data.previousVouchers);

        setIsLoading(false);
      })
      .catch((err: any) => {
        handleApiError(err);
        setIsError(true);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError />;
  }

  return (
    <>
      <div className=" container bg-white  rounded-3 py-3 ">
        <table className=" table table-bordered   border-primary ">
          <thead>
            <tr>
              <th colSpan={3} className=" text-center">
                JRM CONSTRUCTION - {voucher?.type}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" w-50">Name : {voucher?.name}</td>
              <td className=" text-end w-25">Voucher No</td>
              <td className=" w-25"> {voucher?.voucherNumber}</td>
            </tr>
            <tr>
              <td className=" w-50">
                Project Name : {voucher?.project.projectName}
              </td>
              <td className=" text-end w-25">Date</td>
              <td className=" w-25"> {formatDate(voucher?.date)}</td>
            </tr>
            <tr>
              <td colSpan={3} className=" h-50">
                Description : {voucher?.description}
              </td>
            </tr>
            <tr className=" text-center">
              <td>Total Payment</td>
              <td>Payable Amount</td>
              <td>Payment Mode</td>
            </tr>
            <tr className=" text-center">
              <td>{voucher?.totalAmount}</td>
              <td>{voucher?.payableAmount}</td>
              <td>{voucher?.paymentMode}</td>
            </tr>
            <tr className=" text-center">
              <td colSpan={3}>
                <div className=" d-flex justify-content-around ">
                  <div className="  ">
                    <span className=" fw-bold   ">
                      {voucher?.createdBy?.name}
                    </span>
                    <br />
                    <span>Created By</span>
                  </div>
                  <div>
                    <span className=" fw-bold ">
                      {voucher?.verifiedBy?.name}
                    </span>
                    <br />
                    <span>Verified By </span>
                  </div>
                  <div>
                    <span className=" fw-bold ">
                      {voucher?.approvedBy?.name}
                    </span>
                    <br />
                    <span>Approved By</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className=" mt-3">
        <VoucherHistory vouchers={vouchersHistory} />
      </div>
    </>
  );
};

export default VoucherModel;
