const API = "http://localhost:5000/api/demos";

// Utility function to handle fetch responses,
// parses JSON and throws errors when necessary
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && body.errors) {
      throw { validationErrors: body.errors };
    }
    throw new Error(body.error || body || `Erreur API : ${response.status}`);
  }

  return body;
};

// SectionService encapsulates CRUD calls for demos
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