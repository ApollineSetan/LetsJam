const API = "http://localhost:5000/api/sections";

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
    throw new Error(body.error || "Unknown API error");
  }

  return body;
};

// SectionService encapsulates CRUD calls for sections
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
