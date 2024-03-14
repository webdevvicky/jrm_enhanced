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
import vendorService from "../../services/vendor/vendorService";
import vendorApprovelService from "../../services/vendor/vendorApprovelService";

const VendorsStatus = () => {
  const navigate = useNavigate();

  const handleReject = (id: string) => {
    vendorService.update({ _id: id, isRejected: true });
    refetch();
  };

  const handleApprove = (id: string) => {
    vendorService.update({ _id: id, isApproved: true, isRejected: false });
    refetch();
  };
  const handleDelete = (id: string) => {
    vendorService.delete(id);
    refetch();
  };

  const {
    isLoading,
    isError,
    refetch,
    data: ApprovelList = [],
  } = useQuery({
    queryKey: [handleReject, handleDelete, handleApprove],
    queryFn: async () => {
      const res: AxiosResponse<VendorApprovelListProps[]> =
        await vendorApprovelService.getall();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError={isError} />;
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
              <th>Address</th>
              <th>Items</th>
              <th>Rate</th>
              <th>View</th>
              <th>Edit</th>
              <th>Reject</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ApprovelList.map((vendor, index) => (
              <tr key={vendor._id}>
                <td>{index + 1}</td>
                <td>{vendor.name}</td>
                <td>{vendor.address}</td>
                <td>{vendor.items}</td>
                <td>{vendor.rate}</td>
                <td>
                  {" "}
                  <Link
                    to={`/designs/quote/model/${vendor._id}`}
                    state={{ isEdit: true }}
                  >
                    <FileEarmark size={30} className="mx-2" />
                  </Link>
                </td>
                <td>
                  <EditButton
                    isRejected={vendor.isRejected}
                    onClick={() =>
                      navigate(`/designs/quote/edit/${vendor._id}`)
                    }
                  />
                </td>
                <td>
                  <RejectButton
                    isRejected={vendor.isRejected}
                    onClick={() => handleReject(vendor._id)}
                  />
                </td>
                <td>
                  <ApprovelButton
                    isApproved={vendor.isApproved}
                    onClick={() => handleApprove(vendor._id)}
                  />
                </td>
                <td>
                  <DeleteButton
                    isApproved={vendor.isApproved}
                    onClick={() => handleDelete(vendor._id)}
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

export default VendorsStatus;
