import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../utils/apiUtils";
import Header from "../Common/Header/Header";
import quoteService from "../../services/quote/quoteService";
import quoteApprovelService from "../../services/quote/quoteApprovelService";
import ConfirmationModal from "../Common/Confirmation/ConfirmationModal";
import QuoteForm from "./QuoteForm";

const QuoteApprovel = () => {
  const [quotes, setQuotes] = useState<QuoteModelProps[]>();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteModelProps>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const navigate = useNavigate();

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleDeleteConfirmation = (quote: QuoteModelProps) => {
    setConfirmationData({
      title: "Delete Confirmation",
      message: "Are you sure you want to delete this quote?",
      onConfirm: () => handleDeleteQuote(quote),
    });
    setShowConfirmation(true);
  };

  const handleEditConfirmation = (quote: QuoteModelProps) => {
    setConfirmationData({
      title: "Edit Confirmation",
      message: "Are you sure you want to edit this quote?",
      onConfirm: () => handleEdit(quote),
    });
    setShowConfirmation(true);
  };

  const handleApprovelConfirmation = (quote: QuoteModelProps) => {
    setConfirmationData({
      title: "Approve Confirmation",
      message: "Are you sure you want to approve this quote?",
      onConfirm: () => handleApprovelUpdate(quote),
    });
    setShowConfirmation(true);
  };

  const handleDeleteQuote = (quote: QuoteModelProps) => {
    quoteService
      .delete(quote._id)
      .then((res: AxiosResponse) => {
        window.alert(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
    setShowConfirmation(false);
  };

  const handleEdit = (quote: QuoteModelProps) => {
    setIsEdit(true);
    setSelectedQuote(quote);
    setShowConfirmation(false);
  };

  const handleApprovelUpdate = (quote: QuoteModelProps) => {
    quoteApprovelService
      .update(quote)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        navigate(`/quote/${quote._id}`);
      })
      .catch((err: any) => handleApiError(err));
    setShowConfirmation(false);
  };

  useEffect(() => {
    quoteApprovelService
      .getall()
      .then((res: AxiosResponse) => {
        setQuotes(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const quoteType = quotes?.map((quote) =>
    quote.isAdditional
      ? "Additional"
      : quote.isConstruction
      ? "Construction"
      : quote.isInterior
      ? "Interior"
      : quote.isRevised
      ? "revised"
      : null
  );

  return (
    <div className="mx-md-3">
      <Header lable="Quotes Listed For Approval" />

      {!isEdit && (
        <div>
          <table className="table table-secondary table-striped ">
            <thead>
              {" "}
              <tr>
                <th>S.NO </th>
                <th>Project Name</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Open</th>
                <th>Edit</th>
                <th>Approve</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {quotes?.map((quote, index) => (
                <tr key={quote._id}>
                  <td>{index + 1}</td>
                  <td>{quote.projectId.projectName}</td>
                  <td>{quote.projectId.name}</td>
                  <td>
                    {quote ? format(new Date(quote.date), "dd/MM/yyyy") : ""}
                  </td>
                  <td>
                    {(quote && quoteType && quoteType[index]) || "Unknown"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => navigate(`/quote/${quote._id}`)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleEditConfirmation(quote)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleApprovelConfirmation(quote)}
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteConfirmation(quote)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* ConfirmationModal */}
      <ConfirmationModal
        show={showConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirm={confirmationData.onConfirm}
        title={confirmationData.title}
        message={confirmationData.message}
      />
      <div>{isEdit && <QuoteForm Quote={selectedQuote} isEdit />}</div>
    </div>
  );
};

export default QuoteApprovel;
