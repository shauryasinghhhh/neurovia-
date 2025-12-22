export default function StatCard({ title, value }) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur border shadow-sm hover:shadow-lg transition">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400" />
        <div className="p-6">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-4xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    );
  }
  