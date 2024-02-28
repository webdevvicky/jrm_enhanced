import { useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import InputComponent from "../Common/FormComponents/InputComponent";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useNavigate } from "react-router-dom";
import voucherService from "../../services/voucher/voucherService";
import { useProjectSelectData } from "../../hooks/useProjectSelectData";
import { useEmployeeSelectData } from "../../hooks/useEmloyeeSelectData";

interface IsEditVoucher {
  isEdit?: boolean;
  voucher?: VoucherModelProps;
}

const NewEmployeeVoucher = ({ voucher }: IsEditVoucher) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEmployeeVoucherProps>();
  const navigate = useNavigate();

  // fetching project name and id  details
  const projectOptions = useProjectSelectData();
  const employeeOptions = useEmployeeSelectData();

  // posting voucher data to server

  const onSubmitForm = (data: NewEmployeeVoucherProps) => {
    voucherService
      .create(data)
      .then((res: AxiosResponse) => {
        window.alert(res.statusText);
        navigate(`/voucher/model/${res.data._id}`);
      })
      .catch((err: AxiosError) => {
        window.alert(err.response?.statusText);
      });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="row">
          <div className="col-md-4">
            <SelectComponent
              register={register}
              label="Select Received "
              name="receiverId"
              error={errors.receiverId}
              options={employeeOptions}
              defaultValue={voucher?.receiverId}
            />
          </div>
          <div className="col-md-4">
            <SelectComponent
              register={register}
              label="Select your Project"
              name="projectId"
              error={errors.projectId}
              options={projectOptions}
              defaultValue={voucher?.projectId}
            />
          </div>
        </div>
        <div className="row">
          <InputComponent
            register={register}
            name="description"
            label="Voucher Description"
            error={errors.description}
            defaultValue={voucher?.description}
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <InputComponent
              type="number"
              register={register}
              name="paymentAmount"
              label="Payment Amount"
              error={errors.paymentAmount}
              isNumber
              defaultValue={voucher?.paymentAmount}
            />
          </div>
          <div className="col-md-4">
            <InputComponent
              register={register}
              name="paymentMethod"
              label="Payment Method"
              placeholder="Enter Payment Method -- Online/Offline"
              error={errors.paymentMethod}
              defaultValue={voucher?.paymentMethod}
            />
          </div>

          <div className="col-md-4">
            <SelectComponent
              register={register}
              label="Select printed employee"
              name="printedById"
              error={errors.printedById}
              options={employeeOptions}
              defaultValue={voucher?.printedById}
            />
          </div>
        </div>
        <SelectComponent
          register={register}
          label="Select Employee who Transfered the money"
          name="transferredById"
          error={errors.transferredById}
          options={employeeOptions}
          defaultValue={voucher?.transferredById}
        />

        <SubmitComponent btnlable="Generate New Voucher" />
      </form>
    </div>
  );
};

export default NewEmployeeVoucher;
