import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useContractorSelectData } from "../../hooks/useContractorSelectData";
import { useProjectSelectData } from "../../hooks/useProjectSelectData";
import { useVendorSelectData } from "../../hooks/useVendorSelectData";
import InputComponent from "../Common/FormComponents/InputComponent";
import SelectComponent from "../Common/FormComponents/SelectComponent";
import Header from "../Common/Header/Header";
import voucherService from "../../services/voucher/voucherService";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { AxiosResponse } from "axios";
import poVoucherService from "../../services/po/poVoucherService";
import VoucherHistory from "./VoucherHistory";
import { handleApiError } from "../../utils/apiUtils";
import woVoucherService from "../../services/workOrder/woVoucherService";

const Voucher = () => {
  const { state } = useLocation();
  const selectedTypeFromState = state && state.type ? state.type : "";
  const [selectedType, setSelectedType] = useState(selectedTypeFromState);
  const [contractorId, setContractorId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [vendorId, setVendorId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [voucherData, setVoucherData] = useState<VoucherDataProps>();
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<VoucherFormProps>({
    defaultValues: { totalAmount: totalAmount, payableAmount: 0 },
  });

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (selectedType === "purchaseOrder") {
      poVoucherService
        .getById(state?._id || purchaseOrder)
        .then((res: AxiosResponse) => {
          setProjectId(res.data?.project);
          setVendorId(res.data?.vendor);
          setTotalAmount(res.data?.totalAmount);
          console.log(res.data);
          setVoucherData(res.data);
        });
    } else {
      if (selectedType === "workOrder") {
        woVoucherService
          .getById(state?._id || purchaseOrder)
          .then((res: AxiosResponse) => {
            setProjectId(res.data?.project);
            setContractorId(res.data?.contractor);
            setTotalAmount(res.data?.totalAmount);
            console.log(res.data);
            setVoucherData(res.data);
          });
      }
    }
  }, [selectedType]);

  useEffect(() => {
    if (isEdit) {
      voucherService
        .getById<VoucherFormProps>(id)
        .then((res: AxiosResponse<VoucherFormProps>) => {
          setSelectedType(res.data.type);
          setProjectId(res.data.project);
          setVendorId(res.data.name);
          setTotalAmount(res.data.totalAmount);
          setPurchaseOrder(res.data.purchaseOrder);
          reset(res.data);
        });
    }
  }, [isEdit]);

  // set restrict for pre total values , like po & wo
  const restictedMode =
    selectedType === "workOrder" || selectedType === "purchaseOrder";

  // Moved hook calls outside of conditional rendering
  const vendorSelectData = useVendorSelectData();
  const contractorSelectData = useContractorSelectData();




  // form submission for new && eit

  const handleVoucherSubmit = (voucher: VoucherFormProps) => {
    if (
      !restictedMode &&
      parseInt(voucher.payableAmount.toString()) > voucher.totalAmount
    ) {
      window.alert("payable Amount Exceeting Total Amount");
      return;
    }


    if (isEdit) {
      console.log(voucher.payableAmount);
      voucherService
        .update({ _id: id, ...voucher })
        .then((res: AxiosResponse) => {
          navigate(`/accounts/voucher/view/${res.data._id}`);
        })
        .catch((err: any) => handleApiError(err));

    } else {

      const commonVoucher = {
        ...voucher,
        type: selectedType,
      };

      let updatedVoucher = commonVoucher;
      if (selectedType === restictedMode) {

        const lastVoucher =
          voucherData?.vouchers[voucherData.vouchers.length - 1];
        const lastBalanceAmount = lastVoucher ? lastVoucher.balanceAmount : 0;
        if (parseInt(voucher.payableAmount.toString()) > lastBalanceAmount) {
          console.log("Amount exceeded");
          window.alert("Amount exceeded");
          return;
        }

        updatedVoucher = {
          ...commonVoucher,
          purchaseOrder: state._id || voucher.purchaseOrder,
          project: projectId || voucher.project,
          totalAmount: totalAmount,
          name: vendorId,
        };
      }

      if (selectedType === "workOrder") {
        updatedVoucher = {
          ...commonVoucher,
          workOrder: state._id || null,
          project: projectId || voucher.project,
        };
      }

      voucherService
        .create(updatedVoucher)
        .then((res: AxiosResponse) =>
          navigate(`/accounts/voucher/view/${res.data._id}`)
        )
        .catch((err: any) => handleApiError(err));
    }
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
                  <option value="localPurchase" disabled={restictedMode}>
                    Local Purchase
                  </option>
                  <option value="pettyCash" disabled={restictedMode}>
                    Petty Cash
                  </option>
                  <option value="purchaseOrder" disabled>
                    Purchase Order
                  </option>
                  <option value="workOrder" disabled>
                    Work Order
                  </option>

                  <option value="labourPayment" disabled>
                    Labour Payment
                  </option>
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
                notRequired={restictedMode}
              />
            </div>
            {selectedType === "purchaseOrder" && (
              <div className="col-sm-6 col-md-4">
                <SelectComponent
                  register={register}
                  name="vendor"
                  label="Vendor"
                  error={errors.vendor}
                  options={vendorSelectData.filter(
                    (vendor) => vendor.value == vendorId
                  )}
                  defaultValue={vendorId}
                  notRequired={restictedMode}
                />
              </div>
            )}

            {selectedType === "workOrder" && (
              <div className="col-sm-6 col-md-4">
                <SelectComponent
                  register={register}
                  name="contractor"
                  label="Contractor"
                  error={errors.contractor}
                  options={contractorSelectData.filter(
                    (contractor) => contractor.value == contractorId
                  )}
                  defaultValue={contractorId}
                 // isDisabled={restictedMode}
                />
              </div>
            )}

            {!restictedMode && (
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
              {restictedMode ? (
                <InputComponent
                  register={register}
                  name="totalAmount"
                  label="Total Amount"
                  error={errors.totalAmount}
                  defaultValue={totalAmount}
                />
              ) : (
                <InputComponent
                  register={register}
                  name="totalAmount"
                  label="Total Amount"
                  error={errors.totalAmount}
                  isNumber
                />
              )}
            </div>

            <div className="col-sm-6 col-md-4">
              <InputComponent
                register={register}
                name="payableAmount"
                label="Payable Amount"
                error={errors.payableAmount}
                isNumber
              />
            </div>
            <div className="col-sm-6 col-md-4">
              <InputComponent
                register={register}
                name="paymentMode"
                label="Payment Mode"
                error={errors.paymentMode}
              />
            </div>
          </div>

          <SubmitComponent btnlable="submit" />
        </form>
      </div>
      {/* Pass actual ID here instead of string */}

      {restictedMode && (
        <div className=" mt-4">
          <Header lable="Payment History" />
          <VoucherHistory vouchers={voucherData?.vouchers} />
        </div>
      )}
    </>
  );
};

export default Voucher;
