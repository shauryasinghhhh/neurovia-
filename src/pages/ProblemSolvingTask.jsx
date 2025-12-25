import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const QUESTIONS = [
  {
    q: "You invested ₹10,000 at 10% annual compound interest. What is the value after 2 years?",
    ans: "12100"
  },
  {
    q: "A company’s profit rises from ₹40,000 to ₹52,000. What is the percentage increase?",
    ans: "30"
  },
  {
    q: "You work 9 hours a day for 5 days. How many hours in 4 weeks?",
    ans: "180"
  },
  {
    q: "A product costing ₹500 is sold at 20% profit. What is the selling price?",
    ans: "600"
  }
];

export default function ProblemSolvingTask() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const submit = async () => {
    const isCorrect = answer.trim() === QUESTIONS[index].ans;

    if (isCorrect) {
      setScore(s => s + 1);
      setMessage("Correct ✔");
    } else {
      setMessage(`Wrong ❌  Correct: ${QUESTIONS[index].ans}`);
    }

    setAnswer("");

    if (index === QUESTIONS.length - 1) {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "http://127.0.0.1:8000/results",
          {
            test_type: "problem_solving",
            score: score + (isCorrect ? 1 : 0),
            total: QUESTIONS.length
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setMessage("Test completed & saved");
      } catch (err) {
        console.error(err);
        setMessage("Error saving result");
      }
    } else {
      setIndex(i => i + 1);
    }
  };

  return (
    <>
      <Navbar />

      {/* padding-top pushes content below fixed navbar */}
      <div className="min-h-screen bg-gray-50 px-8 py-10 pt-32">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-indigo-600 font-medium hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-4">
          Executive Function & Logical Reasoning
        </h1>

        <p className="text-gray-600 mb-6">
          Question {index + 1} / {QUESTIONS.length}
        </p>

        <p className="mb-4 text-lg max-w-xl">
          {QUESTIONS[index].q}
        </p>

        <input
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          className="border p-2 rounded w-full max-w-sm"
          placeholder="Your answer"
        />

        <button
          onClick={submit}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Submit
        </button>

        <p className="mt-6 font-semibold">{message}</p>
      </div>

      <Footer />
    </>
  );
}
