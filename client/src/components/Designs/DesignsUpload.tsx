import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import Header from "../Common/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { fileUploadApiClient } from "../../services/api-Client";
import { handleApiError } from "../../utils/apiUtils";

interface DesignProps {
  fileName: string;
  designFile: File;
  projectId: string;
}

const DesignsUpload = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DesignProps>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const projectId = state?.projectId || "";
  const HandleUpload = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("projectId", projectId);
      formData.append("fileName", data.fileName);
      formData.append("designFile", data.designFile[0]);
      const response = await fileUploadApiClient
        .post("/designs", formData)
        .then((res: AxiosResponse) => console.log(res.data))
        .catch((err: any) => handleApiError(err));

      console.log("responce ", response);

       navigate("/designs/list");
    } catch (error) {
      console.error("Error uploading design:", error);
    }
  };

  return (
    <div className="container d-flex align-items-center  justify-content-center mt-3 ">
      <div className=" bg-white  border rounded-3 p-5">
        <Header lable={`Designs Upload -- ${state.projectName}`} />
        <form onSubmit={handleSubmit(HandleUpload)}>
          <InputComponent
            type="file"
            register={register}
            label="Choose design"
            name="designFile"
            error={errors.designFile}
          />

          <InputComponent
            register={register}
            name="fileName"
            label="Name of the Document"
            error={errors.fileName}
          />
          <SubmitComponent btnlable="Submit" />
        </form>
      </div>
    </div>
  );
};

export default DesignsUpload;
