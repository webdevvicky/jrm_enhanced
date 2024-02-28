import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import quoteService from "../../services/quote/quoteService";
import { convertAmountToWords } from "../../utils/convertAmountToWords ";
import { handleApiError } from "../../utils/apiUtils";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import { ProjectOption } from "../../interfaces/CommonProps";

interface IsEdit {
  isEdit?: boolean;
  Quote?: QuoteModelProps;
}

const QuoteForm = ({ isEdit, Quote }: IsEdit) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteItemProps>();
  const navigate = useNavigate();

  const [quoteItems, setQuoteItems] = useState<QuoteItemProps[]>(
    (Quote && Quote?.items) || []
  );
  const [addMore, setAddMore] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectOption>();

  const onSelectProject = (project: ProjectOption) => {
    setSelectedProject(project);
  };

  const handleDeleteRow = (id: number) => {
    setQuoteItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditRow = (id: number) => {
    setEditingItemId(id);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (editingItemId !== null) {
      setQuoteItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === editingItemId
            ? { ...prevItem, [field]: e.target.value }
            : prevItem
        )
      );
    }
  };

  const handleSaveEditedItem = () => {
    setEditingItemId(null);
  };

  const handleNewItem = (item: QuoteItemProps) => {
    if (editingItemId !== null) {
      setQuoteItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === editingItemId
            ? { ...item, id: editingItemId }
            : prevItem
        )
      );
      setEditingItemId(null);
      reset();
    } else {
      const newId =
        quoteItems.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1;
      const newItem: QuoteItemProps = { ...item, id: newId };
      setQuoteItems((prevItems) => [...prevItems, newItem]);
      reset();
    }
    reset();
  };

  const totalAmount = quoteItems.reduce(
    (total, item) => total + (item.rate * item.sqft || 0),
    0
  );
  const words = convertAmountToWords(totalAmount);

  const handleOptionChange = (option: any) => {
    setSelectedValue(option.target.value);
  };

  const requestBody: NewQuoteProps = {
    projectId:
      (selectedProject && selectedProject._id) ||
      (Quote && Quote.projectId && Quote.projectId._id) ||
      "",
    rev: (Quote && Quote.rev) || 0,
    totalValue: totalAmount,
    items: quoteItems,
    isAdditional:
      selectedValue === "2" || (Quote && Quote?.isAdditional) || false,
    isInterior: selectedValue === "3" || (Quote && Quote.isInterior) || false,
    isConstruction: (Quote && Quote.isConstruction) || false,
    isRevised: (Quote && Quote.isRevised) || false,
  };
  const updated = { _id: Quote ? Quote?._id : "", ...requestBody };
  const handleSubmitQuote = () => {
    if (isEdit) {
      quoteService
        .update(updated)
        .then((res) => {
          window.alert(res.data);
          window.location.reload();
        })
        .catch((err) => handleApiError(err));
    } else {
      quoteService
        .create(requestBody)
        .then((res) => {
          window.alert("Created successfully");
          console.log(res.data);
          navigate(`/quote/${res.data._id}`);
        })
        .catch((err: any) => {
          handleApiError(err);
          console.log(err);
        });
    }
  };

  return (
    <div className="container ">
      {!selectedProject && !isEdit && (
        <div className="container">
          <div>
            <h4 className=" text-danger-emphasis ">
              Select Project For new Quote
            </h4>
          </div>
          <SelectProjectComponent onChange={onSelectProject} />
        </div>
      )}
      {requestBody.projectId && (
        <div>
          <div className="my-2">
            <h5 className="text-center text-uppercase ">
              Quote for{" "}
              {Quote?.projectId.projectName || selectedProject?.projectName}
            </h5>
          </div>
          <table className="table table-bordered  border-primary">
            <thead>
              <tr className="text-center">
                <th>S.NO</th>
                <th>WORK DESCRIPTION</th>
                <th>Sq.Ft</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {quoteItems.map((item, index) => (
                <tr key={index} className="text-center">
                  {editingItemId === item.id ? (
                    <>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleEditInputChange(e, "description")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.sqft}
                          onChange={(e) => handleEditInputChange(e, "sqft")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => handleEditInputChange(e, "unit")}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleEditInputChange(e, "rate")}
                        />
                      </td>
                      <td>{item.rate * item.sqft || 0}</td>
                      <td colSpan={2}>
                        <button
                          onClick={() => handleSaveEditedItem()}
                          className="btn btn-outline-success "
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{index + 1}</td>
                      <td className="text-start">{item.description}</td>
                      <td>{item.sqft}</td>
                      <td>{item.unit}</td>
                      <td>{item.rate}</td>
                      <td>{item.rate * item.sqft || 0}</td>
                      <td>
                        <button
                          onClick={() => handleEditRow(item.id)}
                          className="btn btn-outline-info "
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteRow(item.id)}
                          className=" btn btn-outline-danger "
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {quoteItems.length >= 1 ? (
                <>
                  <tr>
                    <td colSpan={5} className="text-end  ">
                      Total Amount
                    </td>
                    <td colSpan={3} className="text-start">
                      <b>&#8377; {totalAmount}</b>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td colSpan={2}>Total Amount in Words</td>
                    <td colSpan={6}>{words}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={8} className="text-bg-danger text-center">
                    No Items to show. Click "Add More" to add items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <hr />

          <div className="mt-4">
            <div>
              <button
                className="btn btn-outline-danger"
                onClick={() => setAddMore(!addMore)}
              >
                {!addMore ? "Add More" : "Close"}
              </button>
            </div>
            {addMore && (
              <form onSubmit={handleSubmit(handleNewItem)}>
                <div className="row">
                  <div className="col-md-4">
                    <InputComponent
                      name="description"
                      register={register}
                      error={errors.description}
                      label="Description"
                    />
                  </div>
                  <div className="col-md-2">
                    <InputComponent
                      name="sqft"
                      register={register}
                      error={errors.sqft}
                      label="Sq.Ft"
                      isNumber
                    />
                  </div>
                  <div className="col-md-2">
                    <InputComponent
                      name="unit"
                      register={register}
                      error={errors.unit}
                      label="Unit"
                    />
                  </div>
                  <div className="col-md-2">
                    <InputComponent
                      name="rate"
                      register={register}
                      error={errors.rate}
                      label="Rate"
                      isNumber
                    />
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center mt-3">
                    <SubmitComponent btnlable="Add" />
                  </div>
                </div>
              </form>
            )}
          </div>

          {!isEdit && (
            <div className="container">
              <label htmlFor="quoteType" className="fw-bold">
                Select Quote Type
              </label>
              <div className="d-flex justify-content-around">
                {[1, 2, 3].map((value) => (
                  <div key={value} className="form-check">
                    <input
                      type="radio"
                      id={`quoteType${value}`}
                      name="quoteType"
                      value={value.toString()}
                      checked={selectedValue === value.toString()}
                      onChange={(event) => handleOptionChange(event)}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={`quoteType${value}`}
                      className="form-check-label"
                    >
                      {value === 1
                        ? "Construction/Revised"
                        : value === 2
                        ? "Additional"
                        : "Interior"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            {selectedValue && quoteItems.length >= 1 && !isEdit && (
              <button
                className="btn btn-outline-primary w-100 mt-3"
                onClick={handleSubmitQuote}
              >
                Generate Quote
              </button>
            )}

            {isEdit && (
              <button
                className="btn btn-outline-primary w-100 mt-3"
                onClick={handleSubmitQuote}
              >
                Edit Quote
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
