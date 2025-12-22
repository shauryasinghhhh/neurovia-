import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // temporary

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
