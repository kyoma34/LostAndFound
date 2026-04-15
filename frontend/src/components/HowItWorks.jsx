import { useState } from "react";
import { CheckCircle, MessageCircle, Search, Upload } from "lucide-react";

function HowItWorks() {
  const [active, setActive] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Post Your Item",
      desc: "Found something? Post details and photos to help the owner identify it.",
      icon: <Upload size={40} fontWeight={500}/>
    },
    {
      id: 2,
      title: "Search & Browse",
      desc: "Lost something? Search through posted items by category and location.",
      icon: <Search size={40} fontWeight={500}/>
    },
    {
      id: 3,
      title: "Connect",
      desc: "Match found and get in touch with the finder securely.",
      icon: <MessageCircle size={40} fontWeight={100}/>
    },
    {
      id: 4,
      title: "Reunite",
      desc: "Arrange a safe meetup and reunite items with their rightful owners.",
      icon: <CheckCircle size={40} fontWeight={500}/>
    }
  ];

  return (
    <section className="home_how" id="how-it-works">
      <h2>
        How It <span>Works</span>
      </h2>
      <p className="home_how_sub">
        Four simple steps to recover your lost items or help others find theirs
      </p>

      <div className="home_how_container">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`home_how_card ${
              active === step.id ? "active" : ""
            }`}
            onMouseEnter={() => setActive(step.id)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="home_how_icon">{step.icon}</div>

            <div className={`home_how_number ${active === step.id ? "yellow" : ""}`}>
              {step.id}
            </div>

            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;