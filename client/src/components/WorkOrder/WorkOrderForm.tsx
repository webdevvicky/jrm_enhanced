import { useForm } from "react-hook-form";
import { ArrayField } from "../../interfaces/CommonProps";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import { useProjectSelectData } from "../../hooks/useProjectSelectData";
import Header from "../Common/Header/Header";
import ArrayInput from "../Common/FormComponents/ArrayInputComponent";
import { useContractorSelectData } from "../../hooks/useContractorSelectData";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import woService from "../../services/workOrder/woService";
import { useParams } from "react-router-dom";

const WorkOrderForm = () => {
  const [totalAmount, SetTotalAmount] = useState(0);
  const [editWorkOrderData, setEditWorkOrderData] =
    useState<WorkOrderFormProps>();
  const { id } = useParams();
  const isEdit = !!id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm<WorkOrderFormProps>({ defaultValues: editWorkOrderData });

  const itemFields: ArrayField[] = [
    {
      name: "description",
      label: "Description",
    },
    {
      name: "qty",
      label: "Quantity",
    },
    {
      name: "unit",
      label: "Unit",
    },
    { name: "rate", label: "Rate" },
  ];

  const termFields: ArrayField[] = [
    { name: "description", label: "Description" },
  ];

  const handleTotalChange = (total: string) => {
    SetTotalAmount(parseFloat(total));
  };

  useEffect(() => {
    if (isEdit) {
      woService
        .getById<WorkOrderFormProps>(id)
        .then((res: AxiosResponse<WorkOrderFormProps>) => {
          setEditWorkOrderData(res.data);
          reset(res.data);
        });
    }
  }, [isEdit]);

  const handleWorkOrderSubmit = (workOrder: WorkOrderFormProps) => {
    if (workOrder.items.length < 1) {
      window.alert("please Add Atleast One Item ");
      return;
    }

    const updatedWorkOrder = { ...workOrder, totalAmount: totalAmount };

    if (isEdit) {
      woService
        .update({ _id: id, ...updatedWorkOrder })
        .then((res: AxiosResponse) => {
          console.log(res.data);
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    } else {
      woService
        .create(updatedWorkOrder)
        .then((res: AxiosResponse) => console.log(res.data))
        .catch((err: any) => handleApiError(err));
    }
  };

  return (
    <>
      <div className="container py-3 bg-white  rounded-5 ">
        <div>
          <Header lable="Work Order" />
        </div>
        <form onSubmit={handleSubmit(handleWorkOrderSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <SelectComponent
                register={register}
                name="project"
                label="Project"
                error={errors.project}
                options={useProjectSelectData()}
                defaultValue={editWorkOrderData?.project}
              />
            </div>
            <div className="col-md-6">
              <SelectComponent
                register={register}
                name="contractor"
                label="Contractor"
                error={errors.contractor}
                options={useContractorSelectData()}
                defaultValue={editWorkOrderData?.contractor}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <ArrayInput
                register={register}
                fields={itemFields}
                control={control}
                multiplyFields={["qty", "rate"]}
                name="items"
                onTotalChange={handleTotalChange}
                watch={watch}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <ArrayInput
                register={register}
                fields={termFields}
                watch={watch}
                control={control}
                name="terms"
              />
            </div>
          </div>

          <SubmitComponent btnlable="Submit" />
        </form>
      </div>
    </>
  );
};

export default WorkOrderForm;
