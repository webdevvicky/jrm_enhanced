// ProjectList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import projectService from "../../services/project/projectService";
import Loader from "../Common/Loader/Loader";
interface Project {
  _id: string;
  projectName: string;
}
interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    projectService
      .getall<Project[]>()
      .then((res: AxiosResponse) => {
        setProjects(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {projects.length > 1 ? (
        <div>
          <h3>Project List</h3>
          {projects.map((project) => (
            <Link
              key={project._id}
              to="#"
              className="list-group-item py-2 my-2 border-0 text-primary "
              onClick={() => onSelectProject(project)}
            >
              {project.projectName}
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectList;
