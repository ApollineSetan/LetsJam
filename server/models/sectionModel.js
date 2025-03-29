const db = require("../server");

const getSections = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM sections", (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des sections:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const createSection = (name) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO sections (name) VALUES (?)", [name], (err, results) => {
      if (err) {
        console.error("Erreur lors de la création de la section:", err);
        return reject(err);
      }
      resolve({ id: results.insertId, name });
    });
  });
};

const deleteSection = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM sections WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la suppression de la section:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getSections, createSection, deleteSection };
