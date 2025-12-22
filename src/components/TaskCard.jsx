import { useNavigate } from "react-router-dom";

export default function TaskCard({ title, description, color, path }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer rounded-2xl bg-white border shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
    >
      <div className={`h-1 rounded-t-2xl bg-gradient-to-r ${color}`} />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 hover:text-indigo-600 transition">
          {title}
        </h3>
        <p className="mt-3 text-slate-500">
          {description}
        </p>
        <div className="mt-6 text-sm font-medium text-indigo-600">
          Start Task →
        </div>
      </div>
    </div>
  );
}
