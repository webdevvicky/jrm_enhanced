import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Controller, useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import userService from "../../services/user/userService";
import { useNavigate, useParams } from "react-router-dom";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import Header from "../Common/Header/Header";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import Select from "react-select";
import { handleApiError } from "../../utils/apiUtils";
import employeeService from "../../services/employee/employeeService";

const NewEmployee = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [employee, setEmployee] = useState<Employee>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Employee>();

  useEffect(() => {
    if (id) {
      userService
        .getById<Employee>(`${id}`)
        .then((res: AxiosResponse) => {
          reset(res.data);
          setEmployee(res.data);
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  }, [id]);

  const onSubmit = (user: Employee) => {
    const selectedRoutes = user.selectedOptions.map((item) => item.value);
    const updated = { ...user, allowedRoutes: selectedRoutes };

    if (id) {
      const dataWithId = { id: id, ...updated };
      employeeService
        .update(dataWithId)
        .then(() => navigate("/admin/employee"))
        .catch((err: any) => handleApiError(err));
    } else {
      employeeService
        .create(updated)
        .then((res: AxiosResponse) => {
          console.log(res);
          navigate("/admin/employee");
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  };

  const options = [
    { value: "marketting", label: "Marketting" },
    { value: "designs", label: "Designs" },
    { value: "purchase", label: "Purchase" },
    { value: "accounts", label: "Accounts" },
    { value: "execution", label: "Execution" },
  ];

  return (
    <div className="container">
      <Header lable={id ? "Edit Employee" : "New Employee"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Name"
              name="name"
              placeholder="Enter Name"
              register={register}
              error={errors.name}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Email"
              name="email"
              placeholder="Enter Email"
              register={register}
              error={errors.email}
            />
          </div>

          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Mobile Number"
              name="mobileNumber"
              register={register}
              error={errors.mobileNumber}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Alternate Mobile Number"
              name="alternateMobileNumber"
              register={register}
              error={errors.alternateMobileNumber}
              notRequired
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Address"
              name="address"
              placeholder="Enter Address"
              register={register}
              error={errors.address}
            />
          </div>

          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Current Salary"
              type="number"
              name="salaryDetails.currentSalary"
              placeholder="Enter Current Salary"
              register={register}
              error={errors.salaryDetails?.currentSalary}
            />
          </div>

          <div className=" col-sm-6 col-md-4 col-lg-3">
            <SelectComponent
              label="Role in POL"
              name="role"
              defaultValue={employee?.role}
              register={register}
              options={[
                {
                  value: "admin",
                  option: "admin",
                },
                {
                  value: "generalmanager",
                  option: "General Manager",
                },
                {
                  value: "projectmanager",
                  option: "Project Manager",
                },
                {
                  value: "leadarchitech",
                  option: "Lead Architech",
                },
                {
                  value: "architech",
                  option: "Architech",
                },
                {
                  value: "coordinater",
                  option: "Coordinater",
                },
                {
                  value: "siteengineer",
                  option: "Site Engineer",
                },
                {
                  value: "marketting",
                  option: "Marketting",
                },
              ]}
              error={errors.role}
            />
          </div>

          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Designation"
              name="designation"
              placeholder="Enter Designation"
              register={register}
              error={errors.designation}
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Employee ID"
              name="employeeId"
              register={register}
              error={errors.employeeId}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Joining Date"
              type="date"
              name="joiningDate"
              register={register}
              error={errors.joiningDate}
              defaultValue={"2024-02-02"}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              register={register}
              error={errors.dateOfBirth}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Blood Group"
              name="bloodGroup"
              placeholder="Enter Blood Group"
              register={register}
              error={errors.bloodGroup}
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Father Name"
              name="personalDetails.fatherName"
              register={register}
              error={errors.personalDetails?.fatherName}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Father Phone Number"
              name="personalDetails.fatherPhoneNumber"
              register={register}
              error={errors.personalDetails?.fatherPhoneNumber}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Mother Name"
              name="personalDetails.motherName"
              register={register}
              error={errors.personalDetails?.motherName}
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Mother Phone Number"
              name="personalDetails.motherPhoneNumber"
              register={register}
              error={errors.personalDetails?.motherPhoneNumber}
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              register={register}
              label="Account Number"
              error={errors.accountDeatails?.accountNumber}
              name="accountDeatails.accountNumber"
              notRequired
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              register={register}
              label="IFSC"
              error={errors.accountDeatails?.ifsc}
              name="accountDeatails.ifsc"
              notRequired
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              register={register}
              label="UPI Number"
              error={errors.accountDeatails?.gpay}
              name="accountDeatails.gpay"
              notRequired
            />
          </div>
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              name="idProofDetails.idType"
              label="ID Proof Type"
              register={register}
              error={errors.idProofDetails?.idType}
              notRequired
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              name="idProofDetails.idNumber"
              label="ID Proof Number"
              register={register}
              error={errors.idProofDetails?.idNumber}
              notRequired
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              label="Password"
              type="password"
              name="password"
              placeholder="Enter Password"
              register={register}
              error={errors.password}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className=" form-label  fw-bold  mb-3">Select Options</label>
            <Controller
              name="selectedOptions"
              control={control}
              render={({ field }) => (
                <Select isMulti options={options} {...field} />
              )}
            />
          </div>
        </div>

        {/* Continue adding more InputComponents for other fields if needed */}

        <SubmitComponent btnlable={id ? "Update User" : "Create New User"} />
      </form>
    </div>
  );
};

export default NewEmployee;
