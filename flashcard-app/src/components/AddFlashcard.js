import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/flashcards"; // Your API endpoint

function AddFlashcardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFlashcard = { question, answer };
      const response = await axios.post(API_URL, newFlashcard);
      // You may want to update the state with the new flashcard
      console.log(response.data);
    } catch (error) {
      console.error("Error adding flashcard", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        className="p-2 border rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
        className="p-2 border rounded mb-4 w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Flashcard
      </button>
    </form>
  );
}

export default AddFlashcardForm;
