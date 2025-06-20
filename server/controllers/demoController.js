import demoManager from "../managers/demoManager.js";

const demoController = {
    async getAllDemos(req, res) {
        try {
            const demos = await demoManager.getAll();
            res.json(demos);
        } catch (error) {
            const status = error.statusCode || 500;     // Use custom statusCode if provided, otherwise default to 500
            res.status(status).json({ error: error.message });
        }
    },

    async getDemoById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid demo ID" });
            }

            const demo = await demoManager.getById(id);
            if (!demo) {
                return res.status(404).json({ message: "Demo not found" });
            }
            res.json(demo);
        } catch (error) {
            const status = error.statusCode || 500;
            res.status(status).json({ error: error.message });
        }
    },

    async createDemo(req, res) {
      try {
        const { title, description, duration: durationRaw, section_id: sectionRaw } = req.body;

        // Simple validation for required fields
        if (!title || typeof title !== "string" || title.trim().length === 0) {
          return res.status(400).json({ message: "Title is required and must be a non-empty string." });
        }
        if (title.length > 50) {
          return res.status(400).json({ message: "Title must not exceed 50 characters." });
        }

        let descriptionValue = null;
        if (description !== undefined && description !== null && description !== "") {
          if (typeof description !== "string") {
            return res.status(400).json({ message: "Description must be a string." });
          }
          descriptionValue = description;
        }

        const duration = parseInt(durationRaw, 10);
        if (isNaN(duration) || duration <= 0) {
          return res.status(400).json({ message: "Duration must be a positive integer." });
        }

        let section_id = null;
        if (sectionRaw !== undefined && sectionRaw !== null && sectionRaw !== "") {
          section_id = parseInt(sectionRaw, 10);
          if (isNaN(section_id) || section_id < 0) {
            return res.status(400).json({ message: "Invalid section_id" });
          }
        }

        // Handle optional uploaded files (image/audio))
        const imageFile = req.files?.image_url?.[0];
        const audioFile = req.files?.audio_url?.[0];

        const image_url = imageFile?.location || null;
        const audio_url = audioFile?.location || null;

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
        const status = error.statusCode || 500;
        res.status(status).json({ error: error.message });
      }
    },

    async updateDemo(req, res) {
      try {
        const { title, description, duration, section_id, audio_url } = req.body;

        if (title !== undefined) {
          if (typeof title !== "string" || title.trim().length === 0) {
            return res.status(400).json({ message: "Title is required and must be a non-empty string." });
          }
          if (title.length > 50) {
            return res.status(400).json({ message: "Title must not exceed 50 characters." });
          }
        }

        const demoData = {
          title: title ? title.trim() : undefined,
          description,
          image_url: req.file ? req.file.location : req.body.image_url,
          duration,
          section_id,
          audio_url,
        };

        Object.keys(demoData).forEach(
          (key) => demoData[key] === undefined && delete demoData[key]
        );

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
