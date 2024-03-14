import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";

import { handleApiError } from "../../utils/apiUtils";
import { useNavigate, useParams } from "react-router-dom";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import vendorService from "../../services/vendor/vendorService";
import Header from "../Common/Header/Header";
import EditButton from "../Common/AuthButtons/EditButton";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

const VendorForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorFormProps>();

  const navigate = useNavigate();

  // if (isEditMode) {
  //   const {
  //     isError,
  //     isLoading,
  //     data: vendor,
  //   } = useQuery({
  //     queryKey: ["VendorForm"],
  //     queryFn: async () => {
  //       const res: AxiosResponse<VendorFormProps> = await vendorService.getById(
  //         `${id}`
  //       );
  //       return res.data;
  //     },
  //   });
  //   console.log(isError, isLoading, vendor);
  // }

  useEffect(() => {
    if (isEditMode) {
      vendorService.getById(id).then((res: AxiosResponse) => reset(res.data));
    }
  }, [id]);

  const handleVendorForm = (vendor: VendorFormProps) => {
    if (isEditMode) {
      const updatedData = { _id: id, ...vendor };
      vendorService
        .update(updatedData)
        .then((res: AxiosResponse) => console.log(res.data));
    } else {
      vendorService
        .create(vendor)
        .then((res) => console.log(res.data))
        .catch((err: any) => handleApiError(err));
    }
  };

  return (
    <>
      <h2 className="  text-center">Vendor Form</h2>
      <div className="container bg-white border rounded-0 py-2">
        <Header lable="Shop Details" />
        <form onSubmit={handleSubmit(handleVendorForm)}>
          <div className="row ">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.name}
                label="Name"
                name="name"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.address}
                label="Address"
                name="address"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.gst}
                label="GST"
                name="gst"
              />
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-md-6">
              {" "}
              <InputComponent
                register={register}
                error={errors.items}
                label="Items"
                name="items"
              />
            </div>
            <div className="col-md-6">
              {" "}
              <InputComponent
                register={register}
                error={errors.rate}
                label="Rate"
                name="rate"
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

          <Header lable=" Contact Details" />

          <div className="row ">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.mobileNumber}
                label="Mobile No"
                name="mobileNumber"
                isNumber
                maxlen={10}
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.landlineNumber}
                label="Landline No"
                name="landlineNumber"
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.alternateNumber}
                label="Alternate No"
                name="alternateNumber"
                isNumber
                maxlen={10}
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.salesPersonName}
                label="Sales Person Name"
                name="salesPersonName"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.salesPersonMobile}
                label="Sales Person Mobile No"
                name="salesPersonMobile"
                isNumber
                maxlen={10}
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.ownerName}
                label="Owner Name"
                name="ownerName"
                notRequired
              />
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <InputComponent
                register={register}
                error={errors.ownerNumber}
                label="Owner No"
                name="ownerNumber"
                notRequired
                isNumber
                maxlen={10}
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

export default VendorForm;
