const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Veuillez saisir un titre"],
    trim: true,
    maxlength: 100,
  },
  mangaId: {
    type: String,
    ref: "manga",
    required: true,
  },
  content: {
    type: String,
    required: [true, "Veuillez saisir un contenu"],
    minlength: 10,
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Veuillez attribuer une note"],
    min: 1,
    max: 5,
  },
  user: {
    type: String,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
