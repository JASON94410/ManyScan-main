const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller"); // Assurez-vous que le chemin est correct

router.post("/reviews", reviewController.addReview);

router.get("/reviews", reviewController.getAllReviews);

router.get("/reviews/:id", reviewController.getReview);

router.put("/reviews/:id", reviewController.updateReview);

router.delete("/reviews/:id", reviewController.deleteReview);

module.exports = router;
