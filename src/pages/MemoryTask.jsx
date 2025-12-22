import { useState } from "react";
import Navbar from "../components/Navbar";

export default function MemoryTask() {
  const correctSequence = "4 9 2 7";
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    if (input.trim() === correctSequence) {
      setResult("correct");
  
      const oldScore = Number(localStorage.getItem("score")) || 0;
      const newScore = oldScore + 10;
  
      localStorage.setItem("score", newScore);
  
      console.log("Score saved:", newScore);
    } else {
      setResult("wrong");
    }
  };
  

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow">

          <h1 className="text-3xl font-bold mb-2">Memory Task</h1>
          <p className="text-gray-600 mb-6">
            Memorize the sequence below and enter it correctly.
          </p>

          <div className="text-xl font-semibold mb-4">
            Sequence: <span className="text-purple-600">4 – 9 – 2 – 7</span>
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter sequence (e.g. 4 9 2 7)"
            className="w-full border rounded-lg px-4 py-2 mb-4"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Submit
          </button>

          {result === "correct" && (
            <p className="mt-4 text-green-600 font-semibold">
              ✅ Correct! +10 points
            </p>
          )}

          {result === "wrong" && (
            <p className="mt-4 text-red-600 font-semibold">
              ❌ Incorrect. Try again.
            </p>
          )}
        </div>
      </div>
      <Footer />

    </>
  );
}
