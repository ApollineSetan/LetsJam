import express from "express";
import cors from "cors";
import demoRoutes from "./routes/demoRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/demos", demoRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/uploads", express.static("public/uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});
