const User = require("../models/user.model.js");
const JWT = require("jsonwebtoken");

const generateRefreshToken = require("../utils/refresh-token.js");
const generateResetToken = require("../utils/forgot-password-token.js");
const setTokenExpiration = require("../utils/setToken-expiration.js");
const { sendEmailReinitPassword } = require("./notification.controller.js");
const { sendEmailSuccessRestPassword } = require("./notification.controller");

require("dotenv").config({ path: "../config/.env" });

// Function de création de compte
module.exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User successfully created",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// Function signin
module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordMatch = await User.login(email, password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const expiresIn = parseInt(process.env.TOKEN_EXPIRATION);
    const token = JWT.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.SECRET_TOKEN_KEY,
      { expiresIn }
    );

    // Génère Refresh Token
    const refresh_token = generateRefreshToken(user.id);

    console.log("ID de l'utilisateur :", user.id); // Ajout d'un console.log
    console.log("Token généré :", token); // Ajout d'un console.log

    // Renvoyer le token et le username dans la réponse
    const role = user.role || "User";
    return res.status(200).json({
      message: "User authenticated successfully",
      id: user.id,
      token,
      username: user.username,
      role,
      refresh_token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function logout
module.exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization;

    return res.status(200).json({
      message: "User logged out successfully",
      token: token,
    });
  } catch (error) {
    console.error("Logout error:");
    return res.status(500).json({
      message: "Logout failed",
      error: error,
    });
  }
};

// Function token et envoie un email contenant un lien pour password reset
module.exports.generateForgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken();
    const resetTokenExpiration = setTokenExpiration();

    // Enregistre le token de réinitialisation dans le modèle User
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;

    await user.save();

    // Envoye l'email de réinitialisation
    await sendEmailReinitPassword(email, resetToken);

    return res.status(200).json({ message: "Email reset successful" });
  } catch (error) {
    console.error("Password reset:", error);
    return res.status(500).json({ message: "Email reset failed" });
  }
};
module.exports.getResetToken = async (req, res) => {
  try {
    const resetToken = req.query.token;

    // Recherche du token dans la base de données
    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(404).json({ message: "Token not found" });
    }

    // Renvoi de l'email associé au token
    return res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching email from token:", error);
    return res.status(500).json({ message: "Error fetching email from token" });
  }
};
// Function genere nouveau password
module.exports.newPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userToken = req.headers["reset-token"];

    const isUser = await User.findOne({ email });

    console.log(isUser.resetTokenExpiration < Date.now());
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      isUser.resetToken !== userToken ||
      isUser.resetTokenExpiration < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    isUser.password = password;

    await isUser.save();

    // Succes de réinitialisation de mot de passe, envoie une notif à l'email
    await sendEmailSuccessRestPassword(email);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password change procedure:", error);
    return res
      .status(500)
      .json({ message: "Error during password change procedure" });
  }
};
