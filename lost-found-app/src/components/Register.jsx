import React from "react";
import "../style/register.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/icons8-zoom-in-48.png";
import plusIcon from "../assets/icons8-plus-48.png";
import alarmIcon from "../assets/icons8-alarm-in-48.png";

export default function Register() {
  return (
    
    <div className="container">
      
      {/* LEFT SIDE */}
      <div className="left">
        
        <div className="logo">
          <img src={logo} alt="logo" width={500} />

        </div>
        <h2 className="title">Create Account</h2>
<p className="subtitle">
  Join our community and start finding lost items
</p>


        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />

          <div className="checkbox">
            <input type="checkbox" />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </div>

          <button className="main-btn">Create Account</button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span></span>
          <p>Or sign up with</p>
          <span></span>
        </div>

        {/* Social */}
        <div className="social">
          <button>Google</button>
          <button>Facebook</button>
        </div>

        <p className="signin">
          Already have an account? <a href="#">Sign in</a>
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
          <span><img src={searchIcon} alt="Search" width="38" height="38" /></span>
          <div>
            <h4>Search Lost Items</h4>
            <p>Access our database with powerful filters</p>
          </div>
        </div>

        <div className="feature">
          <span><img src={plusIcon} width={38} height={38} /></span>
          <div>
            <h4>Report Found Items</h4>
            <p>Help others by posting items you've found</p>
          </div>
        </div>

        <div className="feature">
          <span><img src={alarmIcon} width={38} height={38} /></span>
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