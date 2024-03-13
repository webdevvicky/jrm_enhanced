import { Trash3 } from "react-bootstrap-icons";
import { isAdmin } from "../../../utils/auth";

interface DeleteBtnProps {
  onClick?: () => void;
  label?: string;
  isApproved?: boolean;
}

const DeleteButton: React.FC<DeleteBtnProps> = ({
  onClick,

  isApproved,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn   ${
        !isAdmin() || isApproved ? "disabled  border-0  " : ""
      }`}
      disabled={!isAdmin() || isApproved}
    >
      <Trash3 size={22} color="red" />
    </button>
  );
};

export default DeleteButton;
