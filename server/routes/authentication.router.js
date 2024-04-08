const express = require("express");

const router = express.Router();
const authCtrl = require("../controllers/authentication.controller");
const jwtMiddleware = require("../config/jwt.middleware.js");
const {
  validateUserRegistration,
  validateUserSignIn,
} = require("../config/sanitize.middleware.js");

//----- Route création de compte -----//
router.post("/register", validateUserRegistration, authCtrl.register);
//----- Route identification -----//
router.post("/signin", validateUserSignIn, authCtrl.signin);
//----- Route déconnection -----//
router.post("/logout", jwtMiddleware, authCtrl.logout);

//----- Route mot de passe oublié, genere token de reinitialisation de mot de passe -----//
router.post("/forgot-password", authCtrl.generateForgotPassword);
//----- Route mot de passe oublié, cherche le reset-token associé à l'email -----//
router.get("/get-reset-token", authCtrl.getResetToken);
//----- Route mot de passe oublié, reinitialise le nouveau mot de passe -----//
router.put("/new-password", authCtrl.newPassword);

module.exports = router;
