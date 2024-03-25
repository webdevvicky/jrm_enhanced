import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import EditButton from "../Common/AuthButtons/EditButton";
import Loader from "../Common/Loader/Loader";
import poApprovelService from "../../services/po/poApprovelService";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import poService from "../../services/po/poService";
import { isAdmin } from "../../utils/auth";
import voucherApprovelService from "../../services/voucher/voucherApprovelService";
import voucherService from "../../services/voucher/voucherService";

const UnApprovedPoList = () => {
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,

    isError,
    data: unApprovedVoucherList = [],
  } = useQuery({
    queryKey: ["unApprovedVoucherList"],
    queryFn: async () => {
      const res: AxiosResponse<UnApprovedVoucherProps[]> =
        await voucherApprovelService.getall();
      return res.data;
    },
  });

  async function handleApprovel(id: string) {
    const upadated = { _id: id, isApproved: true };
    await voucherApprovelService.update(upadated);
    await refetch();
  }

  async function handleReject(id: string) {
    const upadated = { _id: id, isRejected: true };
    await voucherService.update(upadated);
    await refetch();
  }
  async function handleDelete(id: string) {
    await voucherService.delete(id);
    await refetch();
  }

  if (isLoading) {
    return <Loader />;
  }

  if (
    !Array.isArray(unApprovedVoucherList) ||
    unApprovedVoucherList.length === 0
  ) {
    if (isAdmin()) {
      return null;
    }
    return <div>No unapproved Vouchers orders found.</div>;
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
            <th>Date</th>
            <th>Type</th>
            <th>Voucher No</th>
            <th>Project Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Reject</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {unApprovedVoucherList?.map((voucher, index) => (
            <tr key={voucher._id}>
              <td>{index + 1}</td>
              <td>{voucher.date}</td>
              <td>{voucher.type}</td>
              <td>{voucher.voucherNumber}</td>
              <td>{voucher.project.projectName}</td>

              <td>
                <Link to={`/accounts/voucher/view/${voucher._id}`}>
                  <FileEarmark size={30} />
                </Link>
              </td>
              <td>
                <EditButton
                  isRejected={voucher.isRejected}
                  onClick={() =>
                    navigate(`/accounts/voucher/edit/${voucher._id}`)
                  }
                />
              </td>
              <td>
                <RejectButton
                  isRejected={voucher.isRejected}
                  isApproved={voucher.isApproved}
                  onClick={() => handleReject(voucher._id)}
                />
              </td>
              <td>
                <ApprovelButton
                  isApproved={voucher.isApproved}
                  onClick={() => handleApprovel(voucher._id)}
                />
              </td>
              <td>
                <DeleteButton
                  isApproved={voucher.isApproved}
                  onClick={() => handleDelete(voucher._id)}
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
