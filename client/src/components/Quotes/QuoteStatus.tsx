import { useQuery } from "@tanstack/react-query";
import Header from "../Common/Header/Header";
import quoteApprovelService from "../../services/quote/quoteApprovelService";
import { AxiosResponse } from "axios";
import EditButton from "../Common/AuthButtons/EditButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import Loader from "../Common/Loader/Loader";
import quoteService from "../../services/quote/quoteService";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";

const QuoteStatus = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    refetch,
    data: ApprovelList = [],
  } = useQuery({
    queryKey: ["QuoteData"],
    queryFn: async () => {
      const res: AxiosResponse<QuoteApprovelListProps[]> =
        await quoteApprovelService.getall();
      return res.data;
    },
  });

  const handleReject = (id: string) => {
    quoteService.update({ _id: id, isRejected: true });
    refetch();
  };

  const handleApprove = (id: string) => {
    quoteService.update({ _id: id, isApproved: true, isRejected: false });
    refetch();
  };
  const handleDelete = (id: string) => {
    quoteService.delete(id);
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError={isError} />;
  }

  return (
    <div className=" container ">
      <div className="row mt-3">
        <Header lable="Quote Status" />
      </div>
      <div className=" table-responsive-md border rounded-4 bg-white p-1">
        <table className=" table text-center table-borderless  ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Rev</th>
              <th>Project Name</th>
              <th>Type</th>
              <th>View</th>
              <th>Edit</th>
              <th>Reject</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ApprovelList.map((quote, index) => (
              <tr key={quote._id}>
                <td>{index + 1}</td>
                <td>{quote.rev}</td>
                <td>{quote.project ? quote.project.projectName : "null"}</td>
                <td>
                  {(quote.isConstruction && "Construction") ||
                    (quote.isAdditional && "Additional") ||
                    (quote.isInterior && "Interior")}
                </td>
                <td>
                  {" "}
                  <Link
                    to={`/designs/quote/model/${quote._id}`}
                    state={{ isEdit: true }}
                  >
                    <FileEarmark size={30} className="mx-2" />
                  </Link>
                </td>
                <td>
                  <EditButton
                    isRejected={quote.isRejected}
                    onClick={() => navigate(`/designs/quote/edit/${quote._id}`)}
                  />
                </td>
                <td>
                  <RejectButton
                    isRejected={quote.isRejected}
                    onClick={() => handleReject(quote._id)}
                  />
                </td>
                <td>
                  <ApprovelButton
                    isApproved={quote.isApproved}
                    onClick={() => handleApprove(quote._id)}
                  />
                </td>
                <td>
                  <DeleteButton
                    isApproved={quote.isApproved}
                    onClick={() => handleDelete(quote._id)}
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

export default QuoteStatus;
