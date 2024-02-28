// NewUser.jsx
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import userService from "../../services/user/userService";
import { useNavigate, useParams } from "react-router-dom";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import Header from "../Common/Header/Header";
import { convertMongoDBDate } from "../../utils/dateConvertionUtils";

const NewUser = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const [formData, setFormData] = useState<Employee>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Employee>({
    defaultValues: isEditMode
      ? {
          ...formData,
        }
      : {},
  });

  useEffect(() => {
    if (isEditMode) {
      userService
        .getById<Employee>(id)
        .then((res: AxiosResponse) => setFormData(res.data));
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = (user: any) => {
    console.log(user);
    // const serviceMethod = isEditMode ? userService.update : userService.create;

    // serviceMethod(user)
    //   .then(() => {
    //     window.alert(
    //       isEditMode ? "User updated successfully" : "User created successfully"
    //     );
    //     navigate("/user/list");
    //   })
    //   .catch((err: AxiosError) => {
    //     window.alert(err.response?.statusText);
    //   });
  };

  return (
    <div className="container">
      <Header lable={isEditMode ? "Edit User" : "New User"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Name"
              name="name"
              placeholder="Enter Name"
              register={register}
              error={errors.name}
            />
          </div>
          <div className="col-md-6">
            <InputComponent
              label="Email"
              name="email"
              placeholder="Enter Email"
              register={register}
              error={errors.email}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Mobile Number"
              name="mobileNumber"
              register={register}
              error={errors.mobileNumber}
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <InputComponent
              label="Employee ID"
              name="employeeId"
              register={register}
              error={errors.employeeId}
            />
          </div>
          <div className="col-md-6">
            <InputComponent
              label="Joining Date"
              type="date"
              name="joiningDate"
              register={register}
              error={errors.joiningDate}
              defaultValue={"2024-02-02"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              register={register}
              error={errors.dateOfBirth}
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <InputComponent
              label="Father Name"
              name="fatherName"
              placeholder="Enter Father's Name"
              register={register}
              error={errors.fatherName}
            />
          </div>
          <div className="col-md-6">
            <InputComponent
              label="Father Phone Number"
              name="fatherPhoneNumber"
              placeholder="Enter Father's Phone Number"
              register={register}
              error={errors.fatherPhoneNumber}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Mother Name"
              name="motherName"
              placeholder="Enter Mother's Name"
              register={register}
              error={errors.motherName}
            />
          </div>
          <div className="col-md-6">
            <InputComponent
              label="Mother Phone Number"
              name="motherPhoneNumber"
              placeholder="Enter Mother's Phone Number"
              register={register}
              error={errors.motherPhoneNumber}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Address"
              name="address"
              placeholder="Enter Address"
              register={register}
              error={errors.address}
            />
          </div>
          <div className="col-md-6">
            <InputComponent
              label="Current Salary"
              type="number"
              name="salaryDetails.currentSalary"
              placeholder="Enter Current Salary"
              register={register}
              error={errors.salaryDetails?.currentSalary}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <InputComponent
              label="Role in POL"
              name="role"
              placeholder="Enter Role in POL"
              register={register}
              error={errors.role}
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-4">
            <InputComponent
              register={register}
              label="Account Number"
              error={errors.accountDeatails?.AccountNumber}
              name="accountDeatails.AccountNumber"
              notRequired
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              register={register}
              label="IFSC"
              error={errors.accountDeatails?.ifsc}
              name="accountDeatails.ifsc"
              notRequired
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              register={register}
              label="UPI Number"
              error={errors.accountDeatails?.gpay}
              name="accountDeatails.gpay"
              notRequired
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <InputComponent
              name="idProofDetails.idType"
              label="ID Proof Type"
              register={register}
              error={errors.idProofDetails?.idType}
              notRequired
            />
          </div>
          <div className="col-md-6">
            {" "}
            <InputComponent
              name="idProofDetails.idNumber"
              label="ID Proof Number"
              register={register}
              error={errors.idProofDetails?.idNumber}
              notRequired
            />
          </div>
        </div>

        {!isEditMode && (
          <div className="row">
            <div className="col-md-12">
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
        )}

        {/* Continue adding more InputComponents for other fields if needed */}

        <SubmitComponent
          btnlable={isEditMode ? "Update User" : "Create New User"}
        />
      </form>
    </div>
  );
};

export default NewUser;
