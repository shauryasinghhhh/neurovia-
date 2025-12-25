import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReasoningTask() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tests/reasoning")
      .then(res => res.json())
      .then(data => setQuestions(data.questions));
  }, []);

  if (!questions.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Reasoning Test Completed
          </h2>
          <p className="text-4xl font-bold text-indigo-600">
            {score} / {questions.length}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    let newScore = score;
    if (selectedOption === currentQuestion.answer) newScore++;

    setScore(newScore);
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      fetch("http://127.0.0.1:8000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          test_type: "reasoning",
          score: newScore,
          total: questions.length
        })
      });

      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {currentQuestion.question}
        </h2>

        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOption(opt)}
            className={`w-full px-4 py-2 my-2 rounded border ${
              selectedOption === opt ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {opt}
          </button>
        ))}

        <button
          disabled={!selectedOption}
          onClick={handleNext}
          className="mt-6 w-full py-2 bg-indigo-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
