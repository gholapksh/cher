import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import "./AuthPage.css";

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock auth — swap for real POST /api/auth/login or /register
    onLogin?.({ email });
    navigate("/wardrobe");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <p className="auth-quote">"That's a Monet."</p>
        <p className="auth-quote-sub">Looks good from far away.</p>
        <span className="auth-left-logo">CHER.</span>
      </div>
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="auth-heading">{mode === "login" ? "Welcome back" : "Create your closet"}</h2>
          <p className="auth-sub">
            {mode === "login" ? "Sign in to your wardrobe" : "Start building your digital closet"}
          </p>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" size="lg" style={{ width: "100%", marginTop: "8px" }}>
            {mode === "login" ? "Sign in" : "Register"}
          </Button>

          <p className="auth-toggle">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Register" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
