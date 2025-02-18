import React from "react";
import FlashcardList from "./components/FlashcardList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-5">Flashcard App (Leitner System)</h1>
        <FlashcardList />
      </div>
    </div>
  );
}

export default App;
