import React from "react";
import { isAdmin } from "../../../utils/auth";

interface RejectBtnProps {
  onClick?: () => void;
  label?: string;
  isApproved: boolean;
  isRejected: boolean;
}

const RejectButton: React.FC<RejectBtnProps> = ({
  onClick,
  label,
  isApproved,
  isRejected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn  btn-outline-danger  ${
        !isAdmin() || isApproved ? "disabled " : ""
      }`}
      disabled={!isAdmin() || isApproved || isRejected}
    >
      {label || isApproved
        ? "Approved "
        : "Reject" && isRejected
        ? "Rejected"
        : "Reject"}
    </button>
  );
};

export default RejectButton;
