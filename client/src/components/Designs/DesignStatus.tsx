import { useQuery } from "@tanstack/react-query";
import Header from "../Common/Header/Header";
import { AxiosResponse } from "axios";
import ApprovelButton from "../Common/AuthButtons/ApprovelButton";
import DeleteButton from "../Common/AuthButtons/DeleteButton";
import Loader from "../Common/Loader/Loader";
import { Link } from "react-router-dom";
import { FileEarmark } from "react-bootstrap-icons";
import designApprovelService from "../../services/designs/designApprovelService";
import designService from "../../services/designs/designService";

interface DesignApprovelList {
  fileName: string;
  designFile: File;
  project: {
    projectName: string;
  };
  isApproved: boolean;
  _id: string;
}

const DesignStatus = () => {
  
  const {
    isLoading,
    isError,
    refetch,
    data: DesignApprovelList = [],
  } = useQuery({
    queryKey: ["DesignStatus"],
    queryFn: async () => {
      const res: AxiosResponse<DesignApprovelList[]> =
        await designApprovelService.getall();
      return res.data;
    },
  });

  console.log(DesignApprovelList);
  const handleApprove = (id: string) => {
    designService.update({ _id: id, isApproved: true });
    refetch();
  };
  const handleDelete = (id: string) => {
    designService.delete(id);
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Loader isError={isError} />;
  }

  if (DesignApprovelList.length <= 0) {
    return null;
  }
  return (
    <div className=" container ">
      <div className="row mt-3">
        <Header lable="Design Status" />
      </div>
      <div className=" table-responsive-md border rounded-4 bg-white p-1">
        <table className=" table text-center table-borderless  ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Project Name</th>
              <th>File Name</th>
              <th>View</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {DesignApprovelList.map((file, index) => (
              <tr key={file._id}>
                <td>{index + 1}</td>

                <td>{file.project ? file.project.projectName : "null"}</td>
                <td>{file?.fileName}</td>
                <td>
                  {file.designFile && (
                    <Link
                      to={import.meta.env.VITE_API_URL + file.designFile}
                      state={{ isEdit: true }}
                    >
                      <FileEarmark size={30} className="mx-2" />
                    </Link>
                  )}
                </td>
                <td>
                  <ApprovelButton onClick={() => handleApprove(file._id)} />
                </td>
                <td>
                  <DeleteButton
                    isApproved={file.isApproved}
                    onClick={() => handleDelete(file._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesignStatus;
