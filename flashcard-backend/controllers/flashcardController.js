const Flashcard = require("../models/Flashcard");

// Add a new flashcard
const addFlashcard = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = new Flashcard({ question, answer });
    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ message: "Error adding flashcard" });
  }
};

// Get all flashcards
const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find().sort({ nextReviewDate: 1 });
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flashcards" });
  }
};

// Update flashcard (move to the next level or reset)
const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { correct } = req.body;
    const flashcard = await Flashcard.findById(id);

    if (correct) {
      // Move to the next box or stay at the last box
      flashcard.box = Math.min(flashcard.box + 1, 5);
    } else {
      // Reset to Box 1
      flashcard.box = 1;
    }

    // Calculate next review date based on the box number
    const now = new Date();
    const reviewIntervals = [1, 3, 7, 14, 30]; // in days
    flashcard.nextReviewDate = new Date(now.setDate(now.getDate() + reviewIntervals[flashcard.box - 1]));

    await flashcard.save();
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Error updating flashcard" });
  }
};

// Delete a flashcard
const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    await Flashcard.findByIdAndDelete(id);
    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flashcard" });
  }
};

module.exports = { addFlashcard, getFlashcards, updateFlashcard, deleteFlashcard };
