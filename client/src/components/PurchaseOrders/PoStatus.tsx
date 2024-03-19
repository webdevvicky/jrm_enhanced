import Header from "../Common/Header/Header";
import UnApprovedPoList from "./UnApprovedPoList";
import UnVerifiedPoList from "./UnVerifiedPoList";

const PoStatus = () => {
  return (
    <div>
      <UnVerifiedPoList />
      <Header lable="Purchase Order Approvel List" />
      <UnApprovedPoList />
    </div>
  );
};

export default PoStatus;
