const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const sectionRoutes = require("./routes/sectionRoutes");
const demoRoutes = require("./routes/demoRoutes");

const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.stack);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

module.exports = db;

app.use(express.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Serveur en fonctionnement");
});

app.use("/api/sections", sectionRoutes);
app.use("/api/demos", demoRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
