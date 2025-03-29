import React, { useState, useEffect, useRef } from "react";
import "../styles/EditionPage.css";
import { TopBar } from "../components/TopBar";
import { SectionDefault } from "../components/SectionDefault";
import { Section } from "../components/Section";
import { Link } from "react-router-dom";
import { MdOutlineLink } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useDemoContext } from "../contexts/DemoContext"; // Importer le contexte

function EditionPage() {
  const { demos, deleteDemo, addSection, sections } = useDemoContext(); // Utiliser le contexte pour récupérer les démos et la fonction deleteDemo
  const [newSectionName, setNewSectionName] = useState(""); // État local pour le nom de la nouvelle section
  const [showInput, setShowInput] = useState(false); // État pour gérer l'affichage de l'input
  const inputRef = useRef(null); // Utiliser useRef pour cibler la div contenant l'input

  const handleAddSection = () => {
    if (newSectionName) {
      addSection(newSectionName);
      setNewSectionName(""); // Réinitialiser le champ de saisie
      setShowInput(false); // Cacher l'input après l'ajout de la section
    }
  };

  const handleToggleInput = () => {
    setShowInput(!showInput); // Toggle pour afficher/masquer l'input
  };

  const handleKeyDown = (event) => {
    // Vérifier si l'utilisateur appuie sur la touche "Entrée"
    if (event.key === "Enter") {
      handleAddSection(); // Valider l'ajout de la section
    }
  };

  // useEffect pour écouter les clics en dehors de l'input
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si le clic est à l'extérieur de la div contenant l'input, cacher l'input
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    // Ajouter l'écouteur d'événement si l'input est visible
    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Nettoyer l'écouteur quand l'input disparaît ou quand le composant se démonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]); // Exécuter cet effet chaque fois que showInput change

  useEffect(() => {
    console.log("Démo(s) ajoutée(s):", demos);
  }, [demos]);

  const isAnyDemoPresent =
    demos.length > 0 || sections.some((section) => section.demos?.length > 0);

  return (
    <div className="mainContainer">
      <TopBar />
      <div className="buttonsContainer">
        <div className="addDemoButton">
          <Link to="/add-demo">Ajouter une nouvelle démo</Link>
          <a href="#">
            <i>
              <MdOutlineLink />
            </i>
          </a>
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

      {/* Afficher l'input si showInput est vrai */}
      {showInput && (
        <div className="inputContainer" ref={inputRef}>
          <input
            type="text"
            placeholder="Nom de la nouvelle section"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyDown={handleKeyDown} // Capturer l'événement "Entrée"
            className="transparentInput"
          />
        </div>
      )}
      <div className="sectionsDefault">
        {!isAnyDemoPresent && (
          <h1>Aucune démo n'a été ajoutée pour le moment.</h1>
        )}

        {/* Passer la fonction deleteDemo comme prop à SectionDefault */}
        <SectionDefault demos={demos} deleteDemo={deleteDemo} />

        {/* Afficher les sections personnalisées */}
        {sections.map((section) => (
          <Section
            key={section.id}
            demos={demos}
            sectionId={section.id} // Passer l'ID de la section
          />
        ))}
      </div>
    </div>
  );
}

export { EditionPage };