import ContractorStatus from "../Contractors/ContractorStatus";
import PoStatus from "../PurchaseOrders/PoStatus";
import VendorsStatus from "../Vendors/VendorsStatus";

const AccountsStatus = () => {
  return (
    <div>
      <VendorsStatus />
      <ContractorStatus />
      <PoStatus />
    </div>
  );
};

export default AccountsStatus;
