import { useState } from "react";
import "../../styles/ConfirmationOverlay.css";

function NewSectionOverlay({ onCancel, onConfirm }) {
  const [sectionName, setSectionName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    const trimmedName = sectionName.trim();
    if (trimmedName === "") {
      setErrorMessage("Le nom de la section est requis.");
      return;
    }

    try {
      await onConfirm(trimmedName);
      setSectionName("");
      setErrorMessage("");
    } catch (error) {
      if (error.validationErrors) {
        const firstError =
          error.validationErrors[0]?.msg || "Erreur de validation.";
        setErrorMessage(firstError);
      } else {
        setErrorMessage(error.message || "Une erreur est survenue.");
      }
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
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
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
