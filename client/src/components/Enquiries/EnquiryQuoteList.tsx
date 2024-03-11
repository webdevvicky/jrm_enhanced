import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { PlusCircleDotted } from "react-bootstrap-icons";
import enquiryQuoteUsingProject from "../../services/enquiry/enquiryQuoteUsingProject";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import enquiryQuoteServices from "../../services/enquiry/enquiryQuoteServices";
import { handleApiError } from "../../utils/apiUtils";

const EnquiryQuoteList = () => {
  // fetch id from enquiry list

  const { id } = useParams();
  const { state } = useLocation();
  const [quotes, setQuotes] = useState<EnquiryQuoteModelProps[]>([]);

  const lastQuoteId = quotes.length > 0 ? quotes[quotes.length - 1]._id : null;

  const handleDelete = (_id: string) => {
    const allQuotes = quotes;
    setQuotes(quotes.filter((quote) => quote._id !== _id));
    enquiryQuoteServices
      .delete(_id)
      .then((res: AxiosResponse) => console.log(res.data))
      .catch((err: any) => {
        handleApiError(err);
        setQuotes(allQuotes);
      });
  };

  const handleApprovel = (_id: string) => {
    const allQuotes = quotes;
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote._id === _id ? { ...quote, isApproved: true } : quote
      )
    );
    const updatedData = { _id: _id, isApproved: true };
    enquiryQuoteServices
      .update(updatedData)
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
        setQuotes(allQuotes);
      });
  };

  const handleReject = (_id: string) => {
    const allQuotes = quotes;
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote._id === _id ? { ...quote, isRejected: true } : quote
      )
    );
    const updatedData = { _id: _id, isRejected: true };
    enquiryQuoteServices
      .update(updatedData)
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
        setQuotes(allQuotes);
      });
  };

  useEffect(() => {
    enquiryQuoteUsingProject.getById(`${id}`).then((res: AxiosResponse) => {
      console.log(res.data);
      setQuotes(res.data);
    });
  }, [id]);
  return (
    <div className=" container ">
      <div className="row">
        <div className="col-md-6">
          <Link
            to={`/marketting/quote/form/${id}`}
            state={{ name: state.name, lastQuoteId: lastQuoteId }}
          >
            <PlusCircleDotted size={30} />
          </Link>
        </div>
        <div className="col-md-6">{state.name}</div>
      </div>
      <div className="row mt-2">
        <table className=" table  table-bordered  border-secondary  text-center ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Rev Number</th>
              <th>status</th>
              <th>view</th>
              <th>Approve</th>
              <th>Reject</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{quote.rev}</td>
                <td>{quote.isApproved ? "Approved" : "Approvel"}</td>
                <td>
                  <Link to={`/marketting/quote/model/${quote._id}`}>View</Link>
                </td>
                <td>
                  <ApprovelButton
                    onClick={() => handleApprovel(quote._id)}
                    isApproved={quote.isApproved}
                  />
                </td>
                <td>
                  <RejectButton
                    isApproved={quote.isApproved}
                    isRejected={quote.isRejected}
                    onClick={() => handleReject(quote._id)}
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

export default EnquiryQuoteList;
