import React from "react";
import { isAdmin } from "../../../utils/auth";

interface AdminBtnProps {
  onClick?: () => void;
  label?: string;
  isApproved: boolean;
}

const ApprovelButton: React.FC<AdminBtnProps> = ({
  onClick,
  label,
  isApproved,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-outline-success ${
        !isAdmin() || isApproved ? "disabled " : ""
      }`}
      disabled={!isAdmin() || isApproved}
    >
      {label || isApproved ? "Approved " : "Approve"}
    </button>
  );
};

export default ApprovelButton;
