import React, { createContext, useContext, useState } from "react"; // Importer createContext et useContext
import { v4 as uuidv4 } from "uuid"; // Si tu utilises uuid pour générer des IDs uniques

const DemoContext = createContext();

export const useDemoContext = () => {
  return useContext(DemoContext);
};

export const DemoProvider = ({ children }) => {
  const [demos, setDemos] = useState([]);
  const [sections, setSections] = useState([]);

  // Fonction pour ajouter une démo avec un id unique
  const addDemo = (demo, sectionId) => {
    const newDemo = { ...demo, id: uuidv4(), sectionId };
    setDemos([...demos, newDemo]);
  };

  const updateDemo = (demoId, updatedDemo) => {
    setDemos(
      demos.map((demo) =>
        demo.id === demoId ? { ...demo, ...updatedDemo } : demo
      )
    );
  };

  // Fonction pour ajouter une section
  const addSection = (sectionName) => {
    const newSection = { name: sectionName, id: uuidv4() };
    setSections([...sections, newSection]);
  };

  // Fonction pour supprimer une section
  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  // Fonction pour déplacer les démos d'une section supprimée vers la SectionDefault
  const moveDemosToDefault = (sectionId) => {
    setDemos(
      demos.map((demo) =>
        demo.sectionId === sectionId ? { ...demo, sectionId: null } : demo
      )
    );
  };

  // Fonction pour supprimer une démo
  const deleteDemo = (demoId) => {
    setDemos(demos.filter((demo) => demo.id !== demoId));
  };

  // Fonction pour mettre à jour le nom de la section
  const updateSectionName = (sectionId, newName) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      )
    );
  };

  return (
    <DemoContext.Provider
      value={{
        demos,
        addDemo,
        deleteDemo,
        updateDemo,
        addSection,
        sections,
        deleteSection,
        moveDemosToDefault,
        updateSectionName, // Ajout de la fonction pour modifier le nom de la section
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};