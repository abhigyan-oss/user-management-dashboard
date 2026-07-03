function Modal({ children, onClose }) {
    return (
      <div className="modal-overlay">
        <div className="modal-container">
  
          <button
            className="close-btn"
            onClick={onClose}
          >
            ✖
          </button>
  
          {children}
  
        </div>
      </div>
    );
  }
  
  export default Modal;