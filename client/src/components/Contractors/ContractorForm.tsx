import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import { handleApiError } from "../../utils/apiUtils";
import { useNavigate, useParams } from "react-router-dom";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import Header from "../Common/Header/Header";
import EditButton from "../Common/AuthButtons/EditButton";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import contractorService from "../../services/contractor/contractorService";

const ContractorForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContractorFormProps>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      contractorService
        .getById<ContractorFormProps>(id)
        .then((res: AxiosResponse) => reset(res.data));
    }
  }, [id]);

  const handleContractorForm = (contractor: ContractorFormProps) => {
    if (isEditMode) {
      const updatedData = { _id: id, ...contractor, isRejected: false };

      contractorService
        .update(updatedData)
        .then((res: AxiosResponse<ContractorProps>) =>
          navigate(`/accounts/contractor/view/${res.data._id}`)
        )
        .catch((err: any) => handleApiError(err));
    } else {
      contractorService
        .create(contractor)
        .then((res: AxiosResponse<ContractorProps>) =>
          navigate(`/accounts/contractor/view/${res.data._id}`)
        )
        .catch((err: any) => handleApiError(err));
    }
  };

  return (
    <>
      <h2 className="  text-center">Contractor Form</h2>
      <div className="container bg-white border rounded-0 py-2">
        <Header lable="Contractor Details" />
        <form onSubmit={handleSubmit(handleContractorForm)}>
          <div className="row ">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.name}
                label="Contractor Name"
                name="name"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.mobileNumber}
                label="Mobile Number"
                name="mobileNumber"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.category}
                label="Category"
                name="category"
              />
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.rate}
                label="Rate"
                name="rate"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.alternatePerson}
                label="Alternate Person"
                name="alternatePerson"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.alternateMobile}
                label="Alternate Person Number"
                name="alternateMobile"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.permanentAddress}
                label="Permanent Address"
                name="permanentAddress"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.temporaryAddress}
                label="Temporary Address"
                name="temporaryAddress"
              />
            </div>
          </div>

          <Header lable="Account Details" />

          <div className="row pb-3">
            <div className="col-sm-6 col-md-4 col-lg-3">
              {" "}
              <InputComponent
                register={register}
                error={errors.accountDetails?.accountNumber}
                label="Account No"
                name="accountDetails.accountNumber"
                isNumber
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.accountDetails?.ifsc}
                label="IFSC"
                name="accountDetails.ifsc"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.accountDetails?.branchName}
                label="Branch Name"
                name="accountDetails.branchName"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.accountDetails?.upi}
                label="Upi"
                name="accountDetails.upi"
              />
            </div>
          </div>

          <Header lable=" ID Proof Details" />
          <div className="row">
            <div className="col-md-6">
              <InputComponent
                register={register}
                error={errors.idProofType}
                label="ID Proof Type"
                name="idProofType"
              />
            </div>
            <div className="col-md-6">
              <InputComponent
                register={register}
                error={errors.idProofNumber}
                label="Id Proof Number"
                name="idProofNumber"
              />
            </div>
          </div>

          {isEditMode ? (
            <EditButton label="Edit" />
          ) : (
            <SubmitComponent btnlable="submit" />
          )}
        </form>
      </div>
    </>
  );
};

export default ContractorForm;
