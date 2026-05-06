import { Navigate, Outlet } from "react-router-dom";

/**
 * SessionGuard — protects all routes that require passing through BetaLanding first.
 * Checks sessionStorage for the "hasEntered" flag set when the user clicks "Ingresar".
 * Designed to be replaced later with real auth logic.
 */
export default function SessionGuard() {
  const hasEntered = localStorage.getItem("hasEntered") === "true";
  return hasEntered ? <Outlet /> : <Navigate to="/" replace />;
}
