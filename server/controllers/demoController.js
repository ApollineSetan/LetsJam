import { parse } from "dotenv";
import demoManager from "../managers/demoManager.js";

const demoController = {
    async getAllDemos(req, res) {
        try {
            const demos = await demoManager.getAll();
            res.json(demos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getDemoById(req, res) {
        try {
            const demo = await demoManager.getById(req.params.id);
            if (!demo) {
                return res.status(404).json({ message: "Demo not found" });
            }
            res.json(demo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createDemo(req, res) {
        try {
            const { title, description } = req.body;
            const duration = parseInt(req.body.duration, 10);
            const section_id = req.body.section_id ? parseInt(req.body.section_id, 10) : null;
            if (isNaN(section_id)) {
                return res.status(400).json({ message: "Invalid section_id" });
            }

            // Récupère les fichiers uploadés
            const imageFile = req.files?.image_url?.[0];
            const audioFile = req.files?.audio_url?.[0];

            // Rends image optionnelle : pas d'erreur si absente
            const image_url = imageFile ? imageFile.location : null;
            const audio_url = audioFile ? audioFile.location : null;

            const newDemo = {
            title,
            description,
            image_url,
            duration,
            section_id,
            audio_url,
            };

            const demo = await demoManager.create(newDemo);
            res.status(201).json(demo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateDemo(req, res) {
        try {
            const demoData = {
            title: req.body.title,
            description: req.body.description,
            image_url: req.file ? req.file.location : req.body.image_url,
            duration: req.body.duration,
            section_id: req.body.section_id,
            audio_url: req.body.audio_url,
            };

            const demo = await demoManager.update(req.params.id, demoData);

            if (!demo) {
            return res.status(404).json({ message: "Demo not found" });
            }

            res.json(demo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async deleteDemo(req, res) {
        try {
            const deleted = await demoManager.delete(req.params.id);
            if (!deleted) {
            return res.status(404).json({ message: "Demo not found" });
            }
            res.json({ message: "Demo deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default demoController;
