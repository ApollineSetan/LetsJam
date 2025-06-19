// import { body } from 'express-validator';

// export const createDemoValidator = [
//     body("title")
//         .isString().withMessage("Le titre doit être une chaîne de caractères.")
//         .notEmpty().withMessage("Le titre est requis.")
//         .isLength({ min: 3, max: 50 }).withMessage("Le titre doit contenir entre 3 et 50 caractères."),

//     body("description")
//         .isString().withMessage("La description doit être une chaîne de caractères.")
//         .optional(),

//     body("section_id")
//         .isInt({ min: 0 }).withMessage("L'ID de la section doit être un entier positif.")
//         .optional()
// ];