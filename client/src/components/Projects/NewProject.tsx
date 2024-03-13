import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputComponent from "../Common/FormComponents/InputComponent";
import { useEffect, useState } from "react";
import Header from "../Common/Header/Header";
import employeeService from "../../services/employee/employeeService";
import { AxiosResponse } from "axios";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import projectService from "../../services/project/projectService";
import { handleApiError } from "../../utils/apiUtils";

const NewProject = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editableData, setEditableData] = useState<ProjectProps>();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NewProjectProps>();

  useEffect(() => {
    if (id) {
      projectService.getById(id).then((res: AxiosResponse) => {
        reset(res.data);
        setEditableData(res.data);
      });
    }
  }, [id]);

  const { state } = useLocation();

  useEffect(() => {
    reset(state);
  }, [state]);

  useEffect(() => {
    employeeService
      .getall()
      .then((res: AxiosResponse) => setEmployees(res.data));
  }, []);

  const architect = employees.filter((emp) => emp.role === "architech");
  const siteEngineer = employees.filter((emp) => emp.role === "siteengineer");
  const ProjectManager = employees.filter(
    (emp) => emp.role === "projectmanager"
  );

  const handleProject = (project: NewProjectProps) => {
    if (id) {
      projectService
        .update({ _id: id, ...project ,isRejected:false})
        .then(() => navigate("/designs/booking/status"))
        .catch((err: any) => handleApiError(err));
    } else {
      projectService
        .create(project)
        .then(() => navigate("/designs/booking/status"))
        .catch((err: any) => handleApiError(err));
    }
  };

  return (
    <div className=" container-fluid py-3   ">
      <div className=" container py-3  border-secondary-subtle border bg-white  rounded-3 ">
        <form onSubmit={handleSubmit(handleProject)}>
          <div className="row">
            <Header lable="Project Details" />
          </div>
          <div className="row">
            <div className="col-md-6">
              <InputComponent
                register={register}
                name="projectName"
                error={errors.projectName}
                label="Project Name"
              />
            </div>
            <div className="col-md-6">
              <InputComponent
                register={register}
                name="fileNumber"
                error={errors.fileNumber}
                label="file Number"
              />
            </div>
          </div>

          <div className="row">
            <Header lable="Client details" />
          </div>

          <div className="row">
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="name"
                label="Name"
                error={errors.name}
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="mobileNumber"
                label="Contact Number"
                error={errors.mobileNumber}
                isNumber
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="alternateMobile"
                label="Alternate Mobile"
                error={errors.alternateMobile}
                isNumber
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="email"
                label="Email Id"
                error={errors.email}
                type="email"
              />
            </div>
          </div>

          <div className="row">
            <div className=" col-sm-4 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="occupation"
                label="Occupation"
                error={errors.occupation}
              />
            </div>
            <div className=" col-sm-8 col-md-8  col-lg-9 ">
              <InputComponent
                register={register}
                name="address"
                label="Address"
                error={errors.address}
              />
            </div>
          </div>

          <div className="row py-2">
            <Header lable="Project details" />
          </div>

          <div className="row">
            <div className=" col-sm-4 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="projectLocation"
                label="Site Location"
                error={errors.projectLocation}
              />
            </div>
            <div className=" col-sm-8 col-md-8  col-lg-9 ">
              <InputComponent
                register={register}
                name="projectAddress"
                label="Site Address"
                error={errors.projectAddress}
              />
            </div>
          </div>

          <div className="row">
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="plotArea"
                label="Plot Area"
                error={errors.plotArea}
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="floorsNumber"
                label="No Of Floors"
                error={errors.floorsNumber}
                isNumber
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="buildUpArea"
                label="Build Up Area"
                error={errors.buildUpArea}
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="facing"
                label="Facing"
                error={errors.facing}
              />
            </div>
          </div>

          <div className="row">
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="roadWidth"
                label="Road Width"
                error={errors.roadWidth}
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="cementBrand"
                label="Cement Brand"
                error={errors.cementBrand}
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="steelBrand"
                label="Steel Brand"
                error={errors.steelBrand}
              />
            </div>
            <div className=" col-sm-6 col-md-4  col-lg-3 ">
              <InputComponent
                register={register}
                name="brickWork"
                label="Concrete/Brick Work"
                error={errors.brickWork}
              />
            </div>
          </div>
          <div className="row">
            <div className=" col-md-4 ">
              <InputComponent
                register={register}
                name="plasteringWork"
                label="Plastering Work"
                error={errors.plasteringWork}
              />
            </div>
          </div>

          <div className="row  py-2">
            <Header lable="Incharges" />
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 ">
              <SelectComponent
                register={register}
                options={architect.map((x) => ({
                  option: x.name,
                  value: x._id,
                }))}
                name="architect"
                label="Architect In-Charge"
                error={errors.architect}
                defaultValue={editableData?.architect}
              />
            </div>
            <div className="col-sm-6 col-md-4 ">
              <SelectComponent
                register={register}
                options={ProjectManager.map((x) => ({
                  option: x.name,
                  value: x._id,
                }))}
                name="projectManager"
                label="Project Manager Assigned"
                error={errors.projectManager}
                defaultValue={editableData?.projectManager}
              />
            </div>
            <div className="col-sm-6 col-md-4 ">
              <SelectComponent
                register={register}
                options={siteEngineer.map((x) => ({
                  option: x.name,
                  value: x._id,
                }))}
                name="siteEngineer"
                label="Site Engineer Assigned"
                error={errors.siteEngineer}
                defaultValue={editableData?.siteEngineer}
              />
            </div>
          </div>
          <SubmitComponent btnlable={id ? "Edit" : "Submit"} />
        </form>
      </div>
    </div>
  );
};

export default NewProject;
