// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Flashcard from "./Flashcard";

// const API_URL = "http://localhost:5000/flashcards"; // Change this if needed

// function FlashcardList() {
//   const [flashcards, setFlashcards] = useState([]);

//   useEffect(() => {
//     axios.get(API_URL).then((res) => setFlashcards(res.data));
//   }, []);

//   const updateFlashcard = (id, correct) => {
//     axios.put(`${API_URL}/${id}`, { correct }).then((res) => {
//       setFlashcards((prev) =>
//         prev.map((card) => (card._id === id ? res.data : card))
//       );
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {flashcards.length === 0 ? (
//         <p className="text-center text-gray-500">No flashcards available.</p>
//       ) : (
//         flashcards.map((card) => (
//           <Flashcard key={card._id} card={card} updateFlashcard={updateFlashcard} />
//         ))
//       )}
//     </div>
//   );
// }

// export default FlashcardList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

const API_URL = "http://localhost:5000/flashcards"; // Change this to your backend URL

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  // Fetch all flashcards
  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(API_URL);
      setFlashcards(res.data);
    } catch (error) {
      console.error("Error fetching flashcards", error);
    }
  };

  // Add new flashcard
  const addFlashcard = async (e) => {
    e.preventDefault();
    try {
      const newFlashcard = { question, answer };
      const res = await axios.post(API_URL, newFlashcard);
      setFlashcards([...flashcards, res.data]); // Add the new flashcard to the list
      setQuestion(""); // Clear form fields
      setAnswer("");
    } catch (error) {
      console.error("Error adding flashcard", error);
    }
  };

  // Update flashcard (move to the next box or reset to Box 1)
  const updateFlashcard = async (id, correct) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { correct });
      setFlashcards((prev) =>
        prev.map((card) => (card._id === id ? res.data : card))
      );
    } catch (error) {
      console.error("Error updating flashcard", error);
    }
  };

  // Delete flashcard
  const deleteFlashcard = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFlashcards(flashcards.filter((card) => card._id !== id)); // Remove flashcard from list
    } catch (error) {
      console.error("Error deleting flashcard", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Flashcard List</h2>

      {/* Form to add a new flashcard */}
      <form onSubmit={addFlashcard} className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2 w-full"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Add Flashcard
        </button>
      </form>

      {/* Display flashcards */}
      {flashcards.length === 0 ? (
        <p className="text-center text-gray-500">No flashcards available.</p>
      ) : (
        flashcards.map((card) => (
          <Flashcard
            key={card._id}
            card={card}
            updateFlashcard={updateFlashcard}
            deleteFlashcard={deleteFlashcard}
          />
        ))
      )}
    </div>
  );
}

export default FlashcardList;
