import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const SCENARIOS = [
  {
    question: "Work 70+ hrs this week to impress your manager?",
    safe: { label: "Maintain Balance", value: 40 },
    risk: { label: "Overwork for Promotion", value: () => (Math.random() < 0.5 ? 120 : -100) }
  },
  {
    question: "Spend savings on luxury vacation?",
    safe: { label: "Save Money", value: 30 },
    risk: { label: "Go All-In", value: () => (Math.random() < 0.5 ? 100 : -140) }
  },
  {
    question: "Invest in a risky startup?",
    safe: { label: "Index Funds", value: 35 },
    risk: { label: "High-Risk Startup", value: () => (Math.random() < 0.5 ? 150 : -160) }
  },
  {
    question: "Take unpaid break for mental health?",
    safe: { label: "Short Leave", value: 25 },
    risk: { label: "Full Sabbatical", value: () => (Math.random() < 0.5 ? 90 : -120) }
  }
];

export default function DecisionTask() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Choose wisely");

  const choose = async (type) => {
    const scenario = SCENARIOS[index];
    let delta =
      type === "safe"
        ? scenario.safe.value
        : scenario.risk.value();

    const newScore = score + delta;
    setScore(newScore);
    setMessage(delta > 0 ? `Outcome: +${delta}` : `Outcome: ${delta}`);

    if (index === SCENARIOS.length - 1) {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "http://127.0.0.1:8000/results",
          {
            test_type: "decision",
            score: newScore,
            total: SCENARIOS.length
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setMessage("Life decision profile saved");
      } catch (err) {
        console.error(err);
        setMessage("Error saving result");
      }
    }

    setIndex(i => i + 1);
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-24 left-10 text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-6">Life Trade-Off Challenge</h1>

        {index < SCENARIOS.length ? (
          <>
            <p className="text-xl text-center mb-8">
              {SCENARIOS[index].question}
            </p>

            <div className="flex gap-6">
              <button
                onClick={() => choose("safe")}
                className="bg-green-600 text-white px-8 py-5 rounded-xl text-lg"
              >
                {SCENARIOS[index].safe.label}
              </button>

              <button
                onClick={() => choose("risk")}
                className="bg-red-600 text-white px-8 py-5 rounded-xl text-lg"
              >
                {SCENARIOS[index].risk.label}
              </button>
            </div>
          </>
        ) : (
          <div className="text-xl font-semibold">
            Final Life Balance Score: {score}
          </div>
        )}

        <p className="mt-6">{message}</p>
      </div>

      <Footer />
    </>
  );
}
