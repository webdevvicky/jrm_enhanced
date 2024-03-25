import { Link } from "react-router-dom";
import {
  convertMongoDBDate,
  convertMongoDate,
  dateConvert,
  formatDate,
} from "../../utils/dateConvertionUtils";

interface HistoryProps {
  vouchers?: VoucherModelProps[];
}

const VoucherHistory = ({ vouchers }: HistoryProps) => {
  return (
    <div className=" container bg-white rounded-3 p-3">
      <table className=" table table-bordered  border-primary table-sm">
        <thead>
          <tr>
            <th>S. No</th>
            <th>Voucher No</th>
            <th>Date</th>
            <th>Amount Paid</th>
            <th>Balance Amount</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {vouchers && vouchers.length >= 1 ? (
            vouchers.map((voucher, index) => (
              <tr key={voucher._id}>
                <td>{index + 1}</td>
                <td>{voucher.voucherNumber}</td>
                <td>{formatDate(voucher.date)}</td>
                <td>{voucher.payableAmount}</td>
                <td>{voucher.balanceAmount}</td>
                <td>
                  <Link to={`/accounts/voucher/view/${voucher._id}`}>view</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Pervious Vouchers Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherHistory;
