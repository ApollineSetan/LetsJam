const API = "http://localhost:5000/api/demo";

export const DemoService = {
    getAllDemos: async () => {
        const response = await fetch(API);
        return await response.json();
    },
    getDemoById: async (id) => {
        const response = await fetch(`${API}/${id}`);
        return await response.json();
    },
    createDemo: async (demo) => {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(demo),
        });
        return await response.json();
    },
    updateDemo: async (id, demo) => {
        const response = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(demo),
        });
        return await response.json();
    },
    deleteDemo: async (id) => {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    },
};

export default DemoService;