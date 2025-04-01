import db from "../config/dbConfig.js"; // Connexion à la base de données.

class Section {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // Récupérer toutes les sections
  static async getAll() {
    try {
      const [rows] = await db.execute("SELECT * FROM section");
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des sections : " + error.message);
    }
  }

  // Récupérer une section par ID
  static async getById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM section WHERE id = ?", [id]);
      return rows.length > 0 ? new Section(rows[0].id, rows[0].name) : null;
    } catch (error) {
      throw new Error("Erreur lors de la récupération de la section : " + error.message);
    }
  }

  // Créer une nouvelle section
  static async create(name) {
    try {
      const [result] = await db.execute("INSERT INTO section (name) VALUES (?)", [name]);
      return result.insertId;
    } catch (error) {
      throw new Error("Erreur lors de la création de la section : " + error.message);
    }
  }

  // Mettre à jour une section
  static async update(id, name) {
    try {
      const [result] = await db.execute("UPDATE section SET name = ? WHERE id = ?", [name, id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de la section : " + error.message);
    }
  }

  // Supprimer une section
  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM section WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Erreur lors de la suppression de la section : " + error.message);
    }
  }
}

export default Section;
