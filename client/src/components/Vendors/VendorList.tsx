import React, { useEffect, useState } from "react";
import vendorService from "../../services/vendor/vendorService";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import NewVendor from "./VendorForm";
import ConfirmationModal from "../Common/Confirmation/ConfirmationModal";
import useConfirmation from "../../hooks/useConfirmation";
const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<VendorProps[]>();
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<VendorProps>();
  const [viewVendor, setViewVendor] = useState<VendorProps>();
  const [searchQuery, setSearchQuery] = useState("");
  const confirmation = useConfirmation();
  const handleDelete = (vendor: VendorProps) => {
    vendorService
      .delete(vendor._id)
      .then((res) => {
        window.alert(res.statusText);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
    confirmation.hideConfirmation();
  };

  useEffect(() => {
    vendorService
      .getall<VendorProps[]>()
      .then((res: AxiosResponse) => {
        setVendors(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, [handleDelete]);

  const handleEdit = (vendor: VendorProps) => {
    setSelected(vendor);
    setIsEdit(true);
    confirmation.hideConfirmation();
  };

  const handleView = (vendor: VendorProps) => {
    setViewVendor(vendor);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredVendors = vendors?.filter((vendor) =>
    vendor.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      {!isEdit && (
        <div className="row mb-3">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Shop Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
      {!isEdit && (
        <div className="row">
          <div className="col-md-12">
            <table className="table table-primary text-center">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Shop Name</th>
                  <th>Shop Type</th>
                  <th>Shop Mobile</th>
                  <th>Alternate No</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors?.map((vendor, index) => (
                  <tr key={vendor._id}>
                    <td>{index + 1}</td>
                    <td>{vendor.shopName}</td>
                    <td>{vendor.shopType}</td>
                    <td>{vendor.shopMobile}</td>
                    <td>{vendor.AlternateNumber}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleView(vendor)}
                      >
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success"
                        data-bs-toggle="modal"
                        data-bs-target="#example"
                        onClick={() =>
                          confirmation.showConfirmation(
                            "Edit Confirmation",
                            "Are you sure you want to Edit this vendor?",
                            () => handleEdit(vendor)
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger "
                        onClick={() =>
                          confirmation.showConfirmation(
                            "Delete Confirmation",
                            "Are you sure you want to delete this Vendor?",
                            () => handleDelete(vendor)
                          )
                        }
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

      {isEdit && <NewVendor vendor={selected} isEdit />}

      {viewVendor && (
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
                    {viewVendor?.shopName}
                  </h5>
                </div>
                <div className="modal-body">
                  {" "}
                  <p>
                    <span className="fw-bold">Shop Name:</span>{" "}
                    {viewVendor?.shopName || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Shop Type:</span>{" "}
                    {viewVendor?.shopType || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Materials Available:</span>{" "}
                    {viewVendor?.meterialsAvailable || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Shop Mobile:</span>{" "}
                    {viewVendor?.shopMobile || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Shop Landline:</span>{" "}
                    {viewVendor?.shopLandLine || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Alternate Number:</span>{" "}
                    {viewVendor?.AlternateNumber || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Sales Person Name:</span>{" "}
                    {viewVendor?.salesPersonName || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Sales Person Mobile:</span>{" "}
                    {viewVendor?.salesPersonMobile || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">Account Number:</span>{" "}
                    {viewVendor?.accountNumber || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">IFSC:</span>{" "}
                    {viewVendor?.ifsc || "---"}
                  </p>
                  <p>
                    <span className="fw-bold">G Pay:</span>{" "}
                    {viewVendor?.gpay || "---"}
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
      )}

      <ConfirmationModal
        show={confirmation.show}
        handleClose={confirmation.hideConfirmation}
        handleConfirm={confirmation.onConfirm}
        title={confirmation.title}
        message={confirmation.message}
      />
    </div>
  );
};

export default VendorList;
