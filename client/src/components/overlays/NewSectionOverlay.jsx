import { useState } from "react";
import "../../styles/ConfirmationOverlay.css";

function NewSectionOverlay({ onCancel, onConfirm }) {
  const [sectionName, setSectionName] = useState("");

  const handleConfirm = () => {
    const trimmedName = sectionName.trim();
    if (trimmedName !== "") {
      onConfirm(trimmedName);
      setSectionName("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <div className="overlay">
      <div className="confirmationBox">
        <h3>Créer une nouvelle section</h3>
        <input
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="Entrer un nom"
          className="transparentInput"
        />
        <div className="buttons">
          <button onClick={onCancel} className="cancelButton">
            Annuler
          </button>
          <button onClick={handleConfirm} className="confirmButton">
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}

export { NewSectionOverlay };
