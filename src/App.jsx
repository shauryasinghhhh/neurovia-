import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MemoryTask from "./pages/MemoryTask";
import AttentionTask from "./pages/AttentionTask";
import ProblemSolvingTask from "./pages/ProblemSolvingTask";

/* Components */
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/memory"
          element={
            <ProtectedRoute>
              <MemoryTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/attention"
          element={
            <ProtectedRoute>
              <AttentionTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/problem-solving"
          element={
            <ProtectedRoute>
              <ProblemSolvingTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
