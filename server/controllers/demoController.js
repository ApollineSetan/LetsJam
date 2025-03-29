const demoService = require("../services/demoService");

const getDemos = async (req, res) => {
  try {
    const demos = await demoService.getDemos();
    res.json(demos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createDemo = async (req, res) => {
  const { title, description, duration, image_url, section_id } = req.body;
  try {
    const newDemo = await demoService.createDemo({
      title,
      description,
      duration,
      image_url,
      section_id,
    });
    res.status(201).json(newDemo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDemo = async (req, res) => {
  const { id } = req.params;
  try {
    await demoService.deleteDemo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getDemos, createDemo, deleteDemo };
