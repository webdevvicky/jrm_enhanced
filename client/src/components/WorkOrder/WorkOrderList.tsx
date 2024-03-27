import { useEffect, useState } from "react";
import Header from "../Common/Header/Header";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import { ProjectOption } from "../../interfaces/CommonProps";
import { Link } from "react-router-dom";
import { PlusCircleDotted } from "react-bootstrap-icons";
import woPendingPaymentService from "../../services/workOrder/woPendingPaymentService";
import { AxiosResponse } from "axios";
import { formatDate } from "../../utils/dateConvertionUtils";

const WorkOrderList = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectOption>();
  const [PendingPayment, setPendingPayment] = useState<
    WorkOrderPendingPaymentProps[]
  >([]);
  useEffect(() => {
    if (selectedProject?._id) {
      woPendingPaymentService
        .getById<WorkOrderPendingPaymentProps[]>(`${selectedProject?._id}`)
        .then((res: AxiosResponse) => {
          setPendingPayment(res.data);
        });
    }
  }, [selectedProject]);

  return (
    <>
      <div className="container bg-white  rounded-3 border ">
        {/*  select Project option from the list */}

        <div className="row d-flex   align-items-center p-1">
          <div className="col-md-6">
            <Header lable=" Work Order" />
          </div>
          <div className="col-md-6">
            <SelectProjectComponent
              onChange={(project: ProjectOption) => setSelectedProject(project)}
            />
          </div>
        </div>
      </div>

      {/*  showing new Btn */}

      <div className=" container mt-2">
        <Link to={"new"}>
          <PlusCircleDotted size={40} />
        </Link>
      </div>

      {/* Pending WorkOrder List */}

      <div className="container bg-white  border  rounded-3 ">
        <div className=" pt-3">
          <Header lable="Pending Payments" />
        </div>
        <div>
          <table className=" table table-borderless text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Wo No</th>
                <th>Contractor</th>
                <th>Approved Rate</th>
                <th>Amount Paid</th>
                <th>Balance Amount</th>
                <th>Generate Voucher</th>
              </tr>
            </thead>
            <tbody>
              {PendingPayment.length >= 1 ? (
                PendingPayment.map((wo, index) => (
                  <tr key={wo._id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(wo.date)}</td>
                    <td>{wo.woNumber}</td>
                    <td>{wo.contractor.name}</td>
                    <td>{wo.totalAmount}</td>
                    <td>{wo.payedAmount}</td>
                    <td>{wo.balanceAmount}</td>
                    <td>
                      <Link
                        to={"/accounts/voucher/new"}
                        state={{ _id: wo._id, type: "workOrder" }}
                      >
                        generate
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className=" text-center">
                  <td colSpan={8}> No Pending Payment Work Orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WorkOrderList;
