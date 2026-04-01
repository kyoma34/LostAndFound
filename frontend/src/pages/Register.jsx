import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { registerUser } from "../api/auth";
import "../style/register.css";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!agreed) {
      return setError("You must agree to the Terms of Service");
    }

    setLoading(true);
    try {
      await registerUser(name, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">

        <div className="logo">
          <img src="/logo.png" alt="logo" width={500} />
        </div>

        <h2 className="title">Create Account</h2>
        <p className="subtitle">
          Join our community and start finding lost items
        </p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
              {error}
            </p>
          )}

          <button className="main-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span></span>
          <p>Or sign up with</p>
          <span></span>
        </div>

        {/* Social */}
        <div className="social">
          <button type="button">Google</button>
          <button type="button">Facebook</button>
        </div>

        <p className="signin">
          Already have an account?{" "}
          <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            Sign in
          </a>
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <h1 className="hero-title">Start Your Journey Today</h1>
        <p className="hero-text">
          Create your free account and join a growing community dedicated to
          helping people find their lost belongings. It only takes a minute to
          get started.
        </p>

        <div className="feature">
          <span><img src="/icons8-zoom-in-48.png" alt="Search" width="38" height="38" /></span>
          <div>
            <h4>Search Lost Items</h4>
            <p>Access our database with powerful filters</p>
          </div>
        </div>

        <div className="feature">
          <span><img src="/icons8-plus-48.png" width={38} height={38} /></span>
          <div>
            <h4>Report Found Items</h4>
            <p>Help others by posting items you've found</p>
          </div>
        </div>

        <div className="feature">
          <span><img src="/icons8-alarm-in-48.png" width={38} height={38} /></span>
          <div>
            <h4>Get Instant Alerts</h4>
            <p>Receive notifications when items match</p>
          </div>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h2>12,547</h2>
            <span>Items Found</span>
          </div>
          <div className="stat-box">
            <h2>8,392</h2>
            <span>Active Users</span>
          </div>
        </div>
      </div>

    </div>
  );
}