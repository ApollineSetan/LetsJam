import demoManager from "../managers/demoManager.js";

const demoController = {
  async getAllDemos(req, res) {
    try {
      const demos = await demoManager.getAll();
      res.json(demos);
    } catch (error) {
      const status = error.statusCode || 500;
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

      const duration = parseInt(durationRaw, 10);
      if (isNaN(duration) || duration <= 0) {
        return res.status(400).json({ message: "Duration must be a positive integer." });
      }

      const section_id = sectionRaw !== undefined && sectionRaw !== null && sectionRaw !== ""
        ? parseInt(sectionRaw, 10)
        : null;

      const imageFile = req.files?.image_url?.[0];
      const audioFile = req.files?.audio_url?.[0];

      const image_url = imageFile?.location || null;
      const audio_url = audioFile?.location || null;

      const newDemo = {
        title,
        description: description || null,
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
      const { title, description, duration: durationRaw, section_id: sectionRaw, audio_url } = req.body;

      const duration = durationRaw !== undefined
        ? parseInt(durationRaw, 10)
        : undefined;
      if (duration !== undefined && (isNaN(duration) || duration <= 0)) {
        return res.status(400).json({ message: "Duration must be a positive integer." });
      }

      const section_id = sectionRaw !== undefined && sectionRaw !== null && sectionRaw !== ""
        ? parseInt(sectionRaw, 10)
        : undefined;
      if (section_id !== undefined && (isNaN(section_id) || section_id < 0)) {
        return res.status(400).json({ message: "Invalid section_id" });
      }

      // Handle optional file upload for image update
      const image_url = req.file?.location || req.body.image_url || undefined;

      const demoData = {          // Prepare data, remove undefined fields to allow partial update
        title: title?.trim(),
        description,
        image_url,
        duration,
        section_id,
        audio_url,
      };

      Object.keys(demoData).forEach((key) => demoData[key] === undefined && delete demoData[key]);

      const demo = await demoManager.update(req.params.id, demoData);

      if (!demo) {
        return res.status(404).json({ message: "Demo not found" });
      }

      res.json(demo);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
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
  },
};

export default demoController;
