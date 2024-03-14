import React from "react";
import { isAdmin } from "../../../utils/auth";
import { Pencil } from "react-bootstrap-icons";

interface EditButtonProps {
  onClick?: () => void;
  label?: string;
  isRejected?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  label,
  isRejected,
}) => {
  return (
    <button
      onClick={onClick}
      //className={`btn  text-success border-0   w-100 `}
      className={
        label
          ? " btn btn-outline-success  w-100"
          : " btn border-0 w-100 text-success"
      }
      disabled={!isRejected && !isAdmin()}
    >
      {label || <Pencil size={25} />}
    </button>
  );
};

export default EditButton;
