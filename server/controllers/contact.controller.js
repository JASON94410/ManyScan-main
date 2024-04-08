const Contact = require("../models/contact.model");

exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find({});
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la récupération des messages",
        error: error.message,
      });
  }
};

exports.addContactMessage = async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    const savedMessage = await newMessage.save();

    res.status(201).json({
      message: "Message de contact ajouté avec succès",
      contact: savedMessage,
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de l'ajout du message",
      error: error.message,
    });
  }
};

exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message non trouvé" });
    }
    res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
