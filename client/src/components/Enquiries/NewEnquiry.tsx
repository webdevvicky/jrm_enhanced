import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import Header from "../Common/Header/Header";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import { FormSelectProps } from "../../interfaces/CommonProps";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useEffect, useState } from "react";
import enquiryServices from "../../services/enquiry/enquiryServices";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { useNavigate, useParams } from "react-router-dom";
const NewEnquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState<NewEnquiryProps>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewEnquiryProps>();

  const booleanOptions: FormSelectProps[] = [
    {
      value: true,
      option: "yes",
    },
    { value: false, option: "No" },
  ];

  useEffect(() => {
    // Fetch data only when id is available
    if (id) {
      enquiryServices
        .getById<NewEnquiryProps>(id)
        .then((res: AxiosResponse) => {
          setEnquiry(res.data);
          reset(res.data);
        })
        .catch((err: any) => handleApiError(err));
    } else {
      // Reset the form state when creating a new entry
      setEnquiry(undefined);
      reset({});
    }
  }, [id, reset]);

  const handleSubmitEnquiry = (data: NewEnquiryProps) => {
    if (id) {
      const updatedData = { _id: id || "", ...data };
      enquiryServices
        .update(updatedData)
        .then(() => {
          navigate("/marketting/enquiry/list");
        })
        .catch((err: any) => handleApiError(err));
    } else {
      console.log(data);
      enquiryServices
        .create(data)
        .then(() => {
          navigate("/marketting/enquiry/list");
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  };
  return (
    <div className=" container bg-white my-3   border-opacity-50  border   rounded-3  ">
      <div className="py-3">
        {" "}
        <Header lable="New Enquiry " />
      </div>
      <form onSubmit={handleSubmit(handleSubmitEnquiry)}>
        <div className="row ">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <SelectComponent
              options={[1, 2, 3, 4, 5].map((value) => ({
                option: value.toString(),
                value: value.toString(),
              }))}
              name={"priority"}
              register={register}
              error={errors.priority}
              label="Priority"
              defaultValue={enquiry?.priority}
            />
          </div>

          <div className=" col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              name="name"
              label="Name"
              error={errors.name}
              register={register}
            />
          </div>

          <div className="col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              name="location"
              label="Location"
              error={errors.location}
              register={register}
            />
          </div>

          <div className="col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              name="mobileNumber"
              label="Contact Number"
              error={errors.mobileNumber}
              register={register}
              isNumber
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
            {" "}
            <InputComponent
              name="email"
              label="Email ID"
              error={errors.email}
              register={register}
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <SelectComponent
              options={booleanOptions}
              name={"quotationSent"}
              register={register}
              error={errors.quotationSent}
              label="Quotation"
              defaultValue={false}
              notRequired
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            {" "}
            <SelectComponent
              options={booleanOptions}
              name={"siteVisit"}
              register={register}
              error={errors.siteVisit}
              label="Site Visit"
              defaultValue={false}
              notRequired
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <SelectComponent
              options={booleanOptions}
              name={"officeVisit"}
              register={register}
              error={errors.officeVisit}
              label="Office Visit"
              defaultValue={false}
              notRequired
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <SelectComponent
              options={booleanOptions}
              name={"schemeSent"}
              register={register}
              error={errors.schemeSent}
              label="Scheme Sent"
              defaultValue={false}
              notRequired
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            {" "}
            <SelectComponent
              options={[
                { option: "Web Site", value: "website" },
                { option: "Direct Call", value: "call" },
                {
                  option: "Direct Visit",
                  value: "visit",
                },
                {
                  option: "Reference",
                  value: "reference",
                },
                { option: "Social Media", value: "socialmedia" },
                { option: "Just Dial", value: "justdial" },
              ]}
              name={"source"}
              register={register}
              error={errors.source}
              label="Source"
              defaultValue={enquiry?.source}
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              register={register}
              name="initialRemark"
              label="Initial Remark"
              error={errors.initialRemark}
            />
          </div>
          {id && (
            <div className="col-sm-6 col-md-4 col-lg-3">
              <SelectComponent
                options={booleanOptions}
                name={"movedToBook"}
                register={register}
                error={errors.movedToBook}
                label="Move to Booking"
                defaultValue={false}
                notRequired
              />
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-md-12">
            <SubmitComponent btnlable={id ? "Edit" : "Submit"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEnquiry;
