import { User, MapPin, Clock4, Tag} from "lucide-react";

function RecentItems() {
  const items = [
    {
      id: 1,
      user: "John Doe",
      avatar: <User size={20}/>,
      title: "iPhone 13 Pro",
      category: "Electronics",
      status: "Lost",
      location: "Downtown",
      time: "2 hours ago",
      img: "/home_recent_phone.jpg"
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: <User size={20}/>,
      title: "Black Wallet",
      category: "Accessories",
      status: "Found",
      location: "City Mall",
      time: "5 hours ago",
      img: "/home_recent_phone.jpg"
    },
    {
      id: 3,
      user: "Alice Johnson",
      avatar: <User size={20}/>,
      title: "Car Keys",
      category: "Keys",
      status: "Lost",
      location: "Parking Lot",
      time: "1 day ago",
      img: "/home_recent_phone.jpg"
    },
    {
      id: 4,
      user: "Bob Brown",
      avatar: <User size={20}/>,
      title: "Gold Necklace",
      category: "Jewelry",
      status: "Found",
      location: "Beach",
      time: "2 days ago",
      img: "/home_recent_phone.jpg"
    },
    {
      id: 5,
      user: "Charlie Davis",
      avatar: <User size={20}/>,
      title: "Backpack",
      category: "Bags",
      status: "Lost",
      location: "University Campus",
      time: "3 days ago",
      img: "/home_recent_phone.jpg"
    },
    {
      id: 6,
      user: "Emily Wilson",
      avatar: <User size={20}/>,
      title: "Silver Ring",
      category: "Jewelry",
      status: "Found",
      location: "Park",
      time: "4 days ago",
      img: "/home_recent_phone.jpg"
    }
  ];

  return (
    <section className="home_recent" >
      <h2>
        Recent <span>Items</span>
      </h2>

      <p className="home_recent_p">Browse the latest lost and found items in your area</p>

      <div className="home_recent_grid">
        {items.map((item) => (
          <div key={item.id} className="home_item_card">
            
            <div className="home_item_img">
              <img src={item.img} alt={item.title} />

              <span className="home_item_user">
                {item.avatar}
                {item.user}
              </span>

              <span
                className={`home_item_status ${
                  item.status === "Lost" ? "lost" : "found"
                }`}
              >
                
              </span>
            </div>

            <div className="home_item_content">
              <div className="home_item_category">
                <Tag size={12}/>
                <p>{item.category}</p>
              </div>
              <h3>{item.title}</h3>
              <div className="home_item_inline">
                <MapPin size={15} color="#666" className="mb-1"/>
                <p className="home_item_location"> {item.location}</p>
              </div>

              <div className="home_item_inline">
                <Clock4 size={15} color="#666" className="mb-1"/>
                <p className="home_item_time">{item.time}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      <button  className="home_view_all">View All Items</button>
    </section>
  );
}

export default RecentItems;