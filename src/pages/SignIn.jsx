import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* LEFT INFO PANEL */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 text-white flex-col justify-center px-14">
        <h1 className="text-4xl font-bold mb-4">Neurovia</h1>
        <p className="text-indigo-100 text-lg mb-6">
          Your personal cognitive performance platform.
        </p>

        <ul className="space-y-3 text-indigo-100">
          <li>• Memory & Attention Analytics</li>
          <li>• Processing Speed Tracking</li>
          <li>• Decision-Making Insights</li>
          <li>• AI-driven Cognitive Drift Detection</li>
        </ul>
      </div>

      {/* RIGHT SIGN IN CARD */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="relative w-full max-w-md bg-white p-10 rounded-2xl shadow">
          {/* BACK TO HOME */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-5 left-5 text-slate-500 hover:text-indigo-600"
          >
            ← Home
          </button>

          <h2 className="text-2xl font-semibold text-slate-800 mb-2 text-center">
            Sign in to your account
          </h2>
          <p className="text-center text-slate-500 mb-8">
            Access your cognitive dashboard
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="mt-4 w-full py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
