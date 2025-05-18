import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SectionService from "../../services/sectionService";

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

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await SectionService.getAllSections();
        const transformed = data.map(({ _id, _name }) => ({
          id: _id,
          name: _name,
        }));
        console.log("Sections fetchées :", data);
        setSections(transformed);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, []);

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

  const deleteSection = async (sectionId) => {
    try {
      const deleteSectionFromAPI = await SectionService.deleteSection(
        sectionId
      );
      const transformedSection = {
        id: deleteSectionFromAPI._id,
        name: deleteSectionFromAPI._name,
      };

      setSections((prevSections) =>
        prevSections.filter((section) => section.id !== sectionId)
      );
    } catch (error) {
      console.error(
        "[DemoContext] deleteSection - failed to delete section:",
        error
      );
    }
  };

  // Functions to delete a section and move its demos to the default section
  // const deleteSection = (sectionId) => {
  //   setSections(sections.filter((section) => section._id !== sectionId));
  // };

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

  const updateSection = async (sectionId, newName) => {
    console.log("[DemoContext] updateSection called with:", sectionId, newName);
    try {
      const updatedSectionFromAPI = await SectionService.updateSection(
        sectionId,
        { name: newName }
      );
      console.log(
        "[DemoContext] updateSection - API response:",
        updatedSectionFromAPI
      );

      // Transformer la réponse de l'API en format local
      const transformedSection = {
        id: updatedSectionFromAPI._id,
        name: updatedSectionFromAPI._name,
      };
      console.log(
        "[DemoContext] updateSection - transformed section:",
        transformedSection
      );

      setSections((prevSections) => {
        const updatedSections = prevSections.map((section) =>
          section.id === sectionId
            ? { ...section, name: transformedSection.name }
            : section
        );
        console.log(
          "[DemoContext] updateSection - updated local sections:",
          updatedSections
        );
        return updatedSections;
      });
    } catch (error) {
      console.error(
        "[DemoContext] updateSection - failed to update section:",
        error
      );
    }
  };

  // Return the context provider with all the state and functions to be accessible in child components
  return (
    <DemoContext.Provider
      value={{
        demos,
        addDemo,
        deleteDemo,
        updateDemo,
        sections,
        addSection,
        deleteSection,
        moveDemosToDefault,
        updateSection,
      }}
    >
      {children} {/* Render child components inside the provider */}
    </DemoContext.Provider>
  );
};
