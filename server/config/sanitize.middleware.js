const { body, validationResult } = require("express-validator");

// Validation middleware for user register
exports.validateUserRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should have a value")
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email value is not valid")
    .normalizeEmail(),
];

// Validation middleware for user signin
exports.validateUserSignIn = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

// Validation middleware for contact message
exports.validateContactForm = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Le nom d'utilisateur est requis")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("L'adresse email n'est pas valide")
    .normalizeEmail(),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Le message ne peut pas être vide")
    .escape(),

  body("picture")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("L'URL de l'image n'est pas valide")
    .escape(),
];
