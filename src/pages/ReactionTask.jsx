import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const PAIRS = [
  { sym: "★", val: "3" },
  { sym: "■", val: "7" },
  { sym: "●", val: "2" },
  { sym: "▲", val: "5" },
];

export default function ReactionTask() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(0);
  const [trials, setTrials] = useState(0);
  const [message, setMessage] = useState("Press START to begin");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
      setCurrent(pair);
      setTrials(t => t + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [running]);

  const handleKey = (e) => {
    if (!running || !current) return;

    if (e.key === current.val) {
      setScore(s => s + 1);
      setMessage("Correct ✔");
    } else {
      setMessage("Wrong ❌");
    }
  };

  const finishTest = async () => {
    setRunning(false);

    const token = localStorage.getItem("token");

    await axios.post(
      "http://127.0.0.1:8000/results",
      {
        test_type: "reaction",
        score: score,
        total: trials
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setMessage(`Final Score: ${score} / ${trials}`);
  };

  return (
    <>
      <Navbar />

      <div
        onKeyDown={handleKey}
        tabIndex="0"
        className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 outline-none"
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-24 left-10 text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-4">Processing Speed Test</h1>
        <p className="text-gray-600 mb-6">
          Type the number matching the symbol
        </p>

        <div className="flex gap-6 mb-8 text-xl">
          {PAIRS.map((p, i) => (
            <div key={i}>{p.sym} → {p.val}</div>
          ))}
        </div>

        <div className="text-7xl font-bold mb-6 text-indigo-600">
          {current ? current.sym : "-"}
        </div>

        <div className="flex gap-4">
          {!running ? (
            <button
              onClick={() => {
                setRunning(true);
                setScore(0);
                setTrials(0);
                setMessage("Test running...");
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded"
            >
              Start
            </button>
          ) : (
            <button
              onClick={finishTest}
              className="bg-red-600 text-white px-6 py-3 rounded"
            >
              Finish
            </button>
          )}
        </div>

        <p className="mt-6 text-lg">{message}</p>
      </div>

      <Footer />
    </>
  );
}
