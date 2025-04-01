import * as DemoService from "../services/demoService.js";

export const getAllDemos = async (req, res) => {
  try {
    const demos = await DemoService.getAllDemos();
    res.json(demos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDemoById = async (req, res) => {
  try {
    const demo = await DemoService.getDemoById(req.params.id);
    if (!demo) {
      return res.status(404).json({ message: "Démo non trouvée" });
    }
    res.json(demo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDemo = async (req, res) => {
  try {
    const id = await DemoService.createDemo(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDemo = async (req, res) => {
  try {
    const updated = await DemoService.updateDemo(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Démo non trouvée" });
    }
    res.json({ message: "Démo mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDemo = async (req, res) => {
  try {
    const deleted = await DemoService.deleteDemo(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Démo non trouvée" });
    }
    res.json({ message: "Démo supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}