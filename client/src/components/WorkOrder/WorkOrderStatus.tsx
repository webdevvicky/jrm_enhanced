import UnApprovedWorkOrderList from "./UnApprovedWorkOrderList";
import UnVerifiedWorkOrderList from "./UnVerifiedWorkOrderList";

const WorkOrderStatus = () => {
  return (
    <>
      <UnVerifiedWorkOrderList />
      <UnApprovedWorkOrderList/>
    </>
  );
};

export default WorkOrderStatus;
