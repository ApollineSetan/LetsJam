import db from "../config/dbConfig.js";
import Demo from "../models/demo.js";

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
                row.image_url,
                row.duration,
                row.createdAt,
                row.section_id,
                row.audio_url
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
            rows[0].image_url,
            rows[0].duration,
            rows[0].createdAt,
            rows[0].section_id,
            rows[0].audio_url
        ) : null;
        } catch (error) {
        console.error("Error fetching demo:", error);
        throw error;
        }
    },
    async create(demo) {
        try {
        const { title, description, image_url, duration, section_id, audio_url } = demo;
        const [result] = await db.query(
            "INSERT INTO demos (title, description, image_url, duration, section_id, audio_url) VALUES (?, ?, ?, ?, ?, ?)",
            [title, description, image_url, duration, section_id, audio_url]
        );
        return new Demo(
            result.insertId,
            title,
            description,
            image_url,
            duration,
            new Date(),
            section_id,
            audio_url
        );
        } catch (error) {
        console.error("Error creating demo:", error);
        throw error;
        }
    },
    async update(id, demo) {
        try {
        const { title, description, image_url, duration, section_id, audio_url } = demo;
        await db.query(
            "UPDATE demos SET title = ?, description = ?, image_url = ?, duration = ?, section_id = ?, audio_url = ? WHERE id = ?",
            [title, description, image_url, duration, section_id, audio_url, id]
        );
        return new Demo(id, title, description, image_url, duration, new Date(), section_id, audio_url);
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
