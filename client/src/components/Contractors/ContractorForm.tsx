import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import contractService from "../../services/contractor/contractService";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { handleApiError } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
interface IsEdit {
  isEdit?: boolean;
  data?: ContractorProps;
}
interface ContractorProps extends NewContractor {
  _id: string;
}
const ContractorForm = ({ isEdit, data }: IsEdit) => {
  // const [contractor, setContractor] = useState<ContractorProps | null>(
  //   data ?? null
  // );

  const contractor = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewContractor>({
    defaultValues: isEdit ? { ...contractor } : {},
  });

  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleNewContractor = (contract: NewContractor) => {
    if (isEdit) {
      const updated = { _id: contractor ? contractor._id : "", ...contract };
      contractService
        .update(updated)
        .then((res: AxiosResponse) => {
          window.alert(res.statusText);
          window.location.reload();
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    } else {
      contractService
        .create(contract)
        .then((res: AxiosResponse) => {
          window.alert(res.statusText);
          navigate("/contractor/list");
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleNewContractor)}>
        <InputComponent
          name="contractName"
          error={errors.contractName}
          register={register}
          label="Contract Name With Site"
        />
        <InputComponent
          name="ownerName"
          error={errors.ownerName}
          register={register}
          label="owner Name "
        />
        <InputComponent
          name="contractorType"
          error={errors.contractorType}
          register={register}
          label="Contractor Type"
        />
        <InputComponent
          name="contractorMobile"
          error={errors.contractorMobile}
          register={register}
          label="Contractor Mobile"
          isNumber
          notRequired
        />
        <InputComponent
          name="alternateMobile"
          error={errors.alternateMobile}
          register={register}
          label=" Alternate Mobile Number"
          notRequired
          isNumber
        />
        <InputComponent
          name="contractorEmail"
          error={errors.contractorEmail}
          register={register}
          label="Contractor Email"
          notRequired
        />
        <InputComponent
          name="gpayNumber"
          error={errors.gpayNumber}
          register={register}
          label="G Pay Number"
          isNumber
          notRequired
        />
        <InputComponent
          name="accountNumber"
          error={errors.accountNumber}
          register={register}
          label="Account  Number"
          isNumber
          notRequired
        />
        <InputComponent
          name="ifsc"
          error={errors.ifsc}
          register={register}
          label="IFSC"
          notRequired
        />
        {isEdit ? (
          <SubmitComponent btnlable="Update  Contractor" />
        ) : (
          <SubmitComponent btnlable="New Contractor" />
        )}
      </form>
    </div>
  );
};

export default ContractorForm;
