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
  const [isEditingName, setIsEditingName] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const section = sections.find((sec) => sec.id === sectionId);

  if (!section) {
    return <p>Aucune section sélectionnée.</p>;
  }

  const handleDeleteSection = () => {
    setOverlayVisible(true);
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirmDelete = () => {
    moveDemosToDefault(section.id);
    deleteSection(section.id);
    setOverlayVisible(false);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setNewSectionName(section.name);
  };

  const handleNameChange = (e) => {
    setNewSectionName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (newSectionName.trim() !== "") {
      updateSectionName(section.id, newSectionName);
      setIsEditingName(false);
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
            onBlur={handleNameSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNameSubmit();
            }}
            autoFocus
          />
        ) : (
          <h1 onDoubleClick={handleNameEdit}>{section.name}</h1>
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