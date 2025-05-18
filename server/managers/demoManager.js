import db from "../config/dbConfig.js";
import Demo from "../models/Demo.js";

const demoManager = {
    async getAll() {
        try {
        const [rows] = await db.query("SELECT * FROM demos");
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
        console.error("Error fetching demos:", error);
        throw error;
        }
    },
    
    async getById(id) {
        try {
        const [rows] = await db.query("SELECT * FROM demos WHERE id = ?", [id]);
        return rows.length 
        ? new Demo(
            rows[0].id,
            rows[0].title,
            rows[0].description,
            rows[0].image,
            rows[0].duration,
            rows[0].createdAt,
            rows[0].section_id
        ) : null;
        } catch (error) {
        console.error("Error fetching demo:", error);
        throw error;
        }
    },
    async create(demo) {
        try {
        const { title, description, image, duration, section_id } = demo;
        const [result] = await db.query(
            "INSERT INTO demos (title, description, image, duration, section_id) VALUES (?, ?, ?, ?, ?)",
            [title, description, image, duration, section_id]
        );
        return new Demo(
            result.insertId,
            title,
            description,
            image,
            duration,
            new Date(),
            section_id
        );
        } catch (error) {
        console.error("Error creating demo:", error);
        throw error;
        }
    },
    async update(id, demo) {
        try {
        const { title, description, image, duration, section_id } = demo;
        await db.query(
            "UPDATE demos SET title = ?, description = ?, image = ?, duration = ?, section_id = ? WHERE id = ?",
            [title, description, image, duration, section_id, id]
        );
        return new Demo(id, title, description, image, duration, new Date(), section_id);
        } catch (error) {
        console.error("Error updating demo:", error);
        throw error;
        }
    },
    async delete(id) {
        try {
        await db.query("DELETE FROM demos WHERE id = ?", [id]);
        return id;
        } catch (error) {
        console.error("Error deleting demo:", error);
        throw error;
        }
    },
};

export default demoManager;
