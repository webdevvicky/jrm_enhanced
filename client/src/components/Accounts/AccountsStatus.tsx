import ContractorStatus from "../Contractors/ContractorStatus";
import PoStatus from "../PurchaseOrders/PoStatus";
import VendorsStatus from "../Vendors/VendorsStatus";
import VoucherStatus from "../Vouchers/VoucherStatus";

const AccountsStatus = () => {
  return (
    <div>
      <VendorsStatus />
      <ContractorStatus />
      <PoStatus />
      <VoucherStatus />
    </div>
  );
};

export default AccountsStatus;
