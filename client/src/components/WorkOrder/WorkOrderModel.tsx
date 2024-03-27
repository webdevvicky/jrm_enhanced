import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import woModelService from "../../services/workOrder/woModelService";
import { formatDate } from "../../utils/dateConvertionUtils";
import Loader from "../Common/Loader/Loader";
import VoucherHistory from "../Vouchers/VoucherHistory";

const WorkOrderModel = () => {
  const [workOrder, setWorkOrder] = useState<WorkOrderModelProps>();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    woModelService
      .getById(`${id}`)
      .then((res: AxiosResponse) => setWorkOrder(res.data))
      .catch((err: any) => handleApiError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className=" container  bg-white  rounded-2  border-primary-subtle p-3">
        <table className=" table table-bordered  border-primary ">
          <thead>
            <tr>
              <th colSpan={5} className=" text-center ">
                JRM CONSTRUCTION -WORK ORDER
              </th>
              <th className=" text-end">Work Order No </th>
              <th>{workOrder?.woNumber}</th>
            </tr>
            <tr>
              <th colSpan={5}>
                <div className=" d-flex justify-content-between ">
                  <div> Project Name : {workOrder?.project.projectName}</div>

                  <div> Contractor Name : {workOrder?.project.projectName}</div>
                </div>
              </th>

              <th className=" text-end">Date </th>
              <th>{workOrder?.woNumber}</th>
            </tr>
            <tr>
              <th>S.NO</th>
              <th>Date</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {workOrder?.items.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.description}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>{item.rate}</td>
                <td>{item.qty * item.rate}</td>
              </tr>
            ))}
            <tr className=" fw-bold ">
              <td colSpan={6} className=" text-end ">
                Total Amount
              </td>
              <td>{workOrder?.totalAmount}</td>
            </tr>
            <tr className=" text-center">
              <td colSpan={7}>
                <div className=" d-flex justify-content-around ">
                  <div className="  ">
                    <span className=" fw-bold   ">
                      {workOrder?.createdBy?.name}
                    </span>
                    <br />
                    <span>Created By</span>
                  </div>
                  <div>
                    <span className=" fw-bold ">
                      {workOrder?.verifiedBy ? (
                        workOrder?.verifiedBy.name
                      ) : (
                        <span className=" text-danger "> Not Verified</span>
                      )}
                    </span>
                    <br />
                    <span>Verified By </span>
                  </div>
                  <div>
                    <span className=" fw-bold ">
                      {workOrder?.approvedBy ? (
                        workOrder?.approvedBy.name
                      ) : (
                        <span className=" text-danger "> Not Approved</span>
                      )}
                    </span>
                    <br />
                    <span>Approved By</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className=" text-center">
              <th colSpan={7}>Terms & Conditions</th>
            </tr>
            {workOrder?.terms.map((term) => (
              <tr>
                <td colSpan={7}>{term.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <VoucherHistory vouchers={workOrder?.vouchers} />
      </div>
    </>
  );
};

export default WorkOrderModel;
