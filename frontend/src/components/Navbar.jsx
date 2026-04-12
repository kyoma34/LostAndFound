import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect after logout
  };

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

      <div className="home_user-section">
        <span className="home_username">
          {user?.name || "User"}
        </span>

        <button className="home_logout" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;