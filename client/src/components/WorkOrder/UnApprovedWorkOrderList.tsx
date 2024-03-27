import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import EditButton from "../Common/AuthButtons/EditButton";
import Loader from "../Common/Loader/Loader";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import { isAdmin } from "../../utils/auth";
import woApprovelService from "../../services/workOrder/woApprovelService";
import woService from "../../services/workOrder/woService";

const UnApprovedWorkOrderList = () => {
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,
    isError,
    data: unApprovedWoList = [],
  } = useQuery({
    queryKey: ["unApprovedWoList"],
    queryFn: async () => {
      const res: AxiosResponse<UnApprovedWorkOrderProps[]> =
        await woApprovelService.getall();
      return res.data;
    },
  });

  async function handleApprovel(id: string) {
    const upadated = { _id: id, isApproved: true };
    await woApprovelService.update(upadated);
    await refetch();
  }

  async function handleReject(id: string) {
    const upadated = { _id: id, isRejected: true };
    await woApprovelService.update(upadated);
    await refetch();
  }
  async function handleDelete(id: string) {
    await woService.delete(id);
    await refetch();
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!Array.isArray(unApprovedWoList) || unApprovedWoList.length === 0) {
    if (isAdmin()) {
      return null;
    }
    return <div>No unapproved Work orders found.</div>;
  }

  if (isError) {
    return <Loader isError />;
  }

  return (
    <div className=" container bg-white  rounded-3 border ">
      <table className="table table-borderless text-center">
        <thead>
          <tr>
            <th>S.no</th>
            <th>PO No</th>
            <th>Project Name</th>
            <th>Contractor</th>
            <th>View</th>
            <th>Edit</th>
            <th>Reject</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {unApprovedWoList?.map((wo, index) => (
            <tr key={wo._id}>
              <td>{index + 1}</td>
              <td>{wo?.woNumber}</td>
              <td>{wo?.project?.name}</td>
              <td>{wo.contractor?.name}</td>
              <td>
                <Link to={`/execution/workorder/view/${wo._id}`}>
                  <FileEarmark size={30} />
                </Link>
              </td>
              <td>
                <EditButton
                  isRejected={wo.isRejected}
                  onClick={() =>
                    navigate(`/execution/workorder/edit/${wo._id}`)
                  }
                />
              </td>
              <td>
                <RejectButton
                  isRejected={wo.isRejected}
                  isApproved={wo.isApproved}
                  onClick={() => handleReject(wo._id)}
                />
              </td>
              <td>
                <ApprovelButton
                  isApproved={wo.isApproved}
                  onClick={() => handleApprovel(wo._id)}
                />
              </td>
              <td>
                <DeleteButton
                  isApproved={wo.isApproved}
                  onClick={() => handleDelete(wo._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnApprovedWorkOrderList;
