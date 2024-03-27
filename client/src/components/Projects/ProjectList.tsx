import { useEffect, useState } from "react";
import enquiryBookingServices from "../../services/enquiry/enquiryBookingServices";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { Link,  useNavigate } from "react-router-dom";
import Header from "../Common/Header/Header";
import { BuildingAdd, FileText, PlusCircleDotted } from "react-bootstrap-icons";

import ProjectListService from "../../services/project/ProjectListService";
import EditButton from "../Common/AuthButtons/EditButton";

const ProjectList = () => {
  const [bookingList, setBookingList] = useState<BookingMoved[]>([]);
  const [projectList, setProjectList] = useState<ProjectList[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    enquiryBookingServices
      .getall<BookingMoved[]>()
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setBookingList(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, []);

  useEffect(() => {
    ProjectListService.getall()
      .then((res: AxiosResponse) => setProjectList(res.data))
      .catch((err: any) => handleApiError(err));
  }, []);
  return (
    <div className=" container  ">
      <div className="row ">
        <div>
          <Header lable="New Projet" />
        </div>
        <div className="row ">
          <div className="col-md-6">
            {" "}
            Existing Project{" "}
            <Link to={"new"}>
              <PlusCircleDotted size={30} />
            </Link>
          </div>
        </div>
        <div className="  bg-white  border  border-opacity-50  rounded-3">
          <table className=" table   table-borderless  ">
            <thead>
              <tr>
                <th>S.no</th>
                <th>File No</th>
                <th>Name</th>
                <th>Location</th>
                <th>Book</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((enquiry, i) => (
                <tr key={enquiry._id}>
                  <td>{i + 1}</td>
                  <td>{enquiry.fileNumber}</td>

                  <td>{enquiry.name}</td>

                  <td>{enquiry.location}</td>
                  <td>
                    <Link
                      to={"new"}
                      state={{
                        fileNumber: enquiry.fileNumber,
                        name: enquiry.name,
                        email: enquiry.email,
                        location: enquiry.location,
                        enquiry: enquiry._id,
                      }}
                    >
                      <BuildingAdd size={30} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="row mt-4">
          <Header lable="Ongoing Projects" />
        </div>
        <div className="row bg-white p-2 border border-opacity-50  rounded-3">
          <table className=" table table-borderless  text-center  ">
            <thead>
              <tr>
                <th>S.No</th>
                <th>File No</th>
                <th>Project Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Edit</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {projectList?.length >= 1 ? (
                projectList?.map((project, index) => (
                  <tr key={project._id}>
                    <td>{index + 1}</td>
                    <td>{project.fileNumber}</td>
                    <td>{project.projectName}</td>
                    <td>{project.mobileNumber}</td>
                    <td>{project.email}</td>
                    <td>
                      <EditButton
                        onClick={() => navigate(`edit/${project._id}`)}
                      />
                    </td>
                    <td>
                      <Link to={`info/${project._id}`}>
                        <FileText size={30} className="mt-1" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className=" text-center  text-bg-info ">
                    {"No Active Projects"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
