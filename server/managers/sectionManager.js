import db from "../config/dbConfig.js";
import Section from "../models/Section.js";

const sectionManager = {
    async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM section");
            return rows.map((row) => new Section(row.id, row.name));
        } catch (error) {
            console.error("Error fetching sections:", error);
            throw error;
        }
    },

    async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM section WHERE id = ?", [id]);
            return rows.length ? new Section(rows[0].id, rows[0].name) : null;
        } catch (error) {
            console.error("Error fetching section:", error);
            throw error;
        }
    },

    async create(name) {
        try {
            const [result] = await db.query("INSERT INTO section (name) VALUES (?)", [name]);
            return new Section(result.insertId, name);
        } catch (error) {
            console.error("Error creating section:", error);
            throw error;
        }
    },

    async update(id, name) {
        try {
            await db.query("UPDATE section SET name = ? WHERE id = ?", [name, id]);
            return new Section(id, name);
        } catch (error) {
            console.error("Error updating section:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            await db.query("DELETE FROM section WHERE id = ?", [id]);
            return id;
        } catch (error) {
            console.error("Error deleting section:", error);
            throw error;
        }
    }
};

export default sectionManager;