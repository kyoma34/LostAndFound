//import "./Navbar.css";

function Navbar() {
  return (
    <nav className="home_navbar">
      <div className="home_logo">
        <img src="/logo.png" alt="logo" className="home_logo-image" />
      </div>

      <div className="home_nav-links">
        <a href="#">Home</a>
        <a href="#">How It Works</a>
        <a href="#">Recent Posts</a>
        <a href="#">Browse</a>
        <a href="#">Contact</a>
      </div>

      <div className="home_auth-buttons">
        <button className="home_signup">Sign Up</button>
        <button className="home_login">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;