import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SectionService from "../../services/sectionService";
import DemoService from "../../services/demoService";

const DemoContext = createContext();

export const useDemoContext = () => useContext(DemoContext);

export const DemoProvider = ({ children }) => {
  const [demos, setDemos] = useState([]);
  const [sections, setSections] = useState([]);

  // --------------------------
  // INITIAL DATA FETCHING
  // --------------------------

  useEffect(() => {
    fetchSections();
    fetchDemos();
  }, []);

  const fetchSections = async () => {
    try {
      const data = await SectionService.getAllSections();
      const transformed = data.map(({ _id, _name }) => ({
        id: _id,
        name: _name,
      }));
      setSections(transformed);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const fetchDemos = async () => {
    try {
      const data = await DemoService.getAllDemos();
      const transformed = data.map((demo) => ({
        id: demo._id,
        title: demo._title,
        description: demo._description,
        image: demo._image_url,
        duration: demo._duration,
        sectionId: demo._section_id,
        audio: demo._audio_url,
      }));
      setDemos(transformed);
    } catch (error) {
      console.error("Error fetching demos:", error);
    }
  };

  // --------------------------
  // DEMOS - CRUD OPERATIONS
  // --------------------------

  const createDemo = async (demo) => {
    try {
      const demoFromAPI = await DemoService.createDemo(demo);
      const transformedDemo = {
        id: demoFromAPI._id,
        title: demoFromAPI._title,
        description: demoFromAPI._description,
        image: demoFromAPI._image_url,
        duration: demoFromAPI._duration,
        sectionId: demoFromAPI._section_id,
        audio: demoFromAPI._audio_url,
      };
      setDemos((prev) => [...prev, transformedDemo]);
    } catch (error) {
      console.error("Error creating demo:", error);
    }
  };

  const updateDemo = async (demoId, updatedDemo) => {
    try {
      const parsedId = parseInt(demoId, 10);
      if (isNaN(parsedId)) {
        console.error("Invalid demo ID:", demoId);
        return;
      }

      const existingDemo = demos.find((d) => d.id === parsedId);
      if (!existingDemo) {
        console.error("Demo not found for update:", parsedId);
        return;
      }

      const formData = new FormData();

      if (updatedDemo.title != null)
        formData.append("title", updatedDemo.title);
      if (updatedDemo.description != null)
        formData.append("description", updatedDemo.description);

      if (updatedDemo.image instanceof File) {
        formData.append("image_url", updatedDemo.image);
      } else if (typeof updatedDemo.image === "string") {
        formData.append("image_url", updatedDemo.image);
      }

      // Include existing values to avoid overwriting with undefined
      if (existingDemo.duration != null)
        formData.append("duration", existingDemo.duration);
      if (existingDemo.sectionId != null)
        formData.append("section_id", existingDemo.sectionId);
      if (existingDemo.audio != null)
        formData.append("audio_url", existingDemo.audio);

      const updatedDemoFromAPI = await DemoService.updateDemo(
        parsedId,
        formData
      );

      const transformedDemo = {
        id: updatedDemoFromAPI._id,
        title: updatedDemoFromAPI._title,
        description: updatedDemoFromAPI._description,
        image: updatedDemoFromAPI._image_url,
        duration: updatedDemoFromAPI._duration,
        sectionId: updatedDemoFromAPI._section_id,
        audio: updatedDemoFromAPI._audio_url,
        createdAt: updatedDemoFromAPI._createdAt,
      };

      setDemos((prev) =>
        prev.map((demo) => (demo.id === parsedId ? transformedDemo : demo))
      );
    } catch (error) {
      console.error("Failed to update demo:", error);
    }
  };

  const deleteDemo = async (demoId) => {
    try {
      const response = await DemoService.deleteDemo(demoId);
      if (response.message === "Demo deleted successfully") {
        setDemos((prev) => prev.filter((demo) => demo.id !== demoId));
      } else {
        console.error("Failed to delete demo:", response);
      }
    } catch (error) {
      console.error("Error deleting demo:", error);
    }
  };

  const fetchDemoById = async (demoId) => {
    try {
      const demoFromAPI = await DemoService.getDemoById(demoId);
      const transformedDemo = {
        id: demoFromAPI._id,
        title: demoFromAPI._title,
        description: demoFromAPI._description,
        image: demoFromAPI._image_url,
        duration: demoFromAPI._duration,
        sectionId: demoFromAPI._section_id,
        audio: demoFromAPI._audio_url,
      };
      setDemos((prev) => [
        ...prev.filter((demo) => demo.id !== transformedDemo.id),
        transformedDemo,
      ]);
    } catch (error) {
      console.error("Error fetching demo by ID:", error);
    }
  };

  // --------------------------
  // SECTIONS - CRUD OPERATIONS
  // --------------------------

  const addSection = async (sectionName) => {
    try {
      const createdSectionFromAPI = await SectionService.createSection({
        name: sectionName,
      });
      const transformedSection = {
        id: createdSectionFromAPI._id,
        name: createdSectionFromAPI._name,
      };
      setSections((prev) => [...prev, transformedSection]);
    } catch (error) {
      console.error("Failed to create section:", error);
    }
  };

  const updateSection = async (sectionId, newName) => {
    try {
      const updatedSectionFromAPI = await SectionService.updateSection(
        sectionId,
        { name: newName }
      );
      const transformedSection = {
        id: updatedSectionFromAPI._id,
        name: updatedSectionFromAPI._name,
      };
      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? { ...section, name: transformedSection.name }
            : section
        )
      );
    } catch (error) {
      console.error("Failed to update section:", error);
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      await SectionService.deleteSection(sectionId);
      setSections((prev) => prev.filter((section) => section.id !== sectionId));
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  };

  /**
   * Move all demos in a deleted section to the default section (null)
   * Useful to keep demos without a section rather than deleting them
   */
  const moveDemosToDefault = (sectionId) => {
    setDemos((prev) =>
      prev.map((demo) =>
        demo.sectionId === sectionId ? { ...demo, sectionId: null } : demo
      )
    );
  };

  const refreshData = async () => {
    try {
      const data = await DemoService.getAllDemos();
      const transformed = data.map((demo) => ({
        id: demo._id,
        title: demo._title,
        description: demo._description,
        image: demo._image_url,
        duration: demo._duration,
        sectionId: demo._section_id,
        audio: demo._audio_url,
      }));
      setDemos(transformed);
    } catch (error) {
      console.error("Error refreshing demos:", error);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        demos,
        setDemos,
        sections,
        createDemo,
        updateDemo,
        deleteDemo,
        fetchDemoById,
        addSection,
        updateSection,
        deleteSection,
        moveDemosToDefault,
        refreshData,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};
