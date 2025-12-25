import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AttentionTask() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [score, setScore] = useState(0);
  const [trials, setTrials] = useState(0);
  const [message, setMessage] = useState("Press START to begin");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setPrevious(current);
      const next = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      setCurrent(next);
      setTrials(t => t + 1);
    }, 1200);

    return () => clearInterval(interval);
  }, [running, current]);

  const handleClick = () => {
    if (previous === "A" && current === "X") {
      setScore(s => s + 1);
      setMessage("Correct ✔");
    } else {
      setMessage("Wrong ❌");
    }
  };

  const finishTest = async () => {
    setRunning(false);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/results",
        {
          test_type: "attention",
          score: score,
          total: trials
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(`Final Score: ${score} / ${trials}`);
    } catch (err) {
      console.error(err);
      setMessage("Error saving result");
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-24 left-10 text-sm text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-4">Sustained Attention Test</h1>
        <p className="text-gray-600 mb-6">
          Click only when <b>X</b> appears immediately after <b>A</b>
        </p>

        <div className="text-7xl font-bold mb-6 text-indigo-600">
          {current || "-"}
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
            <>
              <button
                onClick={handleClick}
                className="bg-green-600 text-white px-6 py-3 rounded"
              >
                Click
              </button>
              <button
                onClick={finishTest}
                className="bg-red-600 text-white px-6 py-3 rounded"
              >
                Finish
              </button>
            </>
          )}
        </div>

        <p className="mt-6 text-lg">{message}</p>
      </div>

      <Footer />
    </>
  );
}
