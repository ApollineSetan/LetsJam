import db from "../config/dbConfig.js";
import Section from "../models/Section.js";
import CustomError from "../utils/customError.js";

const sectionManager = {
    async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM section");     // Secure against SQL injection using prepared statements
            return rows.map((row) => new Section(row.id, row.name));
        } catch (error) {                                               // Catches any error that occurs during the query
            throw new CustomError(`Error fetching sections: ${error.message}`, 500);
        }
    },

    async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM section WHERE id = ?", [id]);
            return rows.length ? new Section(rows[0].id, rows[0].name) : null;
        } catch (error) {
            throw new CustomError(`Error fetching section: ${error.message}`, 500);
        }
    },

    async create(name) {
        try {
            const [result] = await db.query("INSERT INTO section (name) VALUES (?)", [name]);
            return new Section(result.insertId, name);
        } catch (error) {
            throw new CustomError(`Error creating section: ${error.message}`, 500);
        }
    },

    async update(id, name) {
        try {
            await db.query("UPDATE section SET name = ? WHERE id = ?", [name, id]);
            return new Section(id, name);
        } catch (error) {
            throw new CustomError(`Error updating section: ${error.message}`, 500);
        }
    },

    async delete(id) {
        try {
            await db.query("DELETE FROM section WHERE id = ?", [id]);
            return id;
        } catch (error) {
            throw new CustomError(`Error deleting section: ${error.message}`, 500);
        }
    }
};

export default sectionManager;