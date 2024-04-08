module.exports = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({
      message: "Accès refusé: Vous devez être administrateur.",
    });
  }
};
