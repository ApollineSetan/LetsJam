import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DemoContext = createContext();

export const useDemoContext = () => {
  return useContext(DemoContext);
};

export const DemoProvider = ({ children }) => {
  const [demos, setDemos] = useState([]);
  const [sections, setSections] = useState([]);

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

  const addSection = (sectionName) => {
    const newSection = { name: sectionName, id: uuidv4() };
    setSections([...sections, newSection]);
  };

  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const moveDemosToDefault = (sectionId) => {
    setDemos(
      demos.map((demo) =>
        demo.sectionId === sectionId ? { ...demo, sectionId: null } : demo
      )
    );
  };

  const deleteDemo = (demoId) => {
    setDemos(demos.filter((demo) => demo.id !== demoId));
  };

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
        updateSectionName,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};