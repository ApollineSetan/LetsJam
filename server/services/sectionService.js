const sectionModel = require("../models/sectionModel");

const getSections = async () => {
  try {
    return await sectionModel.getSections();
  } catch (error) {
    throw error;
  }
};

const createSection = async (name) => {
  try {
    return await sectionModel.createSection(name);
  } catch (error) {
    throw error;
  }
};

const deleteSection = async (id) => {
  try {
    return await sectionModel.deleteSection(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getSections, createSection, deleteSection };
