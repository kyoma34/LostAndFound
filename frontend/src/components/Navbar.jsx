import { useNavigate } from "react-router-dom";
import { LogOut, User, CircleUserRound } from "lucide-react";


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
        <a href="/home">Home</a>
        <a href="/home#how-it-works">How It Works</a>
        <a href="/home#recent-items">Recent Posts</a>
        <a href="#">Browse</a>
        <a href="/chat">Contact</a>
      </div>

      <div className="home_user-section">
        <span className="home_username">
          {user?.name || "User"}
        </span>
        <span>
          {user?.avatar || <CircleUserRound size={40}/>}
        </span>
        
        <span className="home_logout">
          <button onClick={handleLogout}>
            <LogOut size={20}/>
            
          </button>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;