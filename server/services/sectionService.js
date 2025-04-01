import Section from "../models/sectionModel.js";

export const getAllSections = async () => {
  try {
    return await Section.getAll();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des sections : " + error.message);
  }
};

export const getSectionById = async (id) => {
  try {
    return await Section.getById(id);
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la section : " + error.message);
  }
};

export const createSection = async (name) => {
  try {
    return await Section.create(name);
  } catch (error) {
    throw new Error("Erreur lors de la création de la section : " + error.message);
  }
};

export const updateSection = async (id, name) => {
  try {
    return await Section.update(id, name);
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la section : " + error.message);
  }
};

export const deleteSection = async (id) => {
  try {
    return await Section.delete(id);
  } catch (error) {
    throw new Error("Erreur lors de la suppression de la section : " + error.message);
  }
};
