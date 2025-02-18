// import React, { useState } from "react";
// import { motion } from "framer-motion";

// function Flashcard({ card, updateFlashcard }) {
//   const [showAnswer, setShowAnswer] = useState(false);

//   return (
//     <motion.div 
//       className="bg-white shadow-lg rounded-lg p-5 transition-all"
//       whileHover={{ scale: 1.05 }}
//     >
//       <p className="text-lg font-semibold">{card.question}</p>

//       {showAnswer && <p className="text-gray-700 mt-2">{card.answer}</p>}

//       <div className="mt-4 flex gap-2">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={() => setShowAnswer(!showAnswer)}
//         >
//           {showAnswer ? "Hide Answer" : "Show Answer"}
//         </button>

//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded"
//           onClick={() => updateFlashcard(card._id, true)}
//         >
//           Got it Right
//         </button>

//         <button
//           className="px-4 py-2 bg-red-500 text-white rounded"
//           onClick={() => updateFlashcard(card._id, false)}
//         >
//           Got it Wrong
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// export default Flashcard;


import React, { useState } from "react";

function Flashcard({ card, updateFlashcard, deleteFlashcard }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mb-4">
      <p className="text-lg font-semibold">{card.question}</p>

      {showAnswer && <p className="text-gray-700 mt-2">{card.answer}</p>}

      <div className="mt-4 flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => updateFlashcard(card._id, true)} // Mark as correct
        >
          Got it Right
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => updateFlashcard(card._id, false)} // Mark as incorrect
        >
          Got it Wrong
        </button>

        <button
          className="px-4 py-2 bg-red-700 text-white rounded"
          onClick={() => deleteFlashcard(card._id)} // Delete the flashcard
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Flashcard;
