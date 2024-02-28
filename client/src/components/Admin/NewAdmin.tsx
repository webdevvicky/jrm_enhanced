import { AxiosResponse, AxiosError } from "axios";
import { useForm } from "react-hook-form";
import adminService from "../../services/admin/adminService";
import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";

const NewAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAdminProps>();

  const Onsubmit = (admin: NewAdminProps) => {
    adminService
      .create(admin)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        window.alert("admin created succesfully");
      })
      .catch((err: AxiosError) => {
        window.alert(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <InputComponent
          label="Admin Name"
          placeholder="Enter Admin Name"
          register={register}
          name="adminName"
          error={errors.adminName}
        />
        <InputComponent
          label="Admin Email"
          placeholder="Enter Admin Email"
          register={register}
          name="adminEmail"
          error={errors.adminEmail}
        />
        <InputComponent
          type="number"
          label="Admin Mobile Number"
          placeholder="Enter Admin Mobile Number"
          register={register}
          name="adminMobile"
          error={errors.adminMobile}
        />
        <InputComponent
          label="Admin Password"
          placeholder="Enter Admin Password"
          register={register}
          name="adminPassword"
          error={errors.adminPassword}
        />
        <SubmitComponent btnlable="Submit" />
      </form>
    </div>
  );
};

export default NewAdmin;
