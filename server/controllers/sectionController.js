import sectionManager from "../managers/sectionManager.js";

const sectionController = {
    async getAllSections(req, res) {
        try {
            const sections = await sectionManager.getAll();
            res.json(sections);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSectionById(req, res) {
        try {
            const section = await sectionManager.getById(req.params.id);
            if (!section) {
                return res.status(404).json({ message: "Section non trouvée" });
            }
            res.json(section);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createSection(req, res) {
        try {
            const section = await sectionManager.create(req.body.name);
            res.status(201).json(section);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateSection(req, res) {
        try {
            const section = await sectionManager.update(req.params.id, req.body.name);
            if (!section) {
                return res.status(404).json({ message: "Section non trouvée" });
            }
            res.json(section);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteSection(req, res) {
        try {
            const deleted = await sectionManager.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "Section non trouvée" });
            }
            res.json({ message: "Section supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default sectionController;