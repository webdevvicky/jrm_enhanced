// RemarksModal.tsx

import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import enquiryServices from "../../services/enquiry/enquiryServices";
import enquiryRemarksServices from "../../services/enquiry/enquiryRemarksServices";
import { convertMongoDate } from "../../utils/dateConvertionUtils";

interface RemarksModalProps {
  enquiryId: string;
}

const RemarksModal: React.FC<RemarksModalProps> = ({ enquiryId }) => {
  const [RemarksData, setRemarksData] = useState<EnquiryProps>();
  const [newRemark, setRemark] = useState("");

  useEffect(() => {
    enquiryServices
      .getById(enquiryId)
      .then((res: AxiosResponse) => {
        setRemarksData(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, [enquiryId]);

  const handleNewRemark = () => {
    const updatedArray = { _id: enquiryId, comment: newRemark };
    console.log("updated", updatedArray);
    enquiryRemarksServices
      .update(updatedArray)
      .then((res: AxiosResponse) => {
        setRemarksData(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });

    setRemark("");
  };
  return (
    <div className="modal fade" id="RemarksModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Remarks of {RemarksData?.name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <small className="text-muted mt-1">
              {RemarksData?.createdAt &&
                convertMongoDate(RemarksData?.createdAt)}
            </small>
            <p>{RemarksData?.initialRemark}</p>
            <div>
              {RemarksData?.remarks?.map((remark, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-start mb-3"
                >
                  <small className="text-muted mt-1">
                    {convertMongoDate(remark.date)}
                  </small>
                  <p className="p-2 rounded bg-primary text-white">
                    {remark.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer justify-content-center ">
            <div className="row mt-2 ">
              <div className=" col-md-6 ">
                <input
                  type="text"
                  className=" form-control  border-primary-subtle "
                  placeholder="New Remark"
                  onChange={(event) => setRemark(event.target.value)}
                  value={newRemark}
                />
              </div>
              <div className="col-md-3">
                <button
                  type="submit"
                  className={`btn btn-outline-success w-100 ${
                    newRemark.length <= 0 ? "disabled " : ""
                  }`}
                  onClick={handleNewRemark}
                >
                  Add
                </button>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>

            {/* You can include a button here to save changes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarksModal;
