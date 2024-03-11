import InputComponent from "../Common/FormComponents/InputComponent";
import SubmitComponent from "../Common/FormComponents/SumitComponent";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../Common/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/designs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      navigate("/designs/list");
    } catch (error) {
      console.error("Error uploading design:", error);
    }
  };

  return (
    <div>
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
  );
};

export default DesignsUpload;
