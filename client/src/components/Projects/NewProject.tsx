import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import projectService from "../../services/project/projectService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleApiError } from "../../utils/apiUtils";

interface IsEditble {
  isEdit?: boolean;
  _id?: string;
}
const NewProject = ({ isEdit, _id }: IsEditble) => {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState<NewProjectProps>();
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProjectProps>({
    defaultValues: isEdit ? { ...newProject } : {},
  });
  useEffect(() => {
    if (isEdit) {
      projectService.getById(`${_id}`).then((res: AxiosResponse) => {
        setNewProject(res.data);
        // Use reset function after setting newProject to update defaultValues
        reset({ ...res.data });
      });
    }
  }, [isEdit, _id, reset]);
  const onsubmit = (data: NewProjectProps) => {
    if (isEdit) {
      const update = { _id: _id ? _id : "", data };

      projectService
        .update(update)
        .then((res: AxiosResponse) => {
          window.alert(res.data);
          window.location.reload();
        })
        .catch((err: any) => {
          handleApiError(err);
          navigate("/projects/ongoing");
        });
    } else {
      // Create new project
      projectService
        .create(data)
        .then(() => {
          navigate("/projects/ongoing");
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <InputComponent
            name="projectName"
            label="New Site Name"
            register={register}
            error={errors.projectName}
          />
          <InputComponent
            name="name"
            label="Customer Name"
            register={register}
            error={errors.name}
          />
          <InputComponent
            name="fileNumber"
            label="project File Number"
            register={register}
            error={errors.fileNumber}
            isNumber
          />
          <InputComponent
            name="projectLocation"
            label="Project Location"
            register={register}
            error={errors.projectLocation}
          />

          <InputComponent
            name="projectAddress"
            label="Address"
            register={register}
            error={errors.projectAddress}
          />

          <InputComponent
            name="pinCode"
            label="pincode"
            register={register}
            error={errors.pinCode}
            isNumber={true}
          />
          {!isEdit && (
            <>
              <InputComponent
                type="date"
                name="startDate"
                label=" Start Date"
                register={register}
                error={errors.startDate}
              />
              <InputComponent
                type="date"
                name="completionDate"
                label=" Completion Date"
                register={register}
                error={errors.completionDate}
              />
            </>
          )}
          <InputComponent
            name="email"
            type="email"
            label="Client email"
            register={register}
            error={errors.email}
          />
          <InputComponent
            name="alternateEmail"
            type="email"
            label="Alternate email"
            register={register}
            error={errors.alternateEmail}
            notRequired
          />
          <InputComponent
            name="mobileNumber"
            label="Client Mobile Number"
            register={register}
            error={errors.mobileNumber}
            isNumber
            maxlen={10}
            minlen={10}
          />
          <InputComponent
            name="alternateMobile"
            label="Alternate Mobile Number"
            register={register}
            error={errors.alternateMobile}
            isNumber
            maxlen={10}
            minlen={10}
            notRequired
          />
          {!isEdit && (
            <InputComponent
              type="password"
              name="password"
              label="Client  login password "
              register={register}
              error={errors.password}
              notRequired={isEdit}
            />
          )}

          {isEdit && (
            <>
              <div>
                {" "}
                <div className="form-check container">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("isCompleted")}
                    id="flexCheckDefault"
                    checked={isCompleted}
                    onChange={() => setIsCompleted(!isCompleted)}
                  />
                  <label
                    className="form-check-label text-danger "
                    htmlFor="flexCheckDefault"
                  >
                    select this for completed project ... once updating this
                    cannot get back this for po ,invoices etc
                  </label>
                </div>
                {isCompleted && (
                  <InputComponent
                    type="Date"
                    register={register}
                    error={errors.completedDate}
                    label="Completed Date"
                    name="completedDate"
                  />
                )}
              </div>
            </>
          )}

          {!isEdit ? (
            <SubmitComponent btnlable="Create New Project" />
          ) : (
            // <button style={{ backgroundColor: "#383b67" }}>edit</button>
            <SubmitComponent btnlable="Edit Project" />
          )}
        </form>
      </div>
    </div>
  );
};

export default NewProject;
