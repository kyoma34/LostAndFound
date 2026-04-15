import { useEffect, useState } from "react";
import { User, MapPin, Clock4, Tag } from "lucide-react";
import { getPosts } from "../api/posts";

function RecentItems() {
  const [items, setItems] = useState([]);

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
                <p className="home_item_time">
                  {new Date().getDate() - new Date(item.createdAt).getDate() === 0 ? `${new Date().getHours() - new Date(item.createdAt).getHours() === 0 ? `${new Date().getMinutes() - new Date(item.createdAt).getMinutes() === 0 ? "Just now" : `${new Date().getMinutes() - new Date(item.createdAt).getMinutes()} minutes ago`}` : `${new Date().getHours() - new Date(item.createdAt).getHours()} hours ago`}` : `${new Date().getDate() - new Date(item.createdAt).getDate()} days ago`}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      <button className="home_view_all">View All Items</button>
    </section>
  );
}

export default RecentItems;