import React from "react";
import { isAdmin } from "../../../utils/auth";
import {
  FileCheck,
  FileCheckFill,
  PatchCheck,
  PersonCheckFill,
} from "react-bootstrap-icons";

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
      className={`btn  text-success border-0  ${
        !isAdmin() || isApproved ? "disabled " : ""
      }`}
      disabled={!isAdmin() || isApproved}
    >
      {label || isApproved ? (
        <PersonCheckFill size={30} />
      ) : (
        <PatchCheck size={30} />
      )}
    </button>
  );
};

export default ApprovelButton;
