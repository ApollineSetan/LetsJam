import { useState, useEffect, useRef } from "react";
import "../styles/EditionPage.css";
import { TopBar } from "../components/TopBar";
import { SectionDefault } from "../components/demos/SectionDefault";
import { Section } from "../components/demos/Section";
import { Link } from "react-router-dom";
import { MdOutlineLink } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useDemoContext } from "../contexts/DemoContext";

function EditionPage() {
  const { demos, deleteDemo, addSection, sections } = useDemoContext();
  const [newSectionName, setNewSectionName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const handleAddSection = () => {
    if (newSectionName) {
      addSection(newSectionName);
      setNewSectionName("");
      setShowInput(false);
    }
  };

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddSection();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]);

  const isAnyDemoPresent =
    demos.length > 0 || sections.some((section) => section.demos?.length > 0);

  return (
    <div className="mainContainer">
      <TopBar />
      <div className="buttonsContainer">
        <div className="addDemoButton">
          <Link to="/add-demo">
            Ajouter une nouvelle démo
            <i>
              <MdOutlineLink />
            </i>
          </Link>
        </div>
        <div className="addSectionDemo">
          <a href="#" onClick={handleToggleInput}>
            Ajouter une nouvelle section
            <i>
              <IoIosAddCircle />
            </i>
          </a>
        </div>
      </div>

      {showInput && (
        <div className="inputContainer" ref={inputRef}>
          <input
            type="text"
            placeholder="Nom de la nouvelle section"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="transparentInput"
          />
        </div>
      )}
      <div className="sectionsDefault">
        {!isAnyDemoPresent && !showInput && (
          <div className="emptyState">
            <h1>Aucune démo n'a été ajoutée pour le moment.</h1>
          </div>
        )}

        <SectionDefault demos={demos} deleteDemo={deleteDemo} />

        {sections.map((section) => (
          <Section key={section.id} demos={demos} sectionId={section.id} />
        ))}
      </div>
    </div>
  );
}

export { EditionPage };
