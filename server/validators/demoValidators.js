import { body } from 'express-validator';

export const createDemoValidator = [
    body("title")
        .isString().withMessage("Le titre doit être une chaîne de caractères.")
        .notEmpty().withMessage("Le titre est requis.")
        .isLength({ min: 1, max: 50 }).withMessage("Le titre doit contenir entre 1 et 50 caractères."),

    body("description")
        .isString().withMessage("La description doit être une chaîne de caractères.")
        .optional(),

    body("duration")
      .exists().withMessage("La durée est requise.")
      .isInt({ min: 1 }).withMessage("La durée doit être un entier positif."),

    body("section_id")
        .isInt({ min: 0 }).withMessage("L'ID de la section doit être un entier positif.")
        .optional(),
];

export const updateDemoValidator = [
  body("title")
    .optional()
    .isString().withMessage("Le titre doit être une chaîne de caractères.")
    .isLength({ min: 1, max: 50 }).withMessage("Le titre doit contenir entre 1 et 50 caractères."),

  body("description")
    .optional()
    .isString().withMessage("La description doit être une chaîne de caractères."),

  body("duration")
    .optional()
    .isInt({ min: 1 }).withMessage("La durée doit être un entier positif."),

  body("section_id")
    .optional()
    .isInt({ min: 0 }).withMessage("L'ID de la section doit être un entier positif."),
];
