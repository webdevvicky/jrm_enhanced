import { jwtDecode } from "jwt-decode";
import React from "react";
import MyJwtPayload from "../../../interfaces/MyJwtPayload";
import { Trash3 } from "react-bootstrap-icons";

interface DeleteBtnProps {
  onClick?: () => void;
  label?: string;
  isApproved: boolean;
}

const DeleteButton: React.FC<DeleteBtnProps> = ({
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
      className={`btn   ${
        !isAdmin || isApproved ? "disabled  border-0  " : ""
      }`}
      disabled={!isAdmin || isApproved}
    >
      <Trash3 size={22} color="red" />
    </button>
  );
};

export default DeleteButton;
