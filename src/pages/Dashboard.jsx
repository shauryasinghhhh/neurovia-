import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-slate-50 via-white to-white pt-24 font-sans">
        <div className="max-w-7xl mx-auto px-8 py-12">

          <div className="mb-12">
            <h1 className="text-5xl font-bold text-slate-900">
              Welcome to <span className="text-indigo-600">Neurovia</span>
            </h1>
            <p className="text-slate-500 mt-4 max-w-2xl">
              Monitor cognitive performance and explore intelligent task
              categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard title="Total Score" value="0" />
            <StatCard title="Tasks Completed" value="0 / 9" />
            <StatCard title="Overall Progress" value="0%" />
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Cognitive Task Categories
            </h2>
            <p className="text-slate-500 mb-10">
              Each category evaluates a different cognitive ability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TaskCard
                title="Memory"
                description="Recall sequences, patterns, and visual memory tasks"
                color="from-indigo-600 to-indigo-400"
                path="/task/memory"
              />

              <TaskCard
                title="Attention"
                description="Measure focus, reaction time, and sustained attention"
                color="from-indigo-600 to-indigo-400"
                path="/task/attention"
              />

              <TaskCard
                title="Problem Solving"
                description="Logical reasoning, puzzles, and decision making"
                color="from-indigo-600 to-indigo-400"
                path="/task/problem-solving"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
