import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white flex items-center justify-center font-sans">

      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl px-12 py-14 w-full max-w-lg text-center">

        {/* Soft background accent (same texture family as dashboard) */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>

        {/* RVCE Logo */}
        <img
          src="/rvce-logo.png"
          alt="RV College of Engineering"
          className="mx-auto h-14 mb-6 relative z-10"
        />

        {/* App Name – Indigo Glow (NOT gradient) */}
        <h1
          className="text-4xl font-bold text-indigo-600 tracking-tight relative z-10"
          style={{
            textShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
          }}
        >
          Neurovia
        </h1>

        <p className="mt-2 text-slate-500 relative z-10">
          AI-Powered Cognitive Analysis Platform
        </p>

        {/* Divider */}
        <div className="my-8 border-t border-slate-200"></div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
          Neurovia enables structured evaluation of memory, attention, and
          problem-solving abilities through interactive cognitive tasks and
          intelligent analysis.
        </p>

        {/* Actions – SAME style as Dashboard */}
        <div className="mt-10 flex justify-center gap-5">
          <Link
            to="/signin"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            Sign In
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-lg border border-indigo-300 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-xs text-slate-400">
          Cognitive Research & Academic Evaluation Platform
        </p>
      </div>
    </div>
  );
}
