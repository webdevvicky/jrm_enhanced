import { useEffect, useState } from "react";
import {
  Building,
  EnvelopeAt,
  PersonBadge,
  Phone,
} from "react-bootstrap-icons";
import Header from "../Common/Header/Header";
import { useParams } from "react-router-dom";
import projectService from "../../services/project/projectService";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";

const ProjectInfo = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectProps>();

  useEffect(() => {
    if (id) {
      projectService
        .getById(id)
        .then((res: AxiosResponse) => {
          setProject(res.data);
        })
        .catch((err: any) => handleApiError(err));
    }
  }, [id]);

  return (
    <div className=" container  bg-white  border  rounded-3  py-2">
      <Header lable="Project Info" />
      <div>
        <div className="row py-3 ">
          <div className="col-md-6">
            <PersonBadge size={30} />
            <b>{project?.name}</b>
          </div>
          <div className="col-md-6">
            <Building size={30} />
            <b>{project?.projectName}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Phone size={30} /> <b>{project?.mobileNumber}</b>
          </div>
          <div className="col-md-4">
            <Phone size={30} />
            <b>{project?.alternateMobile}</b>
          </div>
          <div className="col-md-4">
            <EnvelopeAt size={30} /> <b>{project?.email}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
