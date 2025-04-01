// services/sectionService.js
import Section from '../models/Section.js';

export const createSection = async (name) => {
  return await Section.create({ name });
};
