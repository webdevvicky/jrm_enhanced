import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { ToWords } from "to-words";
import { format } from "date-fns";
import QuoteHeader from "../Quotes/QuoteHeader";
import Loader from "../Common/Loader/Loader";
import { handleApiError } from "../../utils/apiUtils";
import enquiryQuoteServices from "../../services/enquiry/enquiryQuoteServices";

const EnquiryQuoteModel = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState<EnquiryQuoteModelProps>();

  useEffect(() => {
    enquiryQuoteServices
      .getById(`${id}`)
      .then((res: AxiosResponse) => {
        setQuote(res.data);
      })
      .catch((err: any) => {
        handleApiError(err);
      });
  }, []);

  const toWords = new ToWords();
  let totalInWords = toWords.convert(quote?.totalValue || 0, {
    currency: true,
  });

  return (
    <div>
      {quote && quote ? (
        <div className="container printmodel mt-2">
          <QuoteHeader quoteType={"Construction"} />
          <table className="table table-bordered border-primary">
            <tbody>
              <tr className=" border-bottom-0 ">
                <td colSpan={3}>
                  <span className=" pe-md-5 ">
                    {" "}
                    <b>NAME :</b> {quote?.enquiryId.name}
                  </span>{" "}
                  <span className="ms-md-5 ">
                    <b>SITE LOCATION :</b> {quote?.enquiryId.location}
                  </span>
                </td>

                <td colSpan={3}>
                  <b>FILE NO :</b> #{quote?.enquiryId.fileNumber}
                </td>
              </tr>
              <tr className=" border-bottom-0  border-top-0 ">
                <td colSpan={3}>
                  <b>EMAIL ID :</b> {quote?.enquiryId.email}
                </td>
                <td colSpan={3}>
                  <b>DATE :</b>{" "}
                  {quote ? format(new Date(quote.date), "dd/MM/yyyy") : ""}
                </td>
              </tr>
              <tr className=" border-bottom-0  border-top-0 ">
                <td colSpan={3}>
                  <b>CONTACT NO : </b>
                  {quote?.enquiryId.mobileNumber}
                </td>
                <td colSpan={3}>
                  <b>REV :</b> {quote.rev}
                </td>
              </tr>
              <tr className="text-center">
                <th>S.NO</th>
                <th>WORK DESCRIPTION</th>
                <th>Sq.Ft</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
              {quote &&
                quote.items.map((item: QuoteItemProps, index: number) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td className=" text-start ">{item.description}</td>
                    <td>{item.sqft}</td>
                    <td>{item.unit}</td>
                    <td>{item.rate}</td>
                    <td>{item.sqft * item.rate}</td>
                    {/* Add action button or link if needed */}
                  </tr>
                ))}
              <tr>
                <td colSpan={5} className="text-end">
                  Total Value
                </td>
                <td className=" text-center">
                  <b>&#8377; {quote?.totalValue}</b>
                </td>
              </tr>
              <tr className="text-center">
                <td colSpan={6}>
                  <b>Total in words : </b>
                  {totalInWords}
                </td>
              </tr>
              {!quote.isApproved && (
                <tr className=" bg-danger  text-center">
                  <td colSpan={6} className=" bg-danger ">
                    {" "}
                    Not Approved
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!quote.isApproved && (
            <div className=" row ">
              <div className="col-md-4">
                <button className=" btn btn-outline-primary ">
                  <Link
                    to={`/marketting/quote/form/edit`}
                    state={{
                      _id: quote._id,
                      isEdit: true,
                      name: quote.enquiryId.name,
                    }}
                  >
                    Edit{" "}
                  </Link>
                </button>
              </div>
              <div className="div"></div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EnquiryQuoteModel;
