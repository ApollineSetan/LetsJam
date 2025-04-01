// services/demoService.js
import Demo from '../models/Demo.js';

export const createDemo = async (title, description, image, duration, section_id) => {
  return await Demo.create({ title, description, image, duration, section_id });
};
