import { useState } from "react";
import { ProjectOption } from "../../interfaces/CommonProps";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import { Link } from "react-router-dom";
import { PlusCircleDotted } from "react-bootstrap-icons";
import PendingPoPayment from "./PendingPoPayment";
import Header from "../Common/Header/Header";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import poUsingProjectService from "../../services/po/poUsingProjectService";
import { formatDate } from "../../utils/dateConvertionUtils";

const PoList = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectOption>();
  const { data: poList = [] } = useQuery({
    queryKey: ["poList", selectedProject],
    queryFn: async () => {
      const res: AxiosResponse<PoListProps[]> =
        await poUsingProjectService.getById(
          selectedProject ? selectedProject._id : ""
        );
      return res.data;
    },
  });

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-md-6">
            <SelectProjectComponent
              onChange={(project) => setSelectedProject(project)}
            />
          </div>
          <div className="col-md-6 text-center d-flex align-items-center justify-content-center">
            <h4>
              {selectedProject
                ? `Selected Project ${selectedProject?.projectName}`
                : "Select Project to Continue"}
            </h4>
          </div>
        </div>

        {selectedProject && (
          <>
            <div className=" mt-3">
              <Link to={"new"} state={{ project: selectedProject }}>
                <PlusCircleDotted size={30} />
              </Link>
            </div>
            <div className="row">
              <Header lable="Purchase Order -Pending payment List" />
            </div>

            <PendingPoPayment projectId={selectedProject._id} />

            <div className="row">
              <Header lable="Purchase Order  List" />
            </div>
            <div className=" bg-white p-3 border rounded-3 ">
              <table className="table  table-borderless  text-center">
                <thead>
                  <tr>
                    <th>S No</th>
                    <th>Po No</th>
                    <th>Date</th>
                    <th>Stage</th>
                    <th>Vendor </th>
                    <th>Approved Rate</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {poList.map((po, index) => (
                    <tr key={po._id}>
                      <td>{index + 1}</td>
                      <td>{po.poNumber}</td>
                      <td>{formatDate(po.date)}</td>
                      <td>{po.stage}</td>
                      <td>{po.vendor.name}</td>
                      <td>{po.totalAmount}</td>
                      <td>
                        <Link to={`view/${po._id}`}>open</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PoList;
