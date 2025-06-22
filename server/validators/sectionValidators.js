import { body } from 'express-validator';

export const createSectionValidator = [
  body("name")
    .isString().withMessage("Le nom doit être une chaîne de caractères.")
    .notEmpty().withMessage("Le nom de la section est requis.")
    .isLength({ max: 50 }).withMessage("Le nom de la section ne doit pas excéder 50 caractères."),
];

export const updateSectionValidator = [
  body("name")
    .isString().withMessage("Le nom doit être une chaîne de caractères.")
    .notEmpty().withMessage("Le nom de la section est requis.")
    .isLength({ max: 50 }).withMessage("Le nom de la section ne doit pas excéder 50 caractères."),
];