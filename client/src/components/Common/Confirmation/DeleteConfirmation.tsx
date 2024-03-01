import React from 'react';

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

interface Trash3Props {
  size: number;
  color: string;
  className: string;
  onDelete: (id: string) => void;
}

const Trash3: React.FC<Trash3Props> = ({ size, color, className, onDelete }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setItemToDelete(null);
      setIsConfirmationOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setIsConfirmationOpen(false);
  };

  return (
    <div>
      {/* Your Trash3 component */}
      <div style={{ fontSize: size, color }} className={className} onClick={() => handleDelete(quote._id)}>
        Trash Icon
      </div>

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <ConfirmDelete onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  );
};

export default Trash3;
