import React from "react";
import { isAdmin } from "../../../utils/auth";

interface EditButtonProps {
  onClick?: () => void;
  label?: string;
  isRejected: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  label,
  isRejected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-outline-success w-100 `}
      disabled={!isRejected && !isAdmin()}
    >
      {label || "Edit"}
    </button>
  );
};

export default EditButton;
