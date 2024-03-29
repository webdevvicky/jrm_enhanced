import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PlusCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { dateConvert } from "../../utils/dateConvertionUtils";
import Loader from "../Common/Loader/Loader";
import poPendingPaymentService from "../../services/po/poPendingPaymentService";

interface PendingPo {
  projectId: string;
}

const PendingPoPayment = ({ projectId }: PendingPo) => {
  const {
    isError,
    isLoading,
    data: poPendingPaymentList = [],
  } = useQuery({
    queryKey: ["poPendingPaymentList", projectId],
    queryFn: async () => {
      const res: AxiosResponse<PoPendingPaymentProps[]> =
        await poPendingPaymentService.getById(projectId);
      return res.data;
    },
  });
  if (isError) {
    return <Loader isError />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" bg-white border rounded-3  p-3 my-3">
      <table className="  table table-borderless  border-primary text-center">
        <thead>
          <tr>
            <th>S No</th>
            <th>PO No</th>
            <th>Date</th>
            <th>Stage</th>
            <th>Approved Rate</th>
            <th>Amount Paid</th>
            <th>Balance Amount</th>
            <th>Generate Voucher</th>
          </tr>
        </thead>
        <tbody>
          {poPendingPaymentList.map((po, index) => (
            <tr key={po._id}>
              <td>{index + 1}</td>
              <td>{po.poNumber}</td>
              <td>{dateConvert(po.date)}</td>
              <td>{po.stage}</td>
              <td>{po.totalAmount}</td>
              <td>{po.payedAmount || 0}</td>
              <td>{po.balanceAmount}</td>
              <td>
                <Link
                  to={"/accounts/voucher/new"}
                  state={{ type: "purchaseOrder", _id: po._id }}
                >
                  <PlusCircle />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingPoPayment;
