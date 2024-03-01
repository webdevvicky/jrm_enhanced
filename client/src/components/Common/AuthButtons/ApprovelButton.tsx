import { jwtDecode } from "jwt-decode";
import React from "react";
import MyJwtPayload from "../../../interfaces/MyJwtPayload";

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
  const token = localStorage.getItem("token");
  const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
  const role = decoded?.role;

  // Determine if the user has the "admin" role

  //const isAdmin = role === "generalmanager";

  const isAdmin = true;

  return (
    <button
      onClick={onClick}
      className={`btn btn-outline-success ${
        !isAdmin || isApproved ? "disabled " : ""
      }`}
      disabled={!isAdmin || isApproved}
    >
      {label || isApproved ? "Approved " : "Approve"}
    </button>
  );
};

export default ApprovelButton;
