import React, { useState } from "react";
import "../styles/Section.css";
import { MusicCard } from "./MusicCard";
import { useDemoContext } from "../contexts/DemoContext";
import { TbTrash } from "react-icons/tb";
import { SectionConfirmationOverlay } from "./SectionConfirmationOverlay";

// Destructuring functions and state from the context
function Section({ demos, sectionId }) {
  const {
    deleteDemo,
    sections,
    deleteSection,
    moveDemosToDefault,
    updateSection,
  } = useDemoContext();

  // State to manage the visibility of the confirmation overlay and editing state
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  // Find the section based on the passed sectionId prop, if no section is found, return a message
  const section = sections.find((sec) => sec.id === sectionId);

  if (!section) {
    return <p>Aucune section sélectionnée.</p>;
  }

  // Functions to handle the deletion of a section by showing or hiding the confirmation overlay
  const handleDeleteSection = () => {
    setOverlayVisible(true);
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirmDelete = async () => {
    moveDemosToDefault(section.id); // Move demos to default section before deleting
    await deleteSection(section.id);
    setOverlayVisible(false);
  };

  // Functions to handle the editing of a section's name
  const handleNameEdit = () => {
    setIsEditingName(true);
    setNewSectionName(section._name || "");
  };

  const handleNameChange = (e) => {
    setNewSectionName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (newSectionName.trim() !== "") {
      updateSection(section.id, newSectionName);
      setIsEditingName(false);
    } else {
      console.log("Le nom de la section ne peut pas être vide.");
    }
  };

  // const handleNameSubmit = () => {
  //   if (newSectionName.trim() !== "") {
  //     updateSectionName(section.id, newSectionName);
  //     setIsEditingName(false);
  //   }
  // };

  return (
    <div className="sectionContainer">
      <div className="sectionHeader">
        {/* Displaying the section name, allowing it to be edited on double-click */}
        {isEditingName ? (
          <input
            type="text"
            value={newSectionName || ""}
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
        {!isEditingName && (
          <TbTrash className="deleteIcon" onClick={handleDeleteSection} />
        )}
      </div>

      {/* Filter and map the demos to display only those that belong to the current section */}
      <div className="musicCardGrid">
        {demos
          .filter((demo) => demo.sectionId === section.id)
          .map((demo) => (
            <MusicCard key={demo.id} demo={demo} deleteDemo={deleteDemo} />
          ))}
      </div>

      {/* Conditionally render the confirmation overlay when deletion is confirmed */}
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
