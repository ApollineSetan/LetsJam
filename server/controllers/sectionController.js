import sectionManager from "../managers/sectionManager.js";

const sectionController = {
  async getAllSections(req, res) {
    try {
      const sections = await sectionManager.getAll();
      res.json(sections);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  },

  async getSectionById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      const section = await sectionManager.getById(id);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.json(section);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  },

  async createSection(req, res) {
    try {
      const { name } = req.body;
      const section = await sectionManager.create(name);
      res.status(201).json(section);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  },

  async updateSection(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { name } = req.body;

      const section = await sectionManager.update(id, name);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.json(section);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  },

  async deleteSection(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      const deleted = await sectionManager.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Section not found" });
      }

      res.json({ message: "Section deleted successfully" });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  },
};

export default sectionController;
