import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const SENTENCES = [
  { text: "She finished the report before the meeting started.", last: "started" },
  { text: "He locked the door after leaving the office.", last: "office" },
  { text: "They booked the tickets using their credit card.", last: "card" },
  { text: "The manager approved the budget yesterday.", last: "yesterday" },
  { text: "She saved the file before shutting down.", last: "down" }
];

export default function MemoryTask() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState("read"); // read | recall | done

  const next = () => {
    if (step < SENTENCES.length - 1) setStep(s => s + 1);
    else setPhase("recall");
  };

  const submitRecall = async () => {
    let correct = 0;
    answers.forEach((a, i) => {
      if (a.toLowerCase() === SENTENCES[i].last) correct++;
    });

    setScore(correct);
    setPhase("done");

    const token = localStorage.getItem("token");

    await axios.post(
      "http://127.0.0.1:8000/results",
      {
        test_type: "memory",
        score: correct,
        total: SENTENCES.length
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-32">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-4">Working Memory – Reading Span Test</h1>

        {phase === "read" && (
          <>
            <p className="text-lg max-w-xl mb-6">{SENTENCES[step].text}</p>
            <button onClick={next} className="bg-indigo-600 text-white px-6 py-3 rounded">
              Next Sentence
            </button>
          </>
        )}

        {phase === "recall" && (
          <>
            <p className="mb-4">Enter the last word of each sentence in order:</p>
            {SENTENCES.map((_, i) => (
              <input
                key={i}
                onChange={e => {
                  const arr = [...answers];
                  arr[i] = e.target.value;
                  setAnswers(arr);
                }}
                className="border p-2 rounded w-64 mb-2"
              />
            ))}
            <button onClick={submitRecall} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded">
              Submit
            </button>
          </>
        )}

        {phase === "done" && (
          <p className="text-xl font-semibold">
            Your Working Memory Score: {score} / {SENTENCES.length}
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}
