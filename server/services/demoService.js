import Demo from "../models/demoModel.js";

export const getAllDemos = async () => {
  try {
    return await Demo.getAll();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des démos : " + error.message);
  }
};

export const getDemoById = async (id) => {
  try {
    return await Demo.getById(id);
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la démo : " + error.message);
  }
};

export const createDemo = async (demoData) => {
  try {
    return await Demo.create(demoData);
  } catch (error) {
    throw new Error("Erreur lors de la création de la démo : " + error.message);
  }
};

export const updateDemo = async (id, demoData) => {
  try {
    return await Demo.update(id, demoData);
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la démo : " + error.message);
  }
};

export const deleteDemo = async (id) => {
  try {
    return await Demo.delete(id);
  } catch (error) {
    throw new Error("Erreur lors de la suppression de la démo : " + error.message);
  }
};
