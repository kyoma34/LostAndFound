import { useEffect, useRef, useState } from "react";
import { Package, Check, Users, TrendingUp } from "lucide-react";

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
    <div className="home_stats_card">
      <div className="home_stats_icon">{icon}</div>
      <h2 className="text-4xl font-bold text-yellow-400">{count.toLocaleString()}</h2>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}

function Stats() {
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

  return (

    <div className={`home_stats ${visible ? "visible" : ""}`} ref={statsRef}>
      <StatCard value={12456} label="Items Posted" icon={<Package size={40} color="#5482E3"/>} isVisible={visible} />
      <StatCard value={8234} label="Items Returned" icon={<Check size={40} color="#5482E3"/>} isVisible={visible} />
      <StatCard value={45678} label="Active Users" icon={<Users size={40} color="#5482E3"/>} isVisible={visible} />
      <StatCard value={89} label="Success Rate (%)" icon={<TrendingUp size={40} color="#5482E3"/>} isVisible={visible} />
    </div>
  );
}

export default Stats;
export { StatCard };