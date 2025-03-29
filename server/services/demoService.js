const demoModel = require("../models/demoModel");

const getDemos = async () => {
  try {
    return await demoModel.getDemos();
  } catch (error) {
    throw error;
  }
};

const createDemo = async (demo) => {
  try {
    return await demoModel.createDemo(demo);
  } catch (error) {
    throw error;
  }
};

const deleteDemo = async (id) => {
  try {
    return await demoModel.deleteDemo(id);
  } catch (error) {
    throw error;
  }
};

module.exports = { getDemos, createDemo, deleteDemo };
