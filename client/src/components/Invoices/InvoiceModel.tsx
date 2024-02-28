import { ToWords } from "to-words";
import logo from "../../assets/jrm_logo.jpeg";
import { format } from "date-fns";
interface Invoice {
  invoiceNumber: number;
  date: string;
  dueDate: string;
  fileNumber: number;
  name: string; // Make sure this property is defined
  projectAddress: string;
  city: string;
  pinCode: string;
  subject: string;
  description: string;
  rate: number;
  paymentMade: number;
  modeOfPayment: string;
  refNumber: string;
  balanceToBeMade: number;
  nextDue: string;
}
const InvoiceModel = ({
  invoiceNumber,
  date,
  fileNumber,
  dueDate,
  name,
  projectAddress,
  city,
  pinCode,
  subject,
  description,
  rate,
  paymentMade,
  modeOfPayment,
  refNumber,
  balanceToBeMade,
  nextDue,
}: Invoice) => {
  const toWords = new ToWords();
  let totalInWords = toWords.convert(paymentMade || 0, { currency: true });
  return (
    <div className="container border border-black printmodel">
      {/* header address  */}

      <div className="row my-2">
        <div
          className="col-3 logo"
          style={{ maxHeight: "250px", maxWidth: "250px" }}
        >
          <img src={logo} alt="jrm " className=" img-fluid " />
        </div>
        <div className="col-5 ps-3">
          <ul className="list-group-flush p-0 m-0 ">
            <li className="list-group-item fw-bold ">JRM CONSTRUCTION</li>
            <li className="list-group-item">NO 1A FIRST FLOOR </li>
            <li className="list-group-item">ADITYARAM TOWNSHIP PHASE 1 </li>
            <li className="list-group-item">KALAIGNAR KARUNANIDHI SALAI</li>
            <li className="list-group-item">SHOLINGANALLUR</li>
            <li className="list-group-item">Chennai Tamil Nadu 600115</li>

            <li className="list-group-item mt-2">GSTIN 33BUHPR3788Q1ZM </li>
          </ul>
        </div>
        <div className="col-4 pb-0 d-flex justify-content-center  align-items-center  ">
          <p className=" fw-bold "> PAYMENT RECEIPT</p>
        </div>
      </div>

      {/* invoice number and file numer */}

      <div className="row border-top border-black ">
        <div className="col-6  ">
          <table className="table table-borderless table-sm ">
            <tbody>
              <tr className=" border-top ">
                <td>Invoice Number</td>
                <td className=" fw-bold ">: INV - 000{invoiceNumber}</td>
              </tr>
              <tr>
                <td>Invoice Date</td>
                <td className=" fw-bold">
                  : {date ? format(new Date(date), "dd/MM/yyyy") : ""}
                </td>
              </tr>
              <tr>
                <td>Terms</td>
                <td className=" fw-bold ">: Due on Receipt</td>
              </tr>
              <tr>
                <td>Due Date</td>
                <td className=" fw-bold ">
                  : {dueDate ? format(new Date(dueDate), "dd/MM/yyyy") : ""}
                </td>
              </tr>
              <tr className="">
                <td>File #</td>
                <td className=" fw-bold ">: {fileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className=" col-6">
          <p className="mt-3">Place of Supply : TamilNadu 33</p>
        </div> */}
        <div className="col-6"></div>
      </div>

      {/* bill to   */}

      <div className="row   border-top   border-black">
        {/* <p className="  bg-warning  border-bottom  border-black">Bill To</p> */}
        <div className="bg-warning py-1">
          <span className="  fw-bold ">Bill To</span>
        </div>

        <ul className=" list-group-flush ">
          <li className=" list-group-item ">
            <b>{name}</b>
          </li>
          <li className=" list-group-item ">{projectAddress}</li>
          <li className=" list-group-item ">{city}</li>
          <li className=" list-group-item ">{pinCode} Tamil Nadu</li>
          <li className=" list-group-item ">lndia</li>
        </ul>
      </div>

      {/* subject  */}

      <div className="row  border-top  border-black ">
        <div className="col-12">
          Subject:
          <p>{subject}</p>
        </div>
      </div>

      {/* for payment details  */}

      <table className=" table table-bordered  ">
        <thead className=" table-danger ">
          <tr className=" ">
            <th>#</th>
            <th>Description of Payment</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{description} </td>
            <td>1</td>
            <td>{rate}</td>
            <td>{rate}</td>
          </tr>
          <tr>
            <td rowSpan={4} colSpan={2} className="pt-5">
              Total in words : <strong>{totalInWords}</strong>
            </td>
            <td colSpan={2}>Sub Total</td>
            <td>{rate}</td>
          </tr>
          <tr>
            <td colSpan={2}>total</td>
            <td>{rate}</td>
          </tr>
          <tr className=" ">
            <td colSpan={2}>payment Made</td>
            <td>{paymentMade}</td>
          </tr>
          <tr>
            <td colSpan={2}>Balance to be made :</td>
            <td>{balanceToBeMade}</td>
          </tr>
          <tr>
            <td colSpan={2}>Payment received through :{modeOfPayment}</td>
            <td colSpan={3} rowSpan={2} className="pt-3 border-bottom-0 ">
              Next Due Amount : {nextDue}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>Ref No : {refNumber}</td>
          </tr>
          <tr>
            <td colSpan={2} className="pt-4 text-center ">
              Thanks for your business.
            </td>
            <td colSpan={3} className="pt-4 text-center border-top-0  ">
              Authorized Signature
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceModel;
