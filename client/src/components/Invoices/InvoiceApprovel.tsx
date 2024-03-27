import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../utils/apiUtils";
import Header from "../Common/Header/Header";
import invoiceService from "../../services/invoice/invoiceService";
import invoiceApprovelService from "../../services/invoice/invoiceApprovelService";
import useConfirmation from "../../hooks/useConfirmation";
import NewInvoice from "./NewInvoice";

const InvoiceApprovel = () => {
  const [invoices, setInvoices] = useState<InvoiceListProps[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceListProps>();
  const navigate = useNavigate();

  // Use the confirmation hook
  const confirmation = useConfirmation();

  const handleDeleteInvoice = (invoice: InvoiceListProps) => {
    invoiceService
      .delete(invoice._id)
      .then((res: AxiosResponse) => {
        window.alert(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
    confirmation.hideConfirmation();
  };

  const handleEdit = (invoice: InvoiceListProps) => {
    setIsEdit(true);
    setSelectedInvoice(invoice);
    confirmation.hideConfirmation();
  };

  const handleApprovelUpdate = (invoice: InvoiceListProps) => {
    invoiceApprovelService
      .update(invoice)
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((err: any) => handleApiError(err));
    confirmation.hideConfirmation();
  };

  useEffect(() => {
    invoiceApprovelService
      .getall()
      .then((res: AxiosResponse) => {
        setInvoices(res.data);
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" mx-md-3">
      {!isEdit && <Header lable="Invoices Listed  For Approvel" />}

      {!isEdit && (
        <div>
          <table className=" table table-secondary  table-striped text-center">
            <thead>
              <tr>
                <th>S.NO </th>
                <th>Project Name</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Invoice Number</th>
                <th>Open</th>
                <th>Edit</th>
                <th>Approve</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {invoices?.map((invoice, index) => (
                <tr key={invoice._id} className=" text-center ">
                  <td>{index + 1}</td>
                  <td>{invoice.projectId.projectName}</td>
                  <td>{invoice.projectId.name}</td>
                  <td>
                    {" "}
                    {invoice.date
                      ? format(new Date(invoice.date), "dd/MM/yyyy")
                      : ""}
                  </td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>
                    <button
                      className="btn btn-outline-info "
                      onClick={() => navigate(`/invoice/${invoice._id}`)}
                    >
                      view
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary "
                      onClick={() =>
                        confirmation.showConfirmation(
                          "Edit Confirmation",
                          "Are you sure you want to edit this invoice?",
                          () => handleEdit(invoice)
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-outline-primary "
                        onClick={() =>
                          confirmation.showConfirmation(
                            "Approve Confirmation",
                            "Are you sure you want to approve this invoice?",
                            () => handleApprovelUpdate(invoice)
                          )
                        }
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger "
                      onClick={() =>
                        confirmation.showConfirmation(
                          "Delete Confirmation",
                          "Are you sure you want to delete this invoice?",
                          () => handleDeleteInvoice(invoice)
                        )
                      }
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>{isEdit && <NewInvoice isEdit invoicedata={selectedInvoice} />}</div>
    </div>
  );
};

export default InvoiceApprovel;
