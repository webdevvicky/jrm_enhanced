import UnVerifiedVoucherList from "./UnVerifiedVoucherList";
import UnApprovedVoucherList from "./UnApprovedVoucherList";

const VoucherStatus = () => {
  return (
    <div>
      <UnVerifiedVoucherList />
      <UnApprovedVoucherList />
    </div>
  );
};

export default VoucherStatus;
