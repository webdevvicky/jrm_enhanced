import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import poVerifyService from "../../services/po/poVerifyService";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import EditButton from "../Common/AuthButtons/EditButton";
import Loader from "../Common/Loader/Loader";
import poApprovelService from "../../services/po/poApprovelService";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import poService from "../../services/po/poService";

const UnApprovedPoList = () => {
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,

    isError,
    data: unApprovedPoList = [],
  } = useQuery({
    queryKey: ["unApprovedPoList", "unVerifiPoList"],
    queryFn: async () => {
      const res: AxiosResponse<UnApprovedPoProps[]> =
        await poApprovelService.getall();
      return res.data;
    },
  });

  async function handleApprovel(id: string) {
    const upadated = { _id: id, isApproved: true };
    await poApprovelService.update(upadated);
    await refetch();
  }

  async function handleReject(id: string) {
    const upadated = { _id: id, isRejected: true };
    await poApprovelService.update(upadated);
    await refetch();
  }
  async function handleDelete(id: string) {
    await poService.delete(id);
    await refetch();
  }

  if (isLoading) {
    return <Loader />;
  }

  // if (unApprovedPoList.length <= 0 && isAdmin()) {
  //   return null;
  // }
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
            <th>Stage</th>
            <th>View</th>
            <th>Edit</th>
            <th>Reject</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {unApprovedPoList.map((po, index) => (
            <tr key={po._id}>
              <td>{index + 1}</td>
              <td>{po.poNumber}</td>
              <td>{po.project?.name}</td>
              <td>{po.stage}</td>
              <td>
                <Link to={"/view"}>
                  <FileEarmark size={30} />
                </Link>
              </td>
              <td>
                <EditButton
                  isRejected={po.isRejected}
                  onClick={() =>
                    navigate(`/accounts/purchaseorder/edit/${po._id}`)
                  }
                />
              </td>
              <td>
                <RejectButton
                  isRejected={po.isRejected}
                  isApproved={po.isApproved}
                  onClick={() => handleReject(po._id)}
                />
              </td>
              <td>
                <ApprovelButton
                  isApproved={po.isApproved}
                  onClick={() => handleApprovel(po._id)}
                />
              </td>
              <td>
                <DeleteButton
                  isApproved={po.isApproved}
                  onClick={() => handleDelete(po._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnApprovedPoList;
