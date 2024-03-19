import { useQuery } from "@tanstack/react-query";
import Header from "../Common/Header/Header";
import { AxiosResponse } from "axios";
import EditButton from "../Common/AuthButtons/EditButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import Loader from "../Common/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import contractorApprovelService from "../../services/contractor/contractorApprovelService";
import contractorService from "../../services/contractor/contractorService";

const ContractorStatus = () => {
  const navigate = useNavigate();

  const handleReject = (id: string) => {
    contractorService.update({ _id: id, isRejected: true });
    refetch();
    refetch();
  };

  const handleApprove = (id: string) => {
    contractorService.update({ _id: id, isApproved: true, isRejected: false });
    refetch();
    refetch();
  };
  const handleDelete = (id: string) => {
    contractorService.delete(id);
    refetch();
    refetch();
  };

   

  const {
    isLoading,
    isError,
    refetch,
    isRefetching,

    data: contractorApprovelList=[],
  } = useQuery({
    queryKey: [
      "contractorApprovelList",
      handleReject,
      handleDelete,
      handleApprove,
    ],
    queryFn: async () => {
      const res: AxiosResponse<ContractorApprovelListProps[]> =
        await contractorApprovelService.getall();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError={isError} />;
  }
  if (isRefetching) {
    return <Loader />;
  }
  return (
    <div className=" container ">
      <div className="row mt-3">
        <Header lable="Vendor Status" />
      </div>
      <div className=" table-responsive-md border rounded-4 bg-white p-1">
        <table className=" table text-center table-borderless  ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Rate</th>
              <th>View</th>
              <th>Edit</th>
              <th>Reject</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contractorApprovelList.map((contractor, index) => (
              <tr key={contractor._id}>
                <td>{index + 1}</td>
                <td>{contractor.name}</td>
                <td>{contractor.catagory}</td>
                <td>{contractor.rate}</td>
                <td>
                  {" "}
                  <Link to={`/accounts/contractor/view/${contractor._id}`}>
                    <FileEarmark size={30} className="mx-2" />
                  </Link>
                </td>
                <td>
                  <EditButton
                    isRejected={contractor.isRejected}
                    onClick={() =>
                      navigate(`/accounts/contractor/edit/${contractor._id}`)
                    }
                  />
                </td>
                <td>
                  <RejectButton
                    isRejected={contractor.isRejected}
                    onClick={() => handleReject(contractor._id)}
                  />
                </td>
                <td>
                  <ApprovelButton
                    isApproved={contractor.isApproved}
                    onClick={() => handleApprove(contractor._id)}
                  />
                </td>
                <td>
                  <DeleteButton
                    isApproved={contractor.isApproved}
                    onClick={() => handleDelete(contractor._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractorStatus;
