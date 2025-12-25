import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://127.0.0.1:8000/results", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, []);

  const tasks = [
    {
      title: "Working Memory Evaluation",
      description: "Evaluates short-term and working memory capacity.",
      path: "/task/memory",
    },
    {
      title: "Sustained Attention Assessment",
      description: "Measures vigilance and attention stability.",
      path: "/task/attention",
    },
    {
      title: "Executive Function & Logical Reasoning",
      description: "Assesses planning, reasoning, and flexibility.",
      path: "/task/problem-solving",
    },
    {
      title: "Logical Reasoning Assessment",
      description: "Evaluates abstract reasoning and inference ability.",
      path: "/task/reasoning",
    },
    {
      title: "Reaction Time & Processing Speed",
      description: "Measures response latency and neural speed.",
      path: "/task/reaction",
    },
    {
      title: "Decision-Making Under Uncertainty",
      description: "Assesses judgment under incomplete information.",
      path: "/task/decision",
    },
  ];

  const attentionResults = results.filter(r => r.test_type === "attention");

  const detectDrift = () => {
    if (attentionResults.length < 5) return "Not enough data yet";

    const last5 = attentionResults.slice(-5).map(r => r.score);
    const avg = last5.reduce((a, b) => a + b, 0) / last5.length;

    return avg > 400 ? "⚠ Attention Declining" : "✅ Attention Stable";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* NAVBAR */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-indigo-600">Neurovia</h1>

          <div className="flex items-center gap-6 text-sm">
  <button
    onClick={() => navigate("/insights")}
    className="text-slate-600 hover:text-indigo-600 transition"
  >
    Cognitive Insights
  </button>

  <button
    onClick={() => navigate("/profile")}
    className="text-slate-600 hover:text-indigo-600 transition"
  >
    Profile
  </button>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/signin");
    }}
    className="text-slate-600 hover:text-red-500 transition"
  >
    Logout
  </button>
</div>

        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 px-10 py-8">
          <h2 className="text-4xl font-semibold text-slate-900">
            Neurovia Insights
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
            A unified overview of cognitive performance, neural efficiency,
            and adaptive intelligence derived from structured assessments.
          </p>
        </div>

        {/* ATTENTION SUMMARY */}
        <div className="mb-10 rounded-3xl border border-indigo-100 bg-white px-10 py-6">
          <h3 className="text-xl font-semibold text-slate-800">
            Attention Performance Summary
          </h3>

          <p className="mt-2 text-slate-600">
            Total Tests: {attentionResults.length}
          </p>

          <p className="mt-1 font-semibold">
            Trend: {detectDrift()}
          </p>

          <ul className="mt-4 text-sm text-slate-600 space-y-1">
            {attentionResults.slice(-5).map((r, i) => (
              <li key={i}>
                {new Date(r.created_at).toLocaleString()} → {r.score} ms
              </li>
            ))}
          </ul>
        </div>

        {/* TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-md"
            >
              <div className="h-1 w-12 bg-indigo-600 rounded-full mb-4"></div>

              <h3 className="text-lg font-semibold text-slate-900">
                {task.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {task.description}
              </p>

              <button
                onClick={() => navigate(task.path)}
                className="mt-auto w-full rounded-xl border border-indigo-600 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
