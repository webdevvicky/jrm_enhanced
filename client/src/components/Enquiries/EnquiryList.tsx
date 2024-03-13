import React, { useEffect, useState } from "react";
import { CheckLg, PencilFill, XLg } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import enquiryServices from "../../services/enquiry/enquiryServices";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import RemarksModal from "./RemarksModal";

const EnquiriesList = () => {
  const [enquiries, setEnquiries] = useState<EnquiryProps[]>([]);
  const [filteredType, setFilteredType] = useState<EnquiryProps[]>([]);
  const [filteredEnquiry, setFilteredEnquiry] = useState<EnquiryProps[]>([]);
  const [resetPriority, setResePriority] = useState("");

  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryProps | null>(
    null
  );

  useEffect(() => {
    enquiryServices
      .getall<EnquiryProps[]>()
      .then((res: AxiosResponse) => {
        console.log(res);
        setEnquiries(res.data);
        setFilteredType(res.data);
        setFilteredEnquiry(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, []);

  const handleFilterType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResePriority("");
    const filterValue = event.target.value;
    if (filterValue === "all") {
      setFilteredType(enquiries);
    } else {
      const filtered = enquiries.filter((enquiry) => {
        if (filterValue === "quote") {
          return enquiry.quotationSent;
        } else if (filterValue === "site") {
          return enquiry.siteVisit;
        } else if (filterValue === "office") {
          return enquiry.officeVisit;
        } else if (filterValue === "scheme") {
          return enquiry.schemeSent;
        }
        return false;
      });
      setFilteredType(filtered);
    }
  };

  const handlePriorityFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const filterPriority = event.target.value;
    setResePriority(filterPriority);
    if (filterPriority === "all") {
      setFilteredEnquiry(filteredType);
    } else {
      const filtered = filteredType.filter((enquiry) => {
        return enquiry.priority.toString() === filterPriority;
      });
      setFilteredEnquiry(filtered);
    }
  };

  useEffect(() => {}, [
    filteredEnquiry,
    filteredType,
    handlePriorityFilter,
    handleFilterType,
  ]);

  const openRemarksModal = (enquiry: EnquiryProps) => {
    setSelectedEnquiry(enquiry);
  };

  return (
    <div className="container-fluid ">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-1">
            <select
              className=" form-select  py-3"
              onChange={handleFilterType}
              defaultValue={""}
            >
              <option value="">Select</option>
              <option value="all">All</option>
              <option value="quote">Quote</option>
              <option value="site">Site Visit</option>
              <option value="office">Office Visit</option>
              <option value="scheme">Scheme sent</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className=" form-select  py-3"
              onChange={handlePriorityFilter}
              value={resetPriority}
            >
              <option value="">Select</option>
              <option value="all">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row table-responsive ">
        <table className=" table  table-bordered  border-primary-subtle  ">
          <thead>
            <tr className=" text-center">
              <th>S.NO</th>
              <th>Pri</th>
              <th>Client Name</th>
              <th>Location</th>
              <th>Contact No</th>
              <th>Email ID</th>
              <th>Quoate</th>
              <th>Site</th>
              <th>Office</th>
              <th>Scheme</th>
              <th>Source</th>
              <th>Remarks</th>
              <th>Quotes</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiry.map((enquiry, index) => (
              <tr key={index} className=" text-center ">
                <td>{index + 1}</td>
                <td>{enquiry.priority}</td>
                <td className=" text-capitalize  ">{enquiry.name}</td>
                <td>{enquiry.location}</td>
                <td>{enquiry.mobileNumber}</td>
                <td>{enquiry.email}</td>
                <td>
                  {enquiry.quotationSent ? (
                    <CheckLg size="20" color="green" />
                  ) : (
                    <XLg size="20" color="#D04848" />
                  )}
                </td>
                <td>
                  {enquiry.siteVisit ? (
                    <CheckLg size="20" color="green" />
                  ) : (
                    <XLg size="20" color="#D04848" />
                  )}
                </td>
                <td>
                  {enquiry.officeVisit ? (
                    <CheckLg size="20" color="green" />
                  ) : (
                    <XLg size="20" color="#D04848" />
                  )}
                </td>
                <td>
                  {enquiry.schemeSent ? (
                    <CheckLg size="20" color="green" />
                  ) : (
                    <XLg size="20" color="#D04848" />
                  )}
                </td>
                <td>{enquiry.source}</td>
                <td>
                  <button
                    className="btn btn-link p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#RemarksModal"
                    onClick={() => openRemarksModal(enquiry)}
                  >
                    remarks
                  </button>
                </td>
                <td>
                  <Link
                    to={`/marketting/quote/list/${enquiry._id}`}
                    state={{ name: enquiry.name }}
                  >
                    Open
                  </Link>
                </td>
                <td>
                  <Link to={`/marketting/enquiry/edit/${enquiry._id}`}>
                    <PencilFill color="green" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedEnquiry && <RemarksModal enquiryId={selectedEnquiry._id} />}
      </div>
    </div>
  );
};

export default EnquiriesList;
