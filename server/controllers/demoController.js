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
            const demo = await demoManager.create(req.body);
            res.status(201).json(demo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

//     async createDemo(req, res) {
//     try {
//       const { title, description, duration, section_id, image_url } = req.body;

//       if (!req.file || !req.file.location) {
//         return res.status(400).json({ error: "Audio file is required." });
//       }

//       const audio_url = req.file.location;

//       const newDemo = {
//         title,
//         description,
//         image_url,
//         duration,
//         section_id,
//         audio_url,
//       };

//       const demo = await demoManager.create(newDemo);

//       res.status(201).json(demo);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

    async updateDemo(req, res) {
        try {
            const demo = await demoManager.update(req.params.id, req.body);
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
