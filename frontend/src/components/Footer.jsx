import { Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="home_footer">

      <div className="home_footer_container">

        <div className="home_footer_logo">
          <img src="/logo.png" alt="Lost & Found" width="140" height="40" className="brightness-0 invert" />
          <p>Connecting communities to reunite lost <br /> items with their owners. Simple, fast, and <br /> effective.</p>
          <div className="home_footer_social">
            <a href="#">
            <img src="/home_icon_facebook.png" alt="Facebook" />
            </a>
            <a href="#">
            <img src="/home_icon_twitter.png" alt="Twitter" />
            </a>
            <a href="#">
              <img src="/home_icon_instagram.png" alt="Instagram" />
            </a>
          </div>
        </div>

        <div className="home_footer_links1">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">Browse Items</a>
          <a href="#">How It Works</a>
          <a href="#">About Us</a>
        </div>

        <div className="home_footer_links2">
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <div className="home_footer_links3">
          <h4>Contact</h4>
          <div className="home_item_inline">
            <Mail size={16} className="mb-2" color="#ccc"/>
            <p>Email: support@lostfound.com</p> 
          </div>
          <div className="home_item_inline">
            <Phone size={16} className="mb-2" color="#ccc"/>
            <p>+216 00 000 000</p>
          </div>
          <div className="home_item_inline">
            <Phone size={16} className="mb-2" color="#ccc"/>
            <p>67 Houmet Hammem, Mourouj1</p>
          </div>
          
          <p></p>
        </div>

      </div>

      <p className="home_footer_bottom">
        © 2026 Lost & Found. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;