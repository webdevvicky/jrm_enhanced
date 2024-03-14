import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import vendorListService from "../../services/vendor/vendorListService";
import { handleApiError } from "../../utils/apiUtils";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark, PlusCircleDotted } from "react-bootstrap-icons";
import EditButton from "../Common/AuthButtons/EditButton";
import Header from "../Common/Header/Header";
import { tr } from "date-fns/locale";

const VendorsList: React.FC = () => {
  const [vendors, setVendors] = useState<VendorListProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    vendorListService
      .getByPage<VendorListPagiantionProps>(currentPage, searchQuery)
      .then((res: AxiosResponse<VendorListPagiantionProps>) => {
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setVendors(res.data.vendors);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, [currentPage, searchQuery]); // Fetch data when currentPage or searchQuery changes

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value); // Update searchQuery state when input changes
  };

  return (
    <div className="container-fluid">
      <Header lable="Vendors List" />
      {/* Search input */}
      <div className="container">
        <div className="row ">
          <div className="col-md-6 ">
            <input
              className=" input-group-sm form-control w-50 mb-3"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search vendors..."
            />
          </div>
          <div className="col-md-6  text-md-end ">
            <Link to={"new"}>
              <PlusCircleDotted size={35} />
            </Link>
          </div>
        </div>
      </div>

      {/* listing vendors  */}
      <div className=" table-responsive-md ">
        <table className="table  table-bordered   text-center table-hover ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Items</th>
              <th>Rate</th>
              {/* <th>Account Details</th> */}
              <th>Account Number</th>
              <th>IFSC</th>
              <th>Branch Name</th>

              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length >= 1 ? (
              vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>{index + 1}</td>
                  <td>{vendor.name}</td>
                  <td className=" text-truncate ">{vendor.address}</td>
                  <td>{vendor.mobileNumber}</td>
                  <td>{vendor.items}</td>
                  <td>{vendor.rate}</td>
                  {/* <td>
                <ul className=" list-group-flush">
                  <li className=" list-group-item ">
                    {vendor.accountDetails.accountNumber}
                  </li>
                  <li className=" list-group-item ">
                    {vendor.accountDetails.ifsc}
                  </li>
                  <li className=" list-group-item ">
                    {vendor.accountDetails.branchName}
                  </li>
                </ul>
              </td> */}
                  <td>{vendor.accountDetails.accountNumber}</td>
                  <td>{vendor.accountDetails.ifsc}</td>
                  <td>{vendor.accountDetails.branchName}</td>
                  <td>
                    <div className=" d-flex  justify-content-  align-items-center ">
                      {" "}
                      <Link to={`view/${vendor._id}`}>
                        <FileEarmark size={30} />
                      </Link>
                      <EditButton
                        onClick={() => navigate(`edit/${vendor._id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}> No Vendors To Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span
              className="page-link cursor-pointer"
              onClick={handlePreviousPage}
            >
              Previous
            </span>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 && "active"}`}
            >
              <span
                className="page-link cursor-pointer"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </span>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <span className="page-link cursor-pointer" onClick={handleNextPage}>
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VendorsList;
