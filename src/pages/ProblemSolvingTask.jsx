import Navbar from "../components/Navbar";

export default function ProblemSolvingTask() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-8 py-10">
        <h1 className="text-3xl font-bold mb-4">Problem Solving Task</h1>
        <p className="text-gray-600 mb-6">
          What comes next in the series: 2, 4, 8, 16, ?
        </p>

        <input
          className="border p-2 rounded w-full max-w-sm"
          placeholder="Your answer"
        />
      </div>
      <Footer />

    </>
  );
}
