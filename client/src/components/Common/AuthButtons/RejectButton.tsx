import React from "react";
import { isAdmin } from "../../../utils/auth";
import {
  ChatRight,
  Check2,
  Check2All,
  ExclamationTriangle,
  ExclamationTriangleFill,
  FileArrowUpFill,
  PersonBadge,
} from "react-bootstrap-icons";

interface RejectBtnProps {
  onClick?: () => void;
  label?: string;
  isApproved?: boolean;
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
      className={` btn  border-0   text-danger   ${
        !isAdmin() || isApproved ? "disabled " : ""
      }`}
      disabled={!isAdmin() || isApproved || isRejected}
    >
      {label || isApproved ? (
        <Check2All size={30} />
      ) : <ExclamationTriangle size={30} /> && isRejected ? (
        <ExclamationTriangleFill size={30} />
      ) : (
        <ExclamationTriangle size={30} />
      )}
    </button>
  );
};

export default RejectButton;
