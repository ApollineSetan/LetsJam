const API = "http://localhost:5000/api/sections";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    return await response.json();
};

export const SectionService = {
    getAllSections: async () => {
        const response = await fetch(API);
        return await handleResponse(response);
    },

    getSectionById: async (id) => {
        const response = await fetch(`${API}/${id}`);
        return await handleResponse(response);
    },

    createSection: async (section) => {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: section.name }),
        });
        return await handleResponse(response);
    },

    updateSection: async (id, section) => {
        const response = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: section.name }),
        });
        return await handleResponse(response);
    },

    deleteSection: async (id) => {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });
        return await handleResponse(response);
    },
};

export default SectionService;
