import { body } from 'express-validator';

export const createDemoValidator = [
    body("title")
        .isString().withMessage("Le titre doit être une chaîne de caractères.")
        .notEmpty().withMessage("Le titre est requis."),

    body("description")
        .isString().withMessage("La description doit être une chaîne de caractères.")
        .optional(),

    body("section_id")
        .isInt({ min: 0 }).withMessage("L'ID de la section doit être un entier positif.")
        .optional()
];