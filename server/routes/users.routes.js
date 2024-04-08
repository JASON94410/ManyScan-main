const router = require("express").Router();
const usersControllers = require("../controllers/users.controllers");
const jwtMiddleware = require("../config/jwt.middleware.js"); // JWT middleware check le token de l'utilisateur connecté pour permettre ou non d'avoir acces aux infos
//----- Get all Users -----//
router.get("/get-users", jwtMiddleware, usersControllers.getAllUsers);
//----- Get User ID -----//
router.get("/:id", jwtMiddleware, usersControllers.getUser);
//----- Edit User ID -----//
router.put("/edit/:id", jwtMiddleware, usersControllers.updateUser);
//----- Edit PASSWORD User ID -----//
router.put("/edit/password/:id", jwtMiddleware, usersControllers.editPassword);
//----- Delete User ID -----//
router.delete("/delete/:id", jwtMiddleware, usersControllers.delelteUser);

module.exports = router;
