import { jwtDecode } from "jwt-decode";
import React from "react";
import MyJwtPayload from "../../../interfaces/MyJwtPayload";

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
  const token = localStorage.getItem("token");
  const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
  const role = decoded?.role;

  // Determine if the user has the "admin" role

  //const isAdmin = role === "generalmanager";

  const isAdmin = true;
  console.log(isRejected);
  return (
    <button
      onClick={onClick}
      className={`btn  btn-outline-danger  ${
        !isAdmin || isApproved ? "disabled " : ""
      }`}
      disabled={!isAdmin || isApproved || isRejected}
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
