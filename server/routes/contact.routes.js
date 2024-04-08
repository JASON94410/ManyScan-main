const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const { validateContactForm } = require("../config/sanitize.middleware");

router.get("/contact", contactController.getContactMessages);

router.post(
  "/contact",
  validateContactForm,
  contactController.addContactMessage
);

router.patch("/contact/:id/mark-read", contactController.markMessageAsRead);

router.delete("/contact/:id", contactController.deleteContactMessage);

module.exports = router;
