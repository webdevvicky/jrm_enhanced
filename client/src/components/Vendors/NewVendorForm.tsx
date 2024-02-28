import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import vendorService from "../../services/vendor/vendorService";

interface IsEdit {
  isEdit?: boolean;
  vendor?: VendorProps;
}

interface VendorProps extends NewVendorProps {
  _id: string;
}

const NewVendor = ({ isEdit, vendor }: IsEdit) => {
  // const [vendor, setVendor] = useState<VendorProps | null>(data ?? null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewVendorProps>({
    defaultValues: isEdit ? { ...vendor } : {},
  });

  const navigate = useNavigate();

  const handleNewVendor = (newVendor: NewVendorProps) => {
    if (isEdit) {
      const updated = { _id: vendor ? vendor._id : "", ...newVendor };
      vendorService
        .update(updated)
        .then((res: AxiosResponse) => {
          window.alert(res.statusText);
          window.location.reload();
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    } else {
      vendorService
        .create(newVendor)
        .then((res: AxiosResponse) => {
          window.alert(res.statusText);
          navigate("/purchase/vendors/list");
        })
        .catch((err: any) => {
          handleApiError(err);
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleNewVendor)}>
        <InputComponent
          name="shopName"
          error={errors.shopName}
          register={register}
          label="Shop Name"
        />
        <InputComponent
          name="shopType"
          error={errors.shopType}
          register={register}
          label="Shop Type"
          notRequired
        />
        <InputComponent
          name="shopAddress"
          error={errors.shopAddress}
          register={register}
          label="Shop Address"
          notRequired
        />
        <InputComponent
          name="meterialsAvailable"
          error={errors.meterialsAvailable}
          register={register}
          label="Meterials Available (Comma-separated) "
          notRequired
        />

        <InputComponent
          name="shopMobile"
          error={errors.shopMobile}
          register={register}
          label="Shop Mobile"
          notRequired
        />
        <InputComponent
          name="shopLandLine"
          error={errors.shopLandLine}
          register={register}
          label="Shop Landline"
          notRequired
        />
        <InputComponent
          name="AlternateNumber"
          error={errors.AlternateNumber}
          register={register}
          label="Alternate Number"
          notRequired
        />
        <InputComponent
          name="salesPersonName"
          error={errors.salesPersonName}
          register={register}
          label="Sales Person Name"
          notRequired
        />
        <InputComponent
          name="salesPersonMobile"
          error={errors.salesPersonMobile}
          register={register}
          label="Sales Person Mobile"
          notRequired
        />
        <InputComponent
          name="accountNumber"
          error={errors.accountNumber}
          register={register}
          label="Account Number"
          notRequired
        />
        <InputComponent
          name="ifsc"
          error={errors.ifsc}
          register={register}
          label="IFSC"
          notRequired
        />
        <InputComponent
          name="gpay"
          error={errors.gpay}
          register={register}
          label="G Pay"
          notRequired
        />
        {isEdit ? (
          <SubmitComponent btnlable="Update Vendor" />
        ) : (
          <SubmitComponent btnlable="New Vendor" />
        )}
      </form>
    </div>
  );
};

export default NewVendor;
