import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import poFindService from "../../services/po/poFindService";
import MatchingPoDescription from "./MatchingPoDescription";
import SearchingDescription from "./SearchingDescription";
import vendorService from "../../services/vendor/vendorService";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import poService from "../../services/po/poService";
import { ProjectOption } from "../../interfaces/CommonProps";
import { convertAmountToWords } from "../../utils/convertAmountToWords ";
import Header from "../Common/Header/Header";
import { handleApiError } from "../../utils/apiUtils";

interface SupplierProps {
  _id: string;
  shopName: string;
}

interface IsEdit {
  isEdit?: boolean;
  po?: UnApprovelPo;
}
const PoForm = ({ isEdit, po }: IsEdit) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PoItemProps>();
  // const poItemslist: PoItemProps[] = [];
  const [selectedProject, setSelectedProject] = useState<ProjectOption>({
    _id: po ? po.projectId : "",
    projectName: po ? po.siteName : "",
  });
  const [stage, setStage] = useState(po ? po.stage : "");
  const [meterialCatagery, setMeterialCategery] = useState(
    po ? po.meterialCatagory : ""
  );
  const [supplierList, setSupplierList] = useState<SupplierProps[]>([]);
  const [supplier, setSupplier] = useState(po ? po.vendorId : "");
  const [poItems, setPoItems] = useState<PoItemProps[]>((po && po.items) || []);
  const [addMore, setAddMore] = useState(false);
  const [cgstPercentage, setCgstPercentage] = useState<number>(
    po ? po.cgst : 0
  );
  const [sgstPercentage, setSgstPercentage] = useState<number>(
    po ? po.sgst : 0
  );
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  // for finding stored description from server
  const [searchResults, setSearchResults] = useState<
    SearchDescriptionResults[]
  >([]);

  // geting project name and id
  const selectProject = (project: ProjectOption) => {
    setSelectedProject(project);
    console.log(project);
  };

  // getting supplier details from server
  useEffect(() => {
    vendorService
      .getall<SupplierProps[]>()
      .then((res: AxiosResponse) => setSupplierList(res.data));
  }, []);

  // deleting a row

  const handleDeleteRow = (id: number) => {
    setPoItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditRow = (id: number) => {
    setEditingItemId(id);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (editingItemId !== null) {
      setPoItems((prevItems) =>
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

  const handleNewItem = (item: PoItemProps) => {
    // Generate a unique ID for the new item
    const newId =
      poItems.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1;

    // Set the new item with the unique ID
    const newItem: PoItemProps = { ...item, id: newId };

    // Update the state with the new item
    setPoItems((prevItems) => [...prevItems, newItem]);

    // Reset the form fields
    reset();

    // fetching description data from server
    poFindService
      .getById<SearchDescriptionResults[]>(`${item.description}`)
      .then((res: AxiosResponse) => {
        const matchingResults = res.data;
        console.log("matching", matchingResults);
        setSearchResults([...searchResults, ...matchingResults]);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // getting total amount

  const subTotalAmount = poItems.reduce(
    (total, item) => total + (item.rate * item.quantity || 0),
    0
  );

  const cgstAmount =
    cgstPercentage !== undefined ? (subTotalAmount * cgstPercentage) / 100 : 0;
  const sgstAmount =
    sgstPercentage !== undefined ? (subTotalAmount * sgstPercentage) / 100 : 0;
  const totalAmount = subTotalAmount + sgstAmount + cgstAmount;

  const words = convertAmountToWords(totalAmount);

  const requestBody: NewPoProps = {
    projectId: selectedProject ? selectedProject._id : "",
    stage: stage ? stage : "",
    meterialCatagory: meterialCatagery,
    vendorId: supplier,
    subTotal: parseInt(subTotalAmount.toFixed(2)),
    cgst: cgstPercentage ? cgstPercentage : 0,
    sgst: sgstPercentage ? sgstPercentage : 0,
    totalAmount: Math.round(totalAmount),
    items: poItems,
  };
  // sending rerceived data to server
  const handleSubmitPo = () => {
    const update = { _id: po ? po._id : "", ...requestBody };
    if (isEdit) {
      poService
        .update(update)
        .then((res: AxiosResponse) => window.alert(res.data))
        .catch((err: any) => handleApiError(err));
    } else {
      poService
        .create(requestBody)
        .then((res: AxiosResponse) => {
          window.alert("created successfully");
          navigate(`/purchase/model/${res.data._id}`);
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  };

  return (
    <div className=" container-fluid ">
      <div>
        {/* <div className="my-2 m-0 p-0 ">
          <h5 className="text-center text-uppercase text-body-emphasis text-danger-emphasis  fw-bold ">
            Purchase Order for {selectedProject?.projectName}
          </h5>
        </div> */}
        <Header lable={isEdit ? "Edit Purchase Order" : "New Purchase Order"} />

        {/* po project  and stage and supplier detatils  */}

        <div className="container">
          <div className="row pb-2">
            <div className="col-md-3">
              <label htmlFor="stage" className=" fw-bold ">
                Project
              </label>
              <SelectProjectComponent
                onChange={selectProject}
                className=" form-select "
                defaultValue={selectedProject._id}
              />
            </div>
            <div className="col-md-3 form-group ">
              <label htmlFor="stage" className=" fw-bold ">
                Stage
              </label>
              <input
                className="   form-control"
                onChange={(x) => setStage(x.target.value)}
                required
                placeholder="STAGE"
                name="stage"
                value={stage}
              />
            </div>
            <div className="col-md-3 form-group ">
              <label htmlFor="Meterial Category" className=" fw-bold ">
                Meterial Category
              </label>
              <input
                className="   form-control"
                onChange={(x) => setMeterialCategery(x.target.value)}
                required
                placeholder="Meterial Category"
                name="Meterial Category"
                value={meterialCatagery}
              />
            </div>
            <div className="col-md-3 form-group ">
              <label htmlFor="stage" className=" fw-bold ">
                Supllier
              </label>
              <select
                name="Supplier"
                id="supplier"
                className=" form-select "
                value={supplier}
                onChange={(x) => setSupplier(x.target.value)}
              >
                <option value=""> Select Supplier</option>
                {supplierList.map((supplier) => (
                  <option value={supplier._id}>{supplier.shopName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/*  items Table  */}
        <div>
          <table className="table table-bordered  border-primary ">
            <thead>
              <tr className="text-center">
                <th>S.NO</th>
                <th>ITEM DESCRIPTION</th>
                <th>METERIAL FOR</th>
                <th>QUANTITY</th>
                <th>UNIT</th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {poItems.map((item, index) => (
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
                          type="text"
                          value={item.meterialFor}
                          onChange={(e) =>
                            handleEditInputChange(e, "meterialFor")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleEditInputChange(e, "quantity")}
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
                      <td>{item.quantity * item.rate}</td>
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
                      {" "}
                      <td>{index + 1}</td>
                      <td className=" text-start ">{item.description}</td>
                      <td>{item.meterialFor}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td>{item.rate}</td>
                      <td>{item.rate * item.quantity || 0}</td>
                      <td>
                        <button
                          onClick={() => handleEditRow(item.id)}
                          className="btn btn-info btn-sm"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteRow(item.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {poItems.length >= 1 ? (
                <>
                  <tr className=" text-end ">
                    <td colSpan={6}>sub total</td>
                    <td colSpan={3} className="text-start">
                      {subTotalAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className=" text-end ">
                    <td colSpan={6}>
                      CGST %{" "}
                      <input
                        required
                        type="number"
                        step="0.1"
                        value={cgstPercentage}
                        placeholder="CGST Percentage"
                        onChange={(event) => {
                          const inputValue = parseFloat(event.target.value);
                          setCgstPercentage(inputValue);
                        }}
                      />
                    </td>
                    <td colSpan={3} className="text-start">
                      {cgstAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className=" text-end ">
                    <td colSpan={6}>
                      SGST %{" "}
                      <input
                        required
                        type="number"
                        step="0.1"
                        value={sgstPercentage}
                        placeholder="SGST Percentage"
                        onChange={(event) => {
                          const inputValue = parseFloat(event.target.value);
                          setSgstPercentage(inputValue);
                        }}
                      />
                    </td>
                    <td colSpan={3} className="text-start">
                      {sgstAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td colSpan={6}>Total Amount</td>
                    <td colSpan={3} className="text-start">
                      <b>&#8377; {totalAmount.toFixed(2)}</b>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td colSpan={2}>Total Amount in Words</td>
                    <td colSpan={7}>{words}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={9} className=" text-bg-danger  text-center ">
                    No Items to show click add to add items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <hr />

        {/* items form  */}
        <div className="   ">
          <div className="container">
            <button
              onClick={() => {
                setAddMore(!addMore);
              }}
              className="btn btn-outline-danger "
            >
              {!addMore ? "Add Items" : "Close"}
            </button>
          </div>
          {addMore && (
            <form onSubmit={handleSubmit(handleNewItem)}>
              <div className="row">
                <div className="col-lg-4">
                  <InputComponent
                    name="description"
                    register={register}
                    error={errors.description}
                    label="description"
                    placeholder="description"
                  />
                </div>
                <div className="col-lg-2">
                  <InputComponent
                    name="meterialFor"
                    register={register}
                    error={errors.meterialFor}
                    label="Meterial For"
                    placeholder="Meterial For"
                  />
                </div>
                <div className="col-lg-2">
                  <InputComponent
                    name="quantity"
                    register={register}
                    error={errors.quantity}
                    label="Qty"
                    placeholder="Qty "
                    isNumber
                  />
                </div>

                <div className="col-lg-2">
                  <InputComponent
                    name="unit"
                    register={register}
                    error={errors.unit}
                    label="Unit"
                    placeholder="unit"
                  />
                </div>
                <div className=" col-lg-2 ">
                  <InputComponent
                    name="rate"
                    register={register}
                    error={errors.rate}
                    label="Rate"
                    placeholder="Rate"
                    isNumber
                  />
                </div>
                {/* <div className="col-md-2 text-center  d-flex  justify-content-center  align-items-center mt-3">
                 
                </div> */}
                <div className="col-12">
                  <SubmitComponent btnlable="Add" />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* submit po */}

        <div className=" container ">
          {poItems.length >= 1 &&
          stage &&
          meterialCatagery.length >= 1 &&
          supplier.length >= 1 &&
          sgstPercentage &&
          cgstPercentage &&
          !isEdit ? (
            <button
              onClick={handleSubmitPo}
              className="btn  btn-outline-info text-blue w-100 mt-3 container "
              type="submit"
            >
              Create Purchase Order
            </button>
          ) : (
            isEdit &&
            stage &&
            cgstPercentage &&
            sgstPercentage &&
            supplier &&
            poItems &&
            selectedProject &&
            supplier && (
              <button
                onClick={handleSubmitPo}
                className="btn  btn-outline-info text-blue w-100 mt-3 container "
                type="submit"
              >
                Edit Purchase Order
              </button>
            )
          )}
        </div>
      </div>

      {/* showing matching po descriptions */}
      <div className="mt-5">
        <div className=" container ">
          {searchResults.length >= 1 && (
            <div className="">
              <h5>Matching Descriptions</h5>
              <MatchingPoDescription data={searchResults} />
            </div>
          )}
        </div>
        <div className=" container ">
          <h5>Search for Previous Descriptions</h5>
          <SearchingDescription />
        </div>
      </div>
    </div>
  );
};

export default PoForm;
