import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

/* ---------- SCROLL REVEAL HOOK ---------- */
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-active");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const navigate = useNavigate();

  const heroRef = useReveal();
  const sectionRef = useReveal();

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-125"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* ================= DARK PREMIUM OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-slate-900/65 to-indigo-950/70" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">

        {/* GLASS CARD */}
        <div
          ref={heroRef}
          className="reveal bg-white/15 backdrop-blur-[45px]
                     rounded-3xl border border-white/25
                     shadow-[0_35px_90px_rgba(0,0,0,0.6)]
                     p-10 max-w-xl
                     transition-all duration-300
                     hover:-translate-y-1
                     hover:shadow-[0_45px_120px_rgba(0,0,0,0.7)]"
        >

          {/* RV LOGO */}
          <img
            src="/rvce-logo.png"
            alt="RV College of Engineering"
            className="w-24 mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
          />

          <h1 className="text-5xl font-bold tracking-tight text-indigo-400">
            Neurovia
          </h1>

          <p className="mt-2 text-lg text-slate-200 font-medium">
            AI-Powered Cognitive Analysis Platform
          </p>

          <p className="mt-6 text-slate-300 leading-relaxed">
            Neurovia is a cognitive evaluation platform designed to assess
            memory, attention, and decision-making through structured tasks.
            AI-driven models interpret behavioral patterns to support
            meaningful cognitive insights.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl
                         shadow-lg hover:bg-indigo-700 transition"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 border border-white/40 text-white/90
                         rounded-xl hover:bg-white/10 transition"
            >
              Get Started
            </button>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            RV College of Engineering – AIML Department
          </p>
        </div>
      </div>

      {/* ================= TASK SECTION ================= */}
      <div
        ref={sectionRef}
        className="relative z-10 bg-gradient-to-b from-white to-slate-50 py-28 reveal"
      >
        <div className="max-w-6xl mx-auto px-8 text-center">

          <h2 className="text-3xl font-semibold text-slate-800">
            Cognitive Task Evaluation
          </h2>

          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            Carefully designed tasks to evaluate core cognitive functions
            in a structured and research-oriented environment.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white rounded-2xl p-8 border border-slate-200
                            shadow-sm transition-all duration-300
                            hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-indigo-600 font-semibold text-lg">
                Memory Analysis
              </h3>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                Evaluates working memory and recall ability through structured
                cognitive exercises focusing on retention and accuracy.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200
                            shadow-sm transition-all duration-300
                            hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-indigo-600 font-semibold text-lg">
                Attention Tracking
              </h3>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                Measures sustained attention and focus using controlled tasks
                designed to observe consistency and responsiveness.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200
                            shadow-sm transition-all duration-300
                            hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-indigo-600 font-semibold text-lg">
                Decision Making
              </h3>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                Assesses logical reasoning and decision strategies under
                varying conditions to understand adaptive thinking.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ---------- SCROLL REVEAL STYLES ---------- */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s ease-out;
        }
      `}</style>

    </div>
  );
}
