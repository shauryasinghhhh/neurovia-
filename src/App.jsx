import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MemoryTask from "./pages/MemoryTask";
import AttentionTask from "./pages/AttentionTask";
import ProblemSolvingTask from "./pages/ProblemSolvingTask";
import ReasoningTask from "./pages/ReasoningTask";
import ReactionTask from "./pages/ReactionTask";
import DecisionTask from "./pages/DecisionTask";
import Insights from "./pages/Insights";

/* Components */
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============ PUBLIC ROUTES ============ */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/* ============ PROTECTED ROUTES ============ */}
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

        <Route
          path="/task/reasoning"
          element={
            <ProtectedRoute>
              <ReasoningTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/reaction"
          element={
            <ProtectedRoute>
              <ReactionTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/decision"
          element={
            <ProtectedRoute>
              <DecisionTask />
            </ProtectedRoute>
          }
        />

        {/* 🧠 COGNITIVE HEALTH SUMMARY */}
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
