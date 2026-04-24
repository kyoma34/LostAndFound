import { useEffect, useState } from "react";
import { User, MapPin, Clock4, Tag } from "lucide-react";
import { getPosts } from "../api/posts";
import "../index.css";

// ── Modal icons ──
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// ── Time formatter ──
function timeAgo(dateStr) {
  const now = new Date();
  const created = new Date(dateStr);
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

// ── Modal ──
function Modal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const imageUrl = item.image
    ? `http://localhost:5000/${item.image}`
    : "/home_recent_phone.jpg";

  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="lf-overlay" onClick={onClose}>
      <div className="lf-modal" onClick={(e) => e.stopPropagation()}>

        {/* Blue header */}
        <div className="lf-modal-header">
          <button className="lf-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Item photo */}
        <img className="lf-modal-img" src={imageUrl} alt={item.title} />

        {/* Scrollable body */}
        <div className="lf-modal-scroll">
          <div className="lf-modal-body">
            <div className="lf-modal-pill">{item.type}</div>
            <h2 className="lf-modal-title">{item.title}</h2>
            <p className="lf-modal-desc">{item.description}</p>

            <div className="lf-modal-meta-row">
              <span className="lf-modal-meta-icon"><IconPin /></span>
              <span className="lf-modal-meta-label">Location:</span>
              <span className="lf-modal-meta-value">{item.location}</span>
            </div>

            <div className="lf-modal-meta-row">
              <span className="lf-modal-meta-icon"><IconCalendar /></span>
              <span className="lf-modal-meta-label">Date:</span>
              <span className="lf-modal-meta-value">{formattedDate}</span>
            </div>

            <div className="lf-modal-meta-row">
              <span className="lf-modal-meta-icon"><IconClock /></span>
              <span className="lf-modal-meta-label">Posted:</span>
              <span className="lf-modal-meta-value">{timeAgo(item.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="lf-modal-footer">
          <div className="lf-modal-poster">
            <div className="lf-modal-avatar-initials">
              {item.createdBy?.name?.charAt(0) || "?"}
            </div>
            <div>
              <div className="lf-modal-posted-label">Posted by</div>
              <div className="lf-modal-poster-name">
                {item.createdBy?.name || "Unknown"}
              </div>
            </div>
          </div>
          <button className="lf-modal-contact-btn">
            <IconPhone />
            Contact
          </button>
        </div>

      </div>
    </div>
  );
}

// ── RecentItems ──
function RecentItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="home_recent" id="recent-items">
      <h2>
        Recent <span>Items</span>
      </h2>

      <p className="home_recent_p">
        Browse the latest lost and found items in your area
      </p>

      <div className="home_recent_grid">
        {items.slice(0, 6).map((item) => (
          <div
            key={item._id}
            className="home_item_card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="home_item_img">
              <img
                src={
                  item.image
                    ? `http://localhost:5000/${item.image}`
                    : "/home_recent_phone.jpg"
                }
                alt={item.title}
              />

              <span className="home_item_user">
                <User size={20} />
                {item.createdBy?.name || "Unknown"}
              </span>

              <span
                className={`home_item_status ${
                  item.status === "unclaimed" ? "unclaimed" : "claimed"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="home_item_content">
              <div className="home_item_category">
                <Tag size={12} />
                <p>{item.type}</p>
              </div>

              <h3>{item.title}</h3>

              <div className="home_item_inline">
                <MapPin size={15} color="#666" />
                <p className="home_item_location">{item.location}</p>
              </div>

              <div className="home_item_inline">
                <Clock4 size={15} color="#666" />
                <p className="home_item_time">{timeAgo(item.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="home_view_all">View All Items</button>

      {/* Modal — renders on top when a card is clicked */}
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}

export default RecentItems;