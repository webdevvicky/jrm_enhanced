import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { FileEarmark } from "react-bootstrap-icons";
import VerifyButton from "../Common/AuthButtons/VerifyButton";
import EditButton from "../Common/AuthButtons/EditButton";
import Loader from "../Common/Loader/Loader";
import { hasEditAuth, isAdmin } from "../../utils/auth";
import woVerifyService from "../../services/workOrder/woVerifyService";
import Header from "../Common/Header/Header";
import { Link, useNavigate } from "react-router-dom";

const UnVerifiedWorkOrderList = () => {
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,
    isRefetching,
    data: unVerifiedWoList = [],
  } = useQuery({
    queryKey: ["unVerifiedWoList"],
    queryFn: async () => {
      const res: AxiosResponse<UnverifiedWorkOrderProps[]> =
        await woVerifyService.getall();
      return res.data;
    },
  });

  async function handleVerify(id: string) {
    const upadated = { _id: id, isVerified: true };
    await woVerifyService.update(upadated);
    await refetch();
  }

  if (isLoading || isRefetching) {
    return <Loader />;
  }

  if (unVerifiedWoList.length <= 0 && isAdmin()) {
    return null;
  }

  return (
    <div className="container bg-white  rounded-3 border my-5">
      <div className="row p-3">
        <div className="col-md-12 ">
          <Header lable="Work Order Verification" />
        </div>
      </div>
      <table className="table table-borderless text-center">
        <thead>
          <tr>
            <th>S.no</th>
            <th>PO No</th>
            <th>Project Name</th>
            <th>contractor</th>
            <th>View</th>
            <th>Edit</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {unVerifiedWoList.map((wo, index) => (
            <tr key={wo._id}>
              <td>{index + 1}</td>
              <td>{wo.woNumber}</td>
              <td>{wo.project?.projectName}</td>
              <td>{wo.contractor?.name}</td>
              <td>
                <Link to={`/execution/workorder/view/${wo._id}`}>
                  <FileEarmark size={30} />
                </Link>
              </td>
              <td>
                <EditButton
                  isRejected={hasEditAuth()}
                  onClick={() =>
                    navigate(`/execution/workorder/edit/${wo._id}`)
                  }
                />
              </td>
              <td>
                <VerifyButton
                  isRejected={wo.isRejected}
                  onClick={() => handleVerify(wo._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnVerifiedWorkOrderList;
