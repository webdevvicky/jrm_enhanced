import { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Common/FormComponents/InputComponent";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import invoiceService from "../../services/invoice/invoiceService";
import { useProjectSelectData } from "../../hooks/useProjectSelectData";
import { handleApiError } from "../../utils/apiUtils";
import { convertMongoDBDate } from "../../utils/dateConvertionUtils";

interface IsEditProps {
  invoicedata?: InvoiceListProps;
  isEdit?: boolean;
}

const NewInvoice = ({ invoicedata, isEdit }: IsEditProps) => {
  const projectSelectData = useProjectSelectData();

  const InvoiceDefault = {
    projectId: invoicedata?.projectId._id,
    invoiceNumber: invoicedata?.invoiceNumber,
    subject: invoicedata?.subject,
    description: invoicedata?.description,
    rate: invoicedata?.rate,
    modeOfPayment: invoicedata?.modeOfPayment,
    refNumber: invoicedata?.refNumber,
    paymentMade: invoicedata?.paymentMade,
    balanceToBeMade: invoicedata?.balanceToBeMade,
    nextDue: invoicedata?.nextDue,
    dueDate: invoicedata?.dueDate,
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewInvoiceProps>({
    defaultValues: isEdit
      ? {
          ...InvoiceDefault,
          dueDate: convertMongoDBDate(invoicedata?.dueDate),
        }
      : {},
  });

  const handlesubmitinvoice = (data: NewInvoiceProps) => {
    if (isEdit) {
      invoiceService
        .update({ ...data, _id: invoicedata ? invoicedata._id : "" })
        .then(() => window.location.reload())
        .catch((err: any) => handleApiError(err));
    } else {
      invoiceService
        .create(data)
        .then((res: AxiosResponse) => {
          window.alert("Invoice generated successfully");
          navigate(`/invoice/${res.data._id}`);
        })
        .catch((err: AxiosError) => {
          window.alert(err);
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handlesubmitinvoice)}>
        <SelectComponent
          register={register}
          label="Select your Project"
          name="projectId"
          error={errors.projectId}
          options={projectSelectData}
          defaultValue={invoicedata?.projectId._id}
        />

        <InputComponent
          name="subject"
          label="Payment Subject"
          register={register}
          error={errors.subject}
        />
        <InputComponent
          name="description"
          label="Payment description"
          register={register}
          error={errors.description}
        />
        <InputComponent
          name="rate"
          label=" Rate"
          register={register}
          error={errors.rate}
          isNumber
        />

        <InputComponent
          name="paymentMade"
          label="Payment received"
          register={register}
          error={errors.paymentMade}
          isNumber
        />

        <InputComponent
          name="balanceToBeMade"
          label="Payment balance to be made "
          register={register}
          error={errors.balanceToBeMade}
          isNumber
        />
        <InputComponent
          name="nextDue"
          label="Next Due Amount "
          register={register}
          error={errors.nextDue}
          isNumber
        />
        <InputComponent
          type="date"
          name="dueDate"
          label="Next Due Date "
          register={register}
          error={errors.dueDate}
        />
        <InputComponent
          name="modeOfPayment"
          label="Payment received through"
          register={register}
          error={errors.modeOfPayment}
        />
        <InputComponent
          name="refNumber"
          label="Payment reference number"
          register={register}
          error={errors.refNumber}
          isNumber
        />
        <SubmitComponent
          btnlable={isEdit ? "Edit Invoice" : "Create Invoice"}
        />
      </form>
    </div>
  );
};

export default NewInvoice;
