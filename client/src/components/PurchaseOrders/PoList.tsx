import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import { handleApiError } from "../../utils/apiUtils";
import { format } from "date-fns";
import Header from "../Common/Header/Header";
import Loader from "../Common/Loader/Loader";
import poUsingProjectService from "../../services/po/poUsingProjectService";
import { ProjectOption } from "../../interfaces/CommonProps";

const PoList: React.FC = () => {
  const [pos, setPos] = useState<PoModelProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectSelect = (project: ProjectOption) => {
    console.log(project._id)
    setIsLoading(true);

    poUsingProjectService
      .getById<PoModelProps[]>(project._id)
      .then((res: AxiosResponse) => {
        setPos(res.data);
        console.log(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
        setPos([]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-3">
          <Header lable="Select Project to View Purchase Orders" />
          <SelectProjectComponent onChange={handleProjectSelect} />
        </div>
      </div>

      <div className="row">
        <table className="table table-secondary text-center ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>PO No</th>
              <th>Stage </th>
              <th>Payment Made</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {pos.length >= 1 ? (
              pos.map((po, index) => (
                <tr key={po._id}>
                  <td>{index + 1}</td>
                  <td>{po ? format(new Date(po.date), "dd/MM/yyyy") : ""}</td>
                  <td>{po.poNumber}</td>

                  <td>{po.stage}</td>
                  <td>{po.totalAmount}</td>
                  <td>
                    <Link to={`/purchase/${po._id}`}>view</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className=" text-bg-danger py-3">
                  {!isLoading ? "  No Invoices to Display" : <Loader />}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoList;
