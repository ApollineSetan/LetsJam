const API_URL = "http://localhost:5000/api/sections";

export const SectionService = {
    getAllSections: async () => {
        const response = await fetch(API_URL);
        return await response.json();

    },
    getSectionById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    },
    createSection: async (section) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(section),
        });
        return await response.json();
    },
    updateSection: async (id, section) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(section),
        });
        return await response.json();
    },
    deleteSection: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    },
}

export default SectionService;