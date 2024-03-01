import { jwtDecode } from "jwt-decode";
import React from "react";
import MyJwtPayload from "../../../interfaces/MyJwtPayload";

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
  const token = localStorage.getItem("token");
  const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
  const role = decoded?.role;

  // Determine if the user has the "admin" role

  //const isAdmin = role === "generalmanager";

  const isAdmin = false;

  return (
    <button
      onClick={onClick}
      className={`btn btn-outline-success w-100 `}
      disabled={!isRejected && !isAdmin}
    >
      {label || "Edit"}
    </button>
  );
};

export default EditButton;
