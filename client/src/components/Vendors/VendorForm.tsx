import { useForm } from "react-hook-form";
import InputComponent from "../Common/FormComponents/InputComponent";
import { AxiosResponse } from "axios";
import { handleApiError } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import vendorService from "../../services/vendor/vendorService";
import Header from "../Common/Header/Header";

interface IsEdit {
  isEdit?: boolean;
  vendor?: VendorProps;
}

const VendorForm = ({ isEdit, vendor }: IsEdit) => {
  // const [vendor, setVendor] = useState<VendorProps | null>(data ?? null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorFormProps>({
    defaultValues: isEdit ? { ...vendor } : {},
  });

  const navigate = useNavigate();

  const handleNewVendor = (newVendor: VendorFormProps) => {
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
    <div className="container bg-white border rounded-0 py-2">
      <Header lable="Vendor Form" />
      <form action="">
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <InputComponent
              register={register}
              error={errors.name}
              label="Name"
              name="name"
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3"></div>
          <div className="col-sm-6 col-md-4 col-lg-3"></div>
          <div className="col-sm-6 col-md-4 col-lg-3"></div>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;
