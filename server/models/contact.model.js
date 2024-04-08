const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Veuillez saisir un nom d'utilisateur"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Veuillez saisir une adresse email"],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Veuillez saisir une adresse email valide",
    },
  },
  message: {
    type: String,
    required: [true, "Veuillez saisir un message"],
    trim: true,
  },

  read: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now, // Enregistre la date de soumission du formulaire
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
