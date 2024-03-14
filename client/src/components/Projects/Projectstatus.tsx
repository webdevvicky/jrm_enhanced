import { useEffect, useState } from "react";
import Header from "../Common/Header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import projectApprovelServices from "../../services/project/projectApprovelServices";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import EditButton from "../Common/AuthButtons/EditButton";
import RejectButton from "../Common/AuthButtons/RejectButton";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import projectService from "../../services/project/projectService";
import { FileEarmark } from "react-bootstrap-icons";
import QuoteStatus from "../Quotes/QuoteStatus";
import DesignStatus from "../Designs/DesignStatus";

const Projectstatus = () => {
  const navigate = useNavigate();
  const [ApprovalList, setApprovalList] = useState<ProjectApprovelList[]>([]);
  useEffect(() => {
    projectApprovelServices
      .getall()
      .then((res: AxiosResponse) => setApprovalList(res.data))
      .catch((err: any) => handleApiError(err));
  }, []);

  // approvel

  const handleApprove = (project: ProjectApprovelList) => {
    projectService
      .update({ _id: project._id, isApproved: true })
      .then(() => {
        navigate("/designs/booking");
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  };

  // handle reject

  const handleReject = (project: ProjectApprovelList) => {
    setApprovalList((prevApprovalList) =>
      prevApprovalList.filter((p) => p._id !== project._id)
    );
    projectService
      .update({ _id: project._id, isRejected: true })
      .then((res: AxiosResponse) => console.log(res.data))
      .catch((err) => handleApiError(err));
  };

  //handle delete

  const handleDelete = (project: ProjectApprovelList) => {
    projectService
      .delete(project._id)
      .then(() => {
        navigate("/designs/booking");
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  };

  const { pathname } = useLocation();
  const design = pathname.includes("design");
  if (!design && ApprovalList.length <= 0) {
    return null;
  }

  return (
   <>
    <div className=" container ">
      <div>
        <Header lable=" Project Booking  Status" />
      </div>
      <div className="bg-white  border-opacity-50  rounded-3 py-2 ">
        <table className="table text-center table-borderless  table-responsive-sm  ">
          <thead>
            <tr className="  ">
              <th>S.No</th>
              <th>File Number</th>
              <th>Project Name</th>
              <th>View</th>
              <th>Edit</th>
              <th>Reject</th>
              <th>Approve </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ApprovalList.length >= 1 ? (
              ApprovalList.map((project, index) => (
                <tr key={project._id}>
                  <td>{index + 1}</td>
                  <td>{project.fileNumber}</td>
                  <td>{project.projectName}</td>
                  <td>
                    <Link to={`/designs/booking/info/${project._id}`}>
                      <FileEarmark size={30} className="mx-2" />
                    </Link>
                  </td>
                  <td>
                    <EditButton
                      isRejected={project.isRejected}
                      onClick={() =>
                        navigate(`/designs/booking/edit/${project._id}`)
                      }
                    />
                  </td>
                  <td>
                    <RejectButton
                      isApproved={project.isApproved}
                      isRejected={project.isRejected}
                      onClick={() => handleReject(project)}
                    />
                  </td>
                  <td>
                    <ApprovelButton
                      isApproved={project.isApproved}
                      onClick={() => handleApprove(project)}
                    />
                  </td>
                  <td>
                    <DeleteButton
                      isApproved={project.isApproved}
                      onClick={() => handleDelete(project)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className=" text-center">
                <td className=" text-center  bg-info-subtle " colSpan={8}>
                  {" "}
                  No Project Found For Approvel
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
    
    <QuoteStatus/>
    <DesignStatus/>
    </>
  );
};

export default Projectstatus;
