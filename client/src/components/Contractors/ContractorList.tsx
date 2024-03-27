import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { Link, useNavigate } from "react-router-dom";
import { FileEarmark, PlusCircleDotted } from "react-bootstrap-icons";
import EditButton from "../Common/AuthButtons/EditButton";
import Header from "../Common/Header/Header";
import contractorListService from "../../services/contractor/contractorListService";
import Loader from "../Common/Loader/Loader";

const ContractorList: React.FC = () => {
  const [contractorList, setContractorsList] = useState<ContractorListProps[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    contractorListService
      .getByPage<ContractorsListPagiantionProps>(currentPage, searchQuery)
      .then((res: AxiosResponse<ContractorsListPagiantionProps>) => {
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setContractorsList(res.data.contractors);
      })
      .catch((err: any) => {
        handleApiError(err);
      })
      .finally(() => setIsLoading(false));
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
  if (isLoading) {
    <Loader />;
  }
  return (
    <div className="container-fluid">
      <Header lable="Contractors List" />
      {/* Search input */}
      <div className="container">
        <div className="row ">
          <div className="col-md-6 ">
            <input
              className=" input-group-sm form-control w-50 mb-3"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search contractors..."
            />
          </div>
          <div className="col-md-6  text-md-end ">
            <Link to={"new"}>
              <PlusCircleDotted size={35} />
            </Link>
          </div>
        </div>
      </div>

      {/* listing Contractors  */}
      <div className=" table-responsive-md ">
        <table className="table  table-bordered   text-center table-hover ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Mobile No</th>
              <th>Category</th>

              <th>Rate</th>
              {/* <th>Account Details</th> */}
              <th>Account Number</th>
              <th>IFSC</th>
              <th>Branch Name</th>

              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {contractorList ? (
              contractorList.map((contractor, index) => (
                <tr key={contractor._id}>
                  <td>{index + 1}</td>
                  <td>{contractor.name}</td>
                  <td className=" text-truncate ">{contractor.mobileNumber}</td>
                  <td>{contractor.category}</td>

                  <td>{contractor.rate}</td>

                  <td>{contractor.accountDetails.accountNumber}</td>
                  <td>{contractor.accountDetails.ifsc}</td>
                  <td>{contractor.accountDetails.branchName}</td>
                  <td>
                    <div className=" d-flex  justify-content-  align-items-center ">
                      {" "}
                      <Link to={`view/${contractor._id}`}>
                        <FileEarmark size={30} />
                      </Link>
                      <EditButton
                        onClick={() => navigate(`edit/${contractor._id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>No Contractors to Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {contractorList && (
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
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <span
                className="page-link cursor-pointer"
                onClick={handleNextPage}
              >
                Next
              </span>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ContractorList;
