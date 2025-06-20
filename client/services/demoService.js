const API = "http://localhost:5000/api/demos";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erreur API : ${response.status}`);
    }
    return await response.json();
};

export const DemoService = {
    getAllDemos: async () => {
        const response = await fetch(API);
        return await handleResponse(response);
    },
    getDemoById: async (id) => {
        const response = await fetch(`${API}/${id}`);
        return await handleResponse(response);
    },
    createDemo: async (demo) => {
        const formData = new FormData();
        formData.append("title", demo.title);
        formData.append("description", demo.description);
        formData.append("duration", demo.duration);
        if (demo.sectionId !== undefined && demo.sectionId !== null && !isNaN(demo.sectionId)) {
            formData.append("section_id", demo.sectionId.toString());
        }
        if (demo.image) {
            formData.append("image_url", demo.image);
        }
        if (demo.file) {
            formData.append("audio_url", demo.file);
        }

        const response = await fetch(API, {
            method: "POST",
            body: formData,
        });
        return await handleResponse(response);
    },
    
    updateDemo: async (id, formData) => {
        const response = await fetch(`${API}/${id}`, {
            method: "PUT",
            body: formData,
        });
        return await handleResponse(response);
    },

    deleteDemo: async (id) => {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });
        return await handleResponse(response);
    },
};

export default DemoService;