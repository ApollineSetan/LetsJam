import { useState, useRef, useEffect, useMemo, use } from "react";
import "../../styles/Section.css";
import { MusicCard } from "./MusicCard";
import { useDemoContext } from "../../contexts/DemoContext";
import { TbTrash } from "react-icons/tb";
import { SectionConfirmationOverlay } from "../Overlays/SectionConfirmationOverlay";

// Inline editing and accessibility component
function EditableText({ text, onSubmit, ariaLabel, onEditingChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (onEditingChange) {
      onEditingChange(isEditing);
    }
  }, [isEditing, onEditingChange]);

  useEffect(() => {
    if (!isEditing) return;

    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        submit();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed === "") {
      setValue(text);
      setIsEditing(false);
      return;
    }
    if (trimmed !== text) {
      onSubmit(trimmed);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={submit}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") {
            setValue(text);
            setIsEditing(false);
          }
        }}
        autoFocus
        aria-label={ariaLabel}
        className="editable-input"
      />
    );
  }

  return (
    <h1
      tabIndex={0}
      onDoubleClick={() => setIsEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      role="button"
      aria-label={`${ariaLabel} (double-cliquez pour éditer)`}
      className="editable-text"
    >
      {text}
    </h1>
  );
}

function Section({ demos, sectionId }) {
  const {
    deleteDemo,
    sections,
    deleteSection,
    moveDemosToDefault,
    updateSection,
  } = useDemoContext();

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Memoize the section to avoid unnecessary re-renders
  const section = useMemo(
    () => sections.find((sec) => sec.id === sectionId),
    [sections, sectionId]
  );

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

  const handleNameSubmit = (newName) => {
    updateSection(section.id, newName);
  };

  return (
    <div className="sectionContainer">
      <div className={`sectionHeader ${isEditing ? "editing" : ""}`}>
        <div className="editableTextWrapper">
          <EditableText
            text={section.name}
            onSubmit={handleNameSubmit}
            ariaLabel={`Modifier le nom de la section ${section.name}`}
            onEditingChange={setIsEditing}
          />
        </div>

        <button
          className="deleteIcon"
          onClick={handleDeleteSection}
          aria-label={`Supprimer la section ${section.name}`}
        >
          <TbTrash />
        </button>
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
