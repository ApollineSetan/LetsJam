import "../../styles/ConfirmationOverlay.css";

function AlertOverlay({ message, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="confirmationBox">
        <h3>Erreur</h3>
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onClose} className="confirmButton">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export { AlertOverlay };
