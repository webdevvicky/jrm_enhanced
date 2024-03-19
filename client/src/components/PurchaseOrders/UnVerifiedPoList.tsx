import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import poVerifyService from "../../services/po/poVerifyService";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import VerifyButton from "../Common/AuthButtons/VerifyButton";
import EditButton from "../Common/AuthButtons/EditButton";
import Loader from "../Common/Loader/Loader";
import { hasEditAuth, isAdmin } from "../../utils/auth";

const UnVerifiedPoList = () => {
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,
    isRefetching,
    data: unVerifiPoList = [],
  } = useQuery({
    queryKey: ["unVerifiPoList"],
    queryFn: async () => {
      const res: AxiosResponse<UnverifiedPoProps[]> =
        await poVerifyService.getall();
      return res.data;
    },
  });

  async function handleVerify(id: string) {
    const upadated = { _id: id, isVerified: true };
    await poVerifyService.update(upadated);
    await refetch();
  }

  if (isLoading || isRefetching) {
    return <Loader />;
  }

  if (unVerifiPoList.length <= 0 && isAdmin()) {
    return null;
  }
  return (
    <div className="container bg-white  rounded-3 border my-5">
      <table className="table table-borderless text-center">
        <thead>
          <tr>
            <th>S.no</th>
            <th>PO No</th>
            <th>Project Name</th>
            <th>Stage</th>
            <th>View</th>
            <th>Edit</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {unVerifiPoList.map((po, index) => (
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
                  isRejected={hasEditAuth()}
                  onClick={() =>
                    navigate(`/accounts/purchaseorder/edit/${po._id}`)
                  }
                />
              </td>
              <td>
                <VerifyButton
                  isRejected={po.isRejected}
                  onClick={() => handleVerify(po._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnVerifiedPoList;
