import Modal from "./common/Modal";

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <h2>Delete User</h2>

      <p style={{ margin: "20px 0" }}>
        Are you sure you want to delete this user?
      </p>

      <div className="modal-buttons">
        <button
          className="secondary-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="delete-btn"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;