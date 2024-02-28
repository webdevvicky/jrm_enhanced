import { useEffect, useState } from "react";
import projectCompletedService from "../../services/project/projectCompletedService";
import { AxiosResponse } from "axios";
import Loader from "../Common/Loader/Loader";
import { format } from "date-fns";

const CompletedProjects = () => {
  const [completedProject, setCompletedProject] =
    useState<CompletedProjectProps[]>();
  useEffect(() => {
    projectCompletedService
      .getall<CompletedProjectProps[]>()
      .then((res: AxiosResponse) => setCompletedProject(res.data))
      .catch((err) => window.alert(err.response.data.error));
  }, []);
  return (
    <div>
      {completedProject && completedProject.length < 1 && <Loader />}
      {completedProject && (
        <div className="container">
          <div className="row">
            {completedProject?.map((project) => (
              <>
                <div className="col-md-4">
                  <div className="card">
                    <div className=" card-header card-title ">
                      <h6>{project.projectName}</h6>
                    </div>
                    <div className=" card-body ">
                      <p className=" card-text ">
                        completed date :{" "}
                        {project
                          ? format(
                              new Date(project.completedDate),
                              "dd/MM/yyyy"
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedProjects;
