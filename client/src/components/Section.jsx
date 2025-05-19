import React, { useState, useRef, useEffect } from "react";
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
    updateSection,
  } = useDemoContext();

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const inputRef = useRef(null);

  // Déclaration de `section` avant useEffect
  const section = sections.find((sec) => sec.id === sectionId);

  useEffect(() => {
    if (!isEditingName) return;

    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEditingName(false);
        setNewSectionName(section.name);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingName, section.name]);

  if (!section) {
    return <p>Aucune section sélectionnée.</p>;
  }

  const handleDeleteSection = () => {
    setOverlayVisible(true);
  };

  const handleCancel = () => {
    setOverlayVisible(false);
  };

  const handleConfirmDelete = async () => {
    moveDemosToDefault(section.id);
    await deleteSection(section.id);
    setOverlayVisible(false);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setNewSectionName(section.name || "");
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

  return (
    <div className="sectionContainer">
      <div className="sectionHeader">
        {isEditingName ? (
          <input
            ref={inputRef}
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
