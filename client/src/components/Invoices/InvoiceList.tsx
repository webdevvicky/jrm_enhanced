import React, { useState } from "react";
import { Link } from "react-router-dom";

import invoiceUsingProjectService from "../../services/invoice/invoiceUsingProjectService";

import { AxiosResponse } from "axios";
import SelectProjectComponent from "../Projects/SelectProjectComponenet";
import { handleApiError } from "../../utils/apiUtils";
import { format } from "date-fns";
import Header from "../Common/Header/Header";
import Loader from "../Common/Loader/Loader";

interface Project {
  _id: string;
  projectName: string;
}
interface InvoiceList {
  _id: string;
  invoiceNumber: number;
  date: string;
  paymentMade: string;
  projectId: {
    name: string;
  };
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoiceData] = useState<InvoiceList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleProjectSelect = (project: Project) => {
    setIsLoading(true);
    invoiceUsingProjectService
      .getById<InvoiceList>(project._id)
      .then((res: AxiosResponse) => {
        setInvoiceData(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
        setInvoiceData([]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-3">
          <Header lable="Select Project to View Invoices" />
          <SelectProjectComponent onChange={handleProjectSelect} />
        </div>
      </div>

      <div className="row">
        <table className="table table-secondary text-center ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Invoice No</th>
              <th>Bill To</th>
              <th>Payment Made</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length >= 1 ? (
              invoices.map((invoice, index) => (
                <tr key={invoice._id}>
                  <td>{index + 1}</td>
                  <td>
                    {invoice.date
                      ? format(new Date(invoice.date), "dd/MM/yyyy")
                      : ""}
                  </td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.projectId.name}</td>
                  <td>{invoice.paymentMade}</td>
                  <td>
                    <Link to={`/invoice/${invoice._id}`}>view</Link>
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

export default InvoiceList;
