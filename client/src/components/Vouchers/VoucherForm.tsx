import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLocation } from "react-router-dom";
import { useContractorSelectData } from "../../hooks/useContractorSelectData";
import { useProjectSelectData } from "../../hooks/useProjectSelectData";
import { useVendorSelectData } from "../../hooks/useVendorSelectData";
import { FormSelectProps } from "../../interfaces/CommonProps";
import InputComponent from "../Common/FormComponents/InputComponent";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import Header from "../Common/Header/Header";
import VoucherHistory from "./VoucherHistory";
import { AxiosResponse } from "axios";
import poService from "../../services/po/poService";
import voucherService from "../../services/voucher/voucherService";
import SubmitComponent from "../Common/FormComponents/SumitComponent";

const VoucherForm = () => {
  const { state } = useLocation();
  const [selectedType, setSelectedType] = useState(state.type);
  const [contractorId, setContractorId] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [vendorId, setVendorId] = useState();
  const [projectId, setProjectId] = useState();
  const { id } = useParams();
  const isEdit = !!id;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<VoucherFormProps>({});

  const typeOptions: FormSelectProps[] = [
    { option: "Purchase Order", value: "purchaseOrder" },
    { option: "LocalPurchase", value: "localPurchase" },
    { option: "Work Order", value: "workOrder" },
    { option: "Labour Payment", value: "labourPayment" },
    { option: "Petty Cash", value: "pettyCash" },
  ];

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (state.type == "purchaseOrder") {
      poService.getById(state._id).then((res: AxiosResponse) => {
        setProjectId(res.data.project);
        setVendorId(res.data.vendor);
        setTotalAmount(res.data.totalAmount);
      });
    } else {
      if (state.type == "workOrder") {
        console.log("work order");
      }
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      voucherService.getById(id).then((res) => console.log(res.data));
    }
  }, [isEdit]);

  const restictedMode =
    selectedType === "workOrder" || selectedType === "purchaseOrder";

  // Moved hook calls outside of conditional rendering
  const vendorSelectData = useVendorSelectData();
  const contractorSelectData = useContractorSelectData();

  const handleVoucherSubmit = (voucher: VoucherFormProps) => {
    // const Data = {
    //   ...voucher,
    //   project: projectId,
    //   type: selectedType,
    //   name: vendorId || contractorId,
    // };
  };

  return (
    <>
      <div className=" container  bg-white  py-4 rounded-3">
        <Header lable="Voucher Form" />
        <form onSubmit={handleSubmit(handleVoucherSubmit)}>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className=" container ">
                <label className=" form-label  fw-bold ms-1">
                  {" "}
                  Select Type
                </label>
                <select
                  className=" form-select  form-control py-3"
                  value={selectedType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {typeOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <SelectComponent
                register={register}
                name="project"
                label="Project"
                error={errors.project}
                options={
                  restictedMode
                    ? useProjectSelectData().filter(
                        (project) => project.value == projectId
                      )
                    : useProjectSelectData()
                }
                defaultValue={projectId}
              />
            </div>
            {selectedType === "purchaseOrder" && (
              <div className="col-sm-6 col-md-4">
                <SelectComponent
                  register={register}
                  name="name"
                  label="Vendor"
                  error={errors.name}
                  options={vendorSelectData.filter(
                    (vendor) => vendor.value == vendorId
                  )}
                  defaultValue={vendorId}
                />
              </div>
            )}

            {selectedType === "workOrder" && (
              <div className="col-sm-6 col-md-4">
                <SelectComponent
                  register={register}
                  name="name"
                  label="Contractor"
                  error={errors.name}
                  options={contractorSelectData}
                  isDisabled={restictedMode}
                />
              </div>
            )}

            {selectedType !== ("purchaseOrder" || "workOrder") && (
              <div className="col-sm-6 col-md-4">
                <InputComponent
                  register={register}
                  name="name"
                  label="Name"
                  error={errors.name}
                />
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-md-12">
              {" "}
              <InputComponent
                register={register}
                name="description"
                label="Payment Description"
                error={errors.description}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <InputComponent
                register={register}
                name="totalAmount"
                label="Total Amount"
                //defaultValue={totalAmount}
                // isDisabled={restictedMode}
                error={errors.totalAmount}
              />
            </div>

            <div className="col-sm-6 col-md-4">
              <InputComponent
                register={register}
                name="payableAmount"
                label="Payable Amount"
              />
            </div>
          </div>

          <SubmitComponent btnlable="submit" />
        </form>
      </div>
      {/* Pass actual ID here instead of string */}
      <div className=" mt-4">
        <Header lable="Payment History" />
       
      </div>
    </>
  );
};

export default VoucherForm;
