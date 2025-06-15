import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SectionService from "../../services/sectionService";
import DemoService from "../../services/demoService";

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

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const data = await DemoService.getAllDemos();
        console.log("Démos fetchées depuis l'API:", data);
        const transformed = data.map((demo) => ({
          id: demo._id,
          title: demo._title,
          description: demo._description,
          image: demo._image_url, // On standardise les noms
          duration: demo._duration,
          sectionId: demo._section_id,
          audio: demo._audio_url,
        }));
        setDemos(transformed);
      } catch (error) {
        console.error("Erreur lors de la récupération des démos:", error);
      }
    };

    fetchDemos();
  }, []);

  const fetchDemoById = async (demoId) => {
    try {
      const demoFromAPI = await DemoService.getDemoById(demoId);
      const transformedDemo = {
        id: parseInt(demoFromAPI._id, 10),
        title: demoFromAPI._title,
        description: demoFromAPI._description,
        image: demoFromAPI._image_url,
        duration: demoFromAPI._duration,
        sectionId: demoFromAPI._section_id,
        audio: demoFromAPI._audio_url,
      };
      setDemos((prevDemos) => [
        ...prevDemos.filter((demo) => demo.id !== transformedDemo.id),
        transformedDemo,
      ]);
    } catch (error) {
      console.error("[DemoContext] fetchDemoById - error:", error);
    }
  };

  const updateDemo = async (demoId, updatedDemo) => {
    try {
      const numericDemoId = Number(demoId);
      const existingDemo = demos.find((d) => d.id === numericDemoId);
      if (!existingDemo) {
        console.error("Demo non trouvée pour l'update:", demoId);
        return;
      }

      const formData = new FormData();
      if (updatedDemo.title && updatedDemo.title !== existingDemo.title) {
        formData.append("title", updatedDemo.title);
      }
      if (
        updatedDemo.description &&
        updatedDemo.description !== existingDemo.description
      ) {
        formData.append("description", updatedDemo.description);
      }
      if (updatedDemo.image instanceof File) {
        formData.append("image", updatedDemo.image);
      }

      const updatedDemoFromAPI = await DemoService.updateDemo(
        numericDemoId,
        formData
      );

      const transformedDemo = {
        id: parseInt(updatedDemoFromAPI._id, 10),
        title: updatedDemoFromAPI._title,
        description: updatedDemoFromAPI._description,
        image: updatedDemoFromAPI._image_url,
        duration: updatedDemoFromAPI._duration,
        sectionId: updatedDemoFromAPI._section_id,
        audio: updatedDemoFromAPI._audio_url,
      };

      setDemos((prevDemos) =>
        prevDemos.map((demo) =>
          demo.id === numericDemoId ? transformedDemo : demo
        )
      );
    } catch (error) {
      console.error("[DemoContext] updateDemo - failed to update demo:", error);
    }
  };

  const addSection = async (sectionName) => {
    try {
      const createdSectionFromAPI = await SectionService.createSection({
        name: sectionName,
      });
      const transformedSection = {
        id: createdSectionFromAPI._id,
        name: createdSectionFromAPI._name,
      };
      setSections((prevSections) => [...prevSections, transformedSection]);
    } catch (error) {
      console.error(
        "[DemoContext] addSection - failed to create section:",
        error
      );
    }
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

  const deleteDemo = async (demoId) => {
    try {
      const response = await DemoService.deleteDemo(demoId);
      if (response.message === "Demo deleted successfully") {
        setDemos((prevDemos) => prevDemos.filter((demo) => demo.id !== demoId));
      } else {
        console.error(
          "[DemoContext] deleteDemo - failed to delete demo:",
          response
        );
      }
    } catch (error) {
      console.error("[DemoContext] deleteDemo - error:", error);
    }
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
