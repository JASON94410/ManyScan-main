const JWT = require("jsonwebtoken");

// let userToken =
//   req.params?.token ??
//   req.cookies?.token ??
//   req.headers?.authorization?.split(" ")[1] ??
//   "";
// let role = req.headers?.role ?? "";

// console.log("Rôle récupéré depuis les en-têtes :", role);
// console.log("Token récupéré depuis les en-têtes :", userToken);

module.exports = (req, res, next) => {
  try {
    const userToken = req.headers.authorization.split(" ")[1];
    if (!userToken) {
      return res.status(401).json({ message: "Token absent" });
    }

    JWT.verify(userToken, process.env.SECRET_TOKEN_KEY, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ message: "Token invalide", error: error });
      } else {
        req.user = decoded; // ou une structure de données appropriée
        next();
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur interne du serveur", error: error });
  }
};
