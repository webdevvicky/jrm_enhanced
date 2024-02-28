import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import voucherService from "../../services/voucher/voucherService";
import { handleApiError } from "../../utils/apiUtils";
import { format } from "date-fns";
import Loader from "../Common/Loader/Loader";

const VoucherModel = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState<VoucherModelProps>();

  useEffect(() => {
    voucherService
      .getById<VoucherModelProps>(`${id}`)
      .then((res: AxiosResponse) => {
        setVoucher(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, []);

  return (
    <div>
      {!voucher && <Loader />}
      {voucher && (
        <div className=" container  printmodel">
          <div className="">
            <table className=" table table-bordered border-primary  ">
              <thead>
                <tr className=" text-center">
                  <th colSpan={2}>JRM CONSTRUCTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name : {voucher?.receiverName}</td>
                  <td>Voucher No : {voucher?.voucherNumber}</td>
                </tr>
                <tr>
                  <td>
                    Site Name :{" "}
                    {`Mr.${voucher?.clientName} - ${voucher?.projectName}`}
                  </td>
                  <td>
                    Date :
                    {voucher?.voucherDate
                      ? format(new Date(voucher.voucherDate), "dd/MM/yyyy")
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Payment Description : {voucher?.description}
                  </td>
                </tr>
                <tr className=" text-center ">
                  <td>TotalPayment</td>
                  <td rowSpan={2} className=" align-middle ">
                    <div className=" ">
                      Payment Mode : {voucher?.paymentMethod}
                    </div>
                  </td>
                </tr>
                <tr className=" text-center ">
                  <td>{voucher?.paymentAmount}</td>
                </tr>
                <tr>
                  <td colSpan={2} className=" text-center ">
                    <div className=" d-flex  justify-content-between   mb-0 pb-0">
                      <ul className=" list-unstyled ">
                        <li className=" mb-2">Print by</li>
                        <li>{voucher?.printedByName}</li>
                        <li>{voucher?.printedById}</li>
                        <li>Name & Sign </li>
                      </ul>

                      <div>
                        <ul className=" list-unstyled ">
                          <li className=" mb-2">Print by</li>
                          <li>{voucher?.printedByName}</li>
                          <li>{voucher?.printedById}</li>
                          <li>Name & Sign </li>
                        </ul>
                      </div>
                      <div>
                        <ul className=" list-unstyled ">
                          <li className=" mb-2">Print by</li>
                          <li>{voucher?.printedByName}</li>
                          <li>{voucher?.printedById}</li>
                          <li>Name & Sign </li>
                        </ul>
                      </div>
                      <div>
                        <ul className=" list-unstyled ">
                          <li className=" mb-2">Print by</li>
                          <li>{voucher?.printedByName}</li>
                          <li>{voucher?.printedById}</li>
                          <li>Name & Sign </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherModel;
