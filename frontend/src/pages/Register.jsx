import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { registerUser } from "../api/auth";
import "../style/register.css";
import { useEffect, useRef } from "react";
import { Package, Users , Bell, Plus, Search, Mail, Lock, User} from "lucide-react";


function StatCard({ value, label, icon, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [isVisible, value]);

  return (
    <div className="reg_card flex-1 rounded-2xl p-7 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">
      <div className="home_stats_icon">{icon}</div>
      <h2 className="text-4xl font-bold text-yellow-400">{count.toLocaleString()}</h2>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const statsRef = useRef();

  useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisible(true);
            observer.disconnect(); // run only once
          }
        },
        { threshold: 0.3 }
      );
  
      if (statsRef.current) {
        observer.observe(statsRef.current);
      }
  
      return () => observer.disconnect();
    }, []);

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
    <div className="body">
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
            <div className="relative mt-1 gap-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " size={18} />
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3.5 
                  rounded-xl 
                  outline-none 
                  border border-transparent 
                  focus:border-blue-400 
                  transition-all duration-200"
            />
            </div>

            <label>Email Address</label>
            <div className="relative mt-1 gap-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3.5 
                  rounded-xl 
                  outline-none 
                  border border-transparent 
                  focus:border-blue-400 
                  transition-all duration-200"
            /></div>

            <label>Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3.5 
                   
                  rounded-xl 
                  outline-none 
                  border border-transparent 
                  focus:border-blue-400 
                  transition-all duration-200"
              />
            </div>

            <label>Confirm Password</label>
            <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3.5 
                 
                  rounded-xl 
                  outline-none 
                  border border-transparent 
                  focus:border-blue-400 
                 
                  transition-all duration-200"
            />
            </div>

            <div className="ok">
              <label htmlFor="agreed" className="flex items-center gap-2 font-medium text-gray-800">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 border border-gray-300  appearance-none 
                      checked:bg-[url('/public/fl_check_icon.png')] 
                      checked:bg-center 
                      checked:bg-no-repeat 
                      checked:bg-[length:27px]
                      hover:scale-105 active:scale-95 hover:bg-gray-300 transition duration-200"
              />
              <span>
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </span>
              </label>
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
          <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"
              >
                <img src="/fl_google_icon.png" alt="google" className="w-5 h-5" />
                Google
              </button>

              <button
                type="button"
                className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"
              >
                <img src="/fl_facebook_icon.png" alt="facebook" className="w-5 h-5" />
                Facebook
              </button>
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
            <span className="bg-yellow-500 rounded-full p-2"><Search size={30} color="#2d6cdf"/></span>
            <div>
              <h4>Search Lost Items</h4>
              <p>Access our database with powerful filters</p>
            </div>
          </div>

          <div className="feature">
            <span className="bg-yellow-500 rounded-full p-2"><Plus size={30} color="#2d6cdf"/></span>
            <div>
              <h4>Report Found Items</h4>
              <p>Help others by posting items you've found</p>
            </div>
          </div>

          <div className="feature">
            <span className="bg-yellow-500 rounded-full p-2"><Bell size={30} color="#2d6cdf"/></span>
            <div>
              <h4>Get Instant Alerts</h4>
              <p>Receive notifications when items match</p>
            </div>
          </div>
          

          {/* STATS */}
          <div className={`flex gap-6 mb-10 ${visible ? "visible" : ""}`} ref={statsRef} id="reg_cards">
            <StatCard value={12398} label="Items Found" icon={<Package size={35} color="white"/>} isVisible={visible}/>
            <StatCard value={9876} label="Active Users" icon={<Users size={35} color="white"/>} isVisible={visible}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}