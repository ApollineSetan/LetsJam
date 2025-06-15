const API = "http://localhost:5000/api/demos";

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
    // createDemo: async (demo) => {
    //     const formData = new FormData();

    //     if (demo.file) {
    //         formData.append("file", demo.file);
    //     }
    //     if (demo.title) {
    //         formData.append("title", demo.title);
    //     }
    //     if (demo.description) {
    //         formData.append("description", demo.description);
    //     }
    //     if (demo.image_url) {
    //         formData.append("image_url", demo.image_url);
    //     }
    //     if (demo.duration) {
    //         formData.append("duration", demo.duration);
    //     }
    //     if (demo.section_id) {
    //         formData.append("section_id", demo.section_id);
    //     }
    //     const response = await fetch(API, {
    //         method: "POST",
    //         body: formData,
    //     });
    //     return await response.json();
    // },
    updateDemo: async (id, formData) => {
        const response = await fetch(`${API}/${id}`, {
            method: "PUT",
            body: formData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur updateDemo : ${response.status} - ${errorText}`);
        }
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