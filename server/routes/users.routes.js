const router = require("express").Router();
const usersControllers = require("../controllers/users.controllers.js");
const jwtMiddleware = require("../config/jwt.middleware.js"); // JWT middleware check le token de l'utilisateur connecté pour permettre ou non d'avoir acces aux infos
const userMiddleware = require("../config/users.middleware.js");

//----- Get all Users -----//
router.get(
  "/get-users",
  jwtMiddleware,
  userMiddleware,
  usersControllers.getAllUsers
);
//----- Get User ID -----//
router.get("/:id", jwtMiddleware, userMiddleware, usersControllers.getUser);
//----- Edit User ID -----//
router.put(
  "/edit/:id",
  jwtMiddleware,
  userMiddleware,
  usersControllers.updateUser
);
//----- Edit PASSWORD User ID -----//
router.put(
  "/edit/password/:id",
  jwtMiddleware,
  userMiddleware,
  usersControllers.editPassword
);
//----- Delete User ID -----//
router.delete(
  "/delete/:id",
  jwtMiddleware,
  userMiddleware,
  usersControllers.delelteUser
);

module.exports = router;
