import React, { useState, useEffect } from "react";
import ProjectCardService from "../../services/project/ProjectCardService";
import { AxiosResponse } from "axios";
import NewProject from "./NewProject";
import Loader from "../Common/Loader/Loader";
import { handleApiError } from "../../utils/apiUtils";

const ProjectCard: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectCardProps[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    ProjectCardService.getall<ProjectCardProps[]>()
      .then((res: AxiosResponse) => {
        setProjectData(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, []);

  const handleEditClick = (data: any) => {
    setIsEdit(true);
    setSelectedId(data);
  };
  console.log(selectedId);
  return (
    <div>
      {projectData.length < 1 && <Loader />}
      <div className="row ">
        {!isEdit &&
          projectData.map((project) => (
            <div key={project._id} className=" col-md-4 pt-2 ">
              <div className="card h-100 bg-body-tertiary  ">
                <div className="card-body text-start  ">
                  <h5 className="card-title  text-warning-emphasis">
                    {project.projectName}
                  </h5>
                  {/* <h6 className="card-subtitle mb-2 text-muted">
                    {project.clientName}
                  </h6> */}
                  <p className="card-text">
                    <strong>Client Name:</strong> {project.name}
                  </p>
                  <p className="card-text">
                    <strong>File Number:</strong> {project.fileNumber}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {project.projectAddress}
                  </p>{" "}
                  <p className="card-text">
                    <strong>Location:</strong> {project.projectLocation}
                  </p>
                  <p className="card-text">
                    <strong>Client Email:</strong> {project.email}
                  </p>
                  <p className="card-text">
                    <strong>Alternate Email:</strong> {project.alternateEmail}
                  </p>
                  <p className="card-text">
                    <strong>Client Mobile:</strong> {project.mobileNumber}
                  </p>
                  <p className="card-text">
                    <strong>Alternate Mobile:</strong> {project.alternateMobile}
                  </p>
                  <p className="card-text">
                    <strong>start Date:</strong> {project.startDate}
                  </p>
                  <p className="card-text">
                    <strong>completetion Mobile:</strong>{" "}
                    {project.completionDate}
                  </p>
                  <p className="card-text">
                    <strong>remainig days:</strong> 160 days left
                  </p>
                  <p className="card-text">
                    <strong>value of Project at first Quote :</strong>{" "}
                    {project.ProjectValue}
                  </p>
                  <p className="card-text">
                    <strong>value of Project at last Quote :</strong> 60,00000
                  </p>
                  <div className=" text-center ">
                    <button
                      onClick={() => handleEditClick(project._id)}
                      className="btn w-100 btn-outline-info "
                    >
                      Change Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {isEdit && <NewProject _id={selectedId} isEdit />}
      </div>
    </div>
  );
};

export default ProjectCard;
