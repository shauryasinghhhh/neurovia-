import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/signin");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
    }`;

  return (
    <nav className="fixed top-0 z-30 w-full border-b bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Brand */}
        <h1 className="text-lg font-semibold text-slate-900">
          Neurovia
        </h1>

        {/* Links */}
        <div className="flex items-center gap-3">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="ml-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:opacity-90"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
