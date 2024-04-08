const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const generateRefreshToken = require("../utils/refresh-token");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Veuillez saisir un pseudo"],
    minlength: 3,
    maxlength: 55,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Veuillez saisir un email"],
    validate: [isEmail],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Veuillez saisir un mot de passe"],
    max: 50,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Administrateur"], // Les rôles valides
    default: "User", // Rôle par défaut
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  refreshTokens: [{ type: String }],
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiration: {
    type: Date,
    default: null,
  },
});
// function crypte le password avant le save register
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// Function décrypte le password de l'utilisateur quand login

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    return false;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return false;
  }

  user.setOnlineStatus(true);

  // Génération du refresh token et ajout à la liste des refresh tokens
  const refreshToken = generateRefreshToken();
  user.refreshTokens.push(refreshToken);
  await user.save();

  return true;
};
// Function décrypte le password et modifie le password quand l'user est logué
userSchema.methods.changePassword = async function (newPassword) {
  this.password = newPassword;

  try {
    this.refreshTokens = [];
    await this.save();
    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    return false;
  }
};

userSchema.methods.setOnlineStatus = async function (online) {
  try {
    await this.updateOne({ $set: { isOnline: online } });
    return true;
  } catch (error) {
    console.error("Error setting online status:", error);
    return false;
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
