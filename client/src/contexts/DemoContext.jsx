import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Create a context and a custom hook to manage demo-related state globally
const DemoContext = createContext();

export const useDemoContext = () => {
  return useContext(DemoContext);
};

// States to store arrays of demos and sections
export const DemoProvider = ({ children }) => {
  const [demos, setDemos] = useState([]);
  const [sections, setSections] = useState([]);

  // Function to add a new demo and assign it to a section
  const addDemo = (demo, sectionId) => {
    const newDemo = { ...demo, id: uuidv4(), sectionId };
    setDemos([...demos, newDemo]);
  };

  // Function to update demo details
  const updateDemo = (demoId, updatedDemo) => {
    setDemos(
      demos.map((demo) =>
        demo.id === demoId ? { ...demo, ...updatedDemo } : demo
      )
    );
  };

  // Function to add a new section
  const addSection = (sectionName) => {
    const newSection = { name: sectionName, id: uuidv4() };
    setSections([...sections, newSection]);
  };

  // Functions to delete a section and move its demos to the default section
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

  // Function to delete a demo
  const deleteDemo = (demoId) => {
    setDemos(demos.filter((demo) => demo.id !== demoId));
  };

  // Function to update a section's name
  const updateSectionName = (sectionId, newName) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      )
    );
  };

  // Return the context provider with all the state and functions to be accessible in child components
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
      {children} {/* Render child components inside the provider */}
    </DemoContext.Provider>
  );
};