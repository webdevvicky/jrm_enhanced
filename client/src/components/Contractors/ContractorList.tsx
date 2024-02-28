import { useEffect, useState } from "react";
import contractService from "../../services/contractor/contractService";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import NewContractor from "./NewContractor";

const ContractorList = () => {
  const [contractors, setContractors] = useState<ContractorProps[]>();
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<ContractorProps>();
  const [viewContractor, setViewContractor] = useState<ContractorProps>();

  const handleDelete = (contract: ContractorProps) => {
    contractService
      .delete(contract._id)
      .then((res) => {
        window.alert(res.statusText);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  };
  useEffect(() => {
    contractService
      .getall<ContractorProps[]>()
      .then((res: AxiosResponse) => {
        setContractors(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, [handleDelete]);

  const handleEdit = (contractor: ContractorProps) => {
    setSelected(contractor);
    setIsEdit(true);
  };
  const handleView = (contractor: ContractorProps) => {
    setViewContractor(contractor);
  };
  return (
    <div className=" container ">
      {!isEdit && (
        <div className="row">
          <div className="col-md-12">
            <table className=" table  table-primary  text-center ">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Contract Name</th>
                  <th>Owner Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Alternate No</th>
                  <th>view</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {contractors?.map((contractor, index) => (
                  <tr key={contractor._id}>
                    <td>{index + 1}</td>
                    <td>{contractor.contractName}</td>
                    <td>{contractor.ownerName}</td>
                    <td>{contractor.contractorType}</td>
                    <td>{contractor.contractorMobile}</td>
                    <td>{contractor.alternateMobile}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleView(contractor)}
                      >
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleEdit(contractor)}
                      >
                        {" "}
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success "
                        onClick={() => handleDelete(contractor)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isEdit && <NewContractor data={selected} isEdit />}

      <div className="row">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {viewContractor?.contractName}
                </h5>
              </div>
              <div className="modal-body">
                <p>
                  <span className="fw-bold">Owner Name:</span>{" "}
                  {viewContractor?.ownerName || "---"}
                </p>
                <p>
                  <span className="fw-bold">Type:</span>{" "}
                  {viewContractor?.contractorType || "---"}
                </p>
                <p>
                  <span className="fw-bold">Contact NO:</span>{" "}
                  {viewContractor?.contractorMobile || "---"}
                </p>
                <p>
                  <span className="fw-bold">Alternate Number:</span>{" "}
                  {viewContractor?.alternateMobile || "---"}
                </p>
                <p>
                  <span className="fw-bold">Email:</span>{" "}
                  {viewContractor?.contractorEmail || "---"}
                </p>
                <p>
                  <span className="fw-bold">Gpay:</span>{" "}
                  {viewContractor?.gpayNumber || "---"}
                </p>
                <p>
                  <span className="fw-bold">Account Number:</span>{" "}
                  {viewContractor?.accountNumber || "---"}
                </p>
                <p>
                  <span className="fw-bold">IFSC:</span>{" "}
                  {viewContractor?.ifsc || "---"}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorList;
