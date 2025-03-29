const db = require("../server");

const getDemos = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM demos", (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des démos:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const createDemo = (demo) => {
  const { title, description, duration, image_url, section_id } = demo;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO demos (title, description, duration, image_url, section_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, duration, image_url, section_id],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la création de la démo:", err);
          return reject(err);
        }
        resolve({ id: results.insertId, ...demo });
      }
    );
  });
};

const deleteDemo = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM demos WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la suppression de la démo:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getDemos, createDemo, deleteDemo };
