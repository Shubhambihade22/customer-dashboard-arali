import React, { useState } from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  customerName,
}) => {
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleDelete = async () => {
    await onConfirm();

    setSuccessMessage(`Customer ${customerName} Deleted Successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-container-main">
        <h2 className="modal-title">Delete Customer</h2>

        {!successMessage ? (
          <>
            <p className="modal-message">
              Are you sure you want to delete{" "}
              <strong>{customerName}</strong>?
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="modal-btn modal-btn-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="modal-success">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;