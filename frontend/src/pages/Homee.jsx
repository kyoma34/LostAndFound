import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import RecentItems from "../components/RecentItems";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

function Homee() {
  return (
    <div className="home_body" id="home">
      <Navbar />
      <Hero />
      <HowItWorks />
      <RecentItems />
      <Footer />
      <FloatingButton />
    </div>
  );
}

export default Homee;