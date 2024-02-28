import { useParams } from "react-router-dom";
import InvoiceModel from "./InvoiceModel";
import { useEffect, useState } from "react";
import invoiceService from "../../services/invoice/invoiceService";
import { AxiosResponse } from "axios";
import Loader from "../Common/Loader/Loader";
const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<InvoiceModelProps>();
  useEffect(() => {
    invoiceService
      .getById<InvoiceModelProps>(`${id}`)
      .then((res: AxiosResponse) => {
        setInvoice(res.data);
      })
      .catch((err: any) => {
        window.alert(err.response.data.error);
      });
  }, [id]);
  return (
    <>
      {invoice?.projectId._id ? (
        <InvoiceModel
          invoiceNumber={invoice.invoiceNumber}
          date={invoice.date}
          dueDate={invoice.dueDate}
          fileNumber={invoice.projectId.fileNumber}
          name={invoice.projectId.name}
          projectAddress={invoice.projectId.projectAddress}
          pinCode={invoice.projectId.pinCode}
          city={invoice.projectId.location}
          subject={invoice.subject}
          description={invoice.description}
          rate={invoice.rate}
          paymentMade={invoice.paymentMade}
          modeOfPayment={invoice.modeOfPayment}
          balanceToBeMade={invoice.balanceToBeMade}
          refNumber={invoice.refNumber}
          nextDue={invoice.nextDue}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Invoice;
