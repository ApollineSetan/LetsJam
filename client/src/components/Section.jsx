import React, { useState } from "react";
import "../styles/Section.css";
import { MusicCard } from "./MusicCard";
import { useDemoContext } from "../contexts/DemoContext";
import { TbTrash } from "react-icons/tb";
import { SectionConfirmationOverlay } from "./SectionConfirmationOverlay";

function Section({ demos, sectionId }) {
  const {
    deleteDemo,
    sections,
    deleteSection,
    moveDemosToDefault,
    updateSectionName,
  } = useDemoContext();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false); // Pour gérer l'édition du nom
  const [newSectionName, setNewSectionName] = useState("");
  const section = sections.find((sec) => sec.id === sectionId);

  if (!section) {
    return <p>Aucune section sélectionnée.</p>;
  }

  const handleDeleteSection = () => {
    setOverlayVisible(true); // Afficher l'overlay pour confirmer la suppression
  };

  const handleCancel = () => {
    setOverlayVisible(false); // Cacher l'overlay si l'utilisateur annule
  };

  const handleConfirmDelete = () => {
    moveDemosToDefault(section.id); // Déplacer les démos de la section vers la SectionDefault
    deleteSection(section.id); // Supprimer la section
    setOverlayVisible(false); // Cacher l'overlay après suppression
  };

  const handleNameEdit = () => {
    setIsEditingName(true); // Activer le mode édition du nom
    setNewSectionName(section.name); // Pré-charger le nom actuel
  };

  const handleNameChange = (e) => {
    setNewSectionName(e.target.value); // Mettre à jour le nom pendant la saisie
  };

  const handleNameSubmit = () => {
    if (newSectionName.trim() !== "") {
      updateSectionName(section.id, newSectionName); // Mise à jour du nom de la section
      setIsEditingName(false); // Désactiver le mode édition
    }
  };

  return (
    <div className="sectionContainer">
      <div className="sectionHeader">
        {isEditingName ? (
          <input
            type="text"
            value={newSectionName}
            onChange={handleNameChange}
            onBlur={handleNameSubmit} // L'utilisateur quitte le champ
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNameSubmit(); // Enregistrer à l'appui de la touche "Entrée"
            }}
            autoFocus
          />
        ) : (
          <h1 onDoubleClick={handleNameEdit}>{section.name}</h1> // Double-clic pour modifier le nom
        )}

        <TbTrash className="deleteIcon" onClick={handleDeleteSection} />
      </div>

      <div className="musicCardGrid">
        {demos
          .filter((demo) => demo.sectionId === section.id)
          .map((demo) => (
            <MusicCard key={demo.id} demo={demo} deleteDemo={deleteDemo} />
          ))}
      </div>

      {isOverlayVisible && (
        <SectionConfirmationOverlay
          sectionTitle={section.name}
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export { Section };