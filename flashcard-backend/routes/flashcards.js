const express = require("express");
const {
  addFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardController");

const router = express.Router();

// Routes for flashcards
router.post("/", addFlashcard);
router.get("/", getFlashcards);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);

module.exports = router;
