import { useForm } from "react-hook-form";
import Header from "../Common/Header/Header";
import FloatingLabelInput from "../Common/FormComponents/FloatingLableInput";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import {
  FieldData,
  FormSelectProps,
  SelectOptions,
} from "../../interfaces/CommonProps";
import {
  getCurrentDate,
  getCurrentTime,
} from "../../utils/dateConvertionUtils";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import FloatingSelect from "../Common/FormComponents/FloatingSelect";

const NewEnquiry = () => {
  const defaultValuesinitial = {
    contactNumber: 8531822186,
    leadCatagery: "helllop",
    time: getCurrentTime(),
    date: getCurrentDate(),
    location: "",
    name: "vignesh",
  };

  console.log(getCurrentTime());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEnquiryProps>({
    defaultValues: { ...(defaultValuesinitial || {}) },
  });

  const onsubmit = (data: NewEnquiryProps) => {
    console.log(data);
  };
  const enquiryData: FieldData<NewEnquiryProps>[] = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Contact Number",
      name: "contactNumber",
      validation: { isNumber: true },
    },
    { label: "Time", name: "time", type: "time" },
    { label: "Date  ", name: "date", type: "date" },
    { label: "Date  ", name: "date", type: "date" },
    { label: "Date  ", name: "date", type: "date" },
  ];

  const options: FormSelectProps[] = [{ option: "one", value: "1" }];
  return (
    <div className=" container ">
      <Header lable="New Enquiry" />
      <div className="container pt-5">
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="row">
            {enquiryData.map((item, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={index + 1}>
                <FloatingLabelInput
                  key={index}
                  label={item.label}
                  name={item.name}
                  register={register}
                  type={item.type}
                  error={errors[item.name]}
                  validation={item.validation}
                  defaultValue={defaultValuesinitial[item.name]}
                />
              </div>
            ))}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <FloatingSelect
                register={register}
                name="leadCatagery"
                options={options}
                error={errors.leadCatagery}
                label="select category"
              />
            </div>
          </div>

          <SubmitComponent btnlable="Submit" />
        </form>
      </div>
    </div>
  );
};

export default NewEnquiry;
