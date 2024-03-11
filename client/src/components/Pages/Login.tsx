import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { AxiosResponse } from "axios";
import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { handleApiError } from "../../utils/apiUtils";

interface LoginProps {
  email: string;
  password: string;
  userType: string;
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const formsubmit = (data: LoginProps) => {
    authService
      .create(data)
      .then((res: AxiosResponse) => {
        const token = res.data.token;

        localStorage.setItem("token", token);

        navigate("/");
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  };
  return (
    <div className=" d-flex  justify-content-center  align-items-center vh-100 bg-body-tertiary ">
      <div className="container col-md-6 border rounded-2 shadow-lg py-4 ">
        <div className=" text-center ">
          <h1>Login </h1>
        </div>
        <form onSubmit={handleSubmit(formsubmit)}>
          <InputComponent
            register={register}
            name="email"
            placeholder="Enter Your Email"
            label="Email"
            error={errors.email}
            minlen={5}
          />
          <InputComponent
            type="password"
            register={register}
            name="password"
            placeholder="Enter Your Password"
            label="Password"
            error={errors.password}
          />
          <div className="container py-1 ">
            <label htmlFor="select " className=" fw-bold py-1 ">
              Please select your role
            </label>
            <select
              id="select"
              className=" form-select  form-control py-3 "
              {...register("userType")}
              required
            >
              <option value="">select your role</option>
              <option value="customer">User</option>
              <option value="user">Office Login</option>
            </select>
          </div>
          <SubmitComponent btnlable="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
