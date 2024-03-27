import React from "react";
import {  hasVerifyAuth } from "../../../utils/auth";
import { Check2, Check2All } from "react-bootstrap-icons";

interface RejectBtnProps {
  onClick?: () => void;
  label?: string;
  isApproved?: boolean;
  isRejected?: boolean;
  isVerified?: boolean;
}

const VerifyButton: React.FC<RejectBtnProps> = ({
  onClick,

  isRejected,
  isVerified,
}) => {
  const confirm = () => {
    const confirm = window.confirm("Are you sure want to verify this");
    if (confirm) {
      return onClick ? onClick() : null;
    }
  };
  
  return (
    <button
      onClick={confirm}
      className={` btn  border-0   text-danger   ${
        !hasVerifyAuth() || isVerified ? "disabled " : ""
      }`}
      disabled={!hasVerifyAuth() || isVerified || isRejected}
    >
      {isVerified ? <Check2All size={30} /> : <Check2 size={30} />}
    </button>
  );
};

export default VerifyButton;
