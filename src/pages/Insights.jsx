import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Insights() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/results", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => setData(res.data));
  }, []);

  const group = (type) =>
    data.filter(d => d.test_type === type).map(d => d.score);

  const trend = (arr) => {
    if (arr.length < 3) return "Not enough data";
    const last = arr.slice(-3);
    return last[2] > last[0] ? "Improving" : "Declining";
  };

  const drift = (arr) => {
    if (arr.length < 5) return "Insufficient history";
    return arr[arr.length - 1] < arr[0]
      ? "⚠ Cognitive Drift Detected"
      : "Stable Pattern";
  };

  const recommendation = (type, arr) => {
    if (arr.length < 3) return "Take more tests for meaningful analysis.";

    const avg = arr.reduce((a,b)=>a+b,0)/arr.length;

    if (type === "reaction" && avg > 400)
      return "Processing speed appears slow. Improve sleep hygiene and reduce fatigue.";

    if (type === "memory" && avg < 3)
      return "Working memory is weak. Practice recall exercises and mental chunking.";

    if (type === "attention" && avg < 50)
      return "Sustained attention is low. Try mindfulness and minimize multitasking.";

    if (type === "decision" && avg < 0)
      return "High risk-taking behaviour detected. Consider long-term planning strategies.";

    return "Cognitive performance is stable.";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 text-indigo-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-8">Cognitive Health Summary</h1>

      {["memory","attention","reaction","decision","reasoning","problem_solving"].map(t => {
        const arr = group(t);
        return (
          <div key={t} className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="font-semibold text-lg capitalize mb-2">
              {t.replace("_"," ")}
            </h2>
            <p>Total Attempts: {arr.length}</p>
            <p>Trend: {trend(arr)}</p>
            <p>Status: {drift(arr)}</p>
            <p className="mt-2 text-indigo-600">
              Recommendation: {recommendation(t, arr)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
