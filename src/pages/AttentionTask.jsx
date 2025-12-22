import Navbar from "../components/Navbar";

export default function AttentionTask() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-8 py-10">
        <h1 className="text-3xl font-bold mb-4">Attention Task</h1>
        <p className="text-gray-600 mb-6">
          Click the button when the color changes.
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Click Me
        </button>
      </div>
      <Footer />

    </>
  );
}
