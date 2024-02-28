interface ConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  message: string; // Set the type to string
}

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  title,
  message,
}: ConfirmationModalProps) => {
  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered   " role="document">
        <div className="modal-content border border-danger bg-danger-subtle ">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
