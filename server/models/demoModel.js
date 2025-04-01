import db from "../config/dbConfig.js"; // Connexion à la base de données.

class Demo {
  constructor(id, title, description, image, duration, createdAt, section_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.duration = duration;
    this.createdAt = createdAt;
    this.section_id = section_id;
  }

  // Récupérer toutes les démos
  static async getAll() {
    try {
      const [rows] = await db.execute("SELECT * FROM demo");
      return rows.map(
        (row) =>
          new Demo(
            row.id,
            row.title,
            row.description,
            row.image,
            row.duration,
            row.createdAt,
            row.section_id
          )
      );
    } catch (error) {
      throw new Error("Erreur lors de la récupération des démos : " + error.message);
    }
  }

  // Récupérer une démo par ID
  static async getById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM demo WHERE id = ?", [id]);
      return rows.length > 0
        ? new Demo(
            rows[0].id,
            rows[0].title,
            rows[0].description,
            rows[0].image,
            rows[0].duration,
            rows[0].createdAt,
            rows[0].section_id
          )
        : null;
    } catch (error) {
      throw new Error("Erreur lors de la récupération de la démo : " + error.message);
    }
  }

  // Créer une nouvelle démo
  static async create({ title, description, image, duration, section_id }) {
    try {
      const [result] = await db.execute(
        "INSERT INTO demo (title, description, image, duration, section_id, createdAt) VALUES (?, ?, ?, ?, ?, NOW())",
        [title, description, image, duration, section_id]
      );
      return result.insertId;
    } catch (error) {
      throw new Error("Erreur lors de la création de la démo : " + error.message);
    }
  }

  // Mettre à jour une démo
  static async update(id, { title, description, image, duration, section_id }) {
    try {
      const [result] = await db.execute(
        "UPDATE demo SET title = ?, description = ?, image = ?, duration = ?, section_id = ? WHERE id = ?",
        [title, description, image, duration, section_id, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de la démo : " + error.message);
    }
  }

  // Supprimer une démo
  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM demo WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Erreur lors de la suppression de la démo : " + error.message);
    }
  }
}

export default Demo;
