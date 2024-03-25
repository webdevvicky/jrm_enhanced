import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import VerifyButton from "../Common/AuthButtons/VerifyButton";
import EditButton from "../Common/AuthButtons/EditButton";
import Loader from "../Common/Loader/Loader";
import { hasEditAuth, isAdmin } from "../../utils/auth";
import voucherVerifyService from "../../services/voucher/voucherVerifyService";

const UnVerifiedVoucherList = () => {
  const navigate = useNavigate();

  const {
    refetch,
    isLoading,
    isRefetching,
    data: unVerifiedVoucherList = [],
  } = useQuery({
    queryKey: ["unVerifiedVoucherList"],
    queryFn: async () => {
      const res: AxiosResponse<UnverifiedVoucherProps[]> =
        await voucherVerifyService.getall();
      return res.data;
    },
  });

  async function handleVerify(id: string) {
    const upadated = { _id: id, isVerified: true };
    await voucherVerifyService.update(upadated);
    await refetch();
  }

  if (isLoading || isRefetching) {
    return <Loader />;
  }

  if (unVerifiedVoucherList.length <= 0 && isAdmin()) {
    return null;
  }
  console.log(unVerifiedVoucherList);
  return (
    <div className="container bg-white  rounded-3 border my-5">
      <table className="table table-borderless text-center">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Date</th>
            <th>Type</th>
            <th>Voucher No No</th>
            <th>Project Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {unVerifiedVoucherList.map((voucher, index) => (
            <tr key={voucher._id}>
              <td>{index + 1}</td>
              <td>{voucher.type}</td>
              <td>{voucher.date}</td>
              <td>{voucher.voucherNumber}</td>
              <td>{voucher.project?.name}</td>

              <td>
                <Link to={`/accounts/voucher/view/${voucher._id}`}>
                  <FileEarmark size={30} />
                </Link>
              </td>
              <td>
                <EditButton
                  isRejected={hasEditAuth()}
                  onClick={() =>
                    navigate(`/accounts/voucher/edit/${voucher._id}`)
                  }
                />
              </td>
              <td>
                <VerifyButton
                  isRejected={voucher.isRejected}
                  onClick={() => handleVerify(voucher._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnVerifiedVoucherList;
