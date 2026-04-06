import { Heart, Search, MapPin } from "lucide-react";
import Stats from "./Stats";

function Hero() {
  return (
    <section className="home_hero">
      {/* BACKGROUND BLOBS */}
      <div className="home_blob home_blob_blue"></div>
      <div className="home_blob home_blob_yellow"></div>

      <div className="home_hero_content">


        <p className="home_hero_badge">
          <Heart size={16} color="#4ea1ff" className="inline-block mr-1 mb-1" /> Reuniting people with their belongings
        </p>

        <h1 className="home_hero_title">
          Lost something? <span>We help you</span> find it.
        </h1>

        <p className="home_hero_subtitle">
          A community-driven platform to help you find what you've lost and return what you've found
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-4xl mx-auto px-20" id="home_hero_search">
          
          {/* Item Search Bar - 60% */}
          <div className="w-[60%] backdrop-blur-lg bg-white/10 rounded-full border border-white/20 shadow-xl">
            <div className="flex items-center px-6 py-3">
              <Search className="text-gray-300 mr-3 flex-shrink-0" size={24} />
              <input
                type="text"
                placeholder="Search for your item (e.g. phone, wallet, keys...)"
                className="flex-1 bg-transparent text-white placeholder-gray-400  outline-none "
              />
            </div>
          </div>

          {/* Location Search Bar - 40% */}
          <div className="w-[30%] backdrop-blur-lg bg-white/10 rounded-full border border-white/20 shadow-xl">
            <div className="flex items-center px-6 py-3">
              <MapPin className="text-gray-300 mr-3 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-xl  whitespace-nowrap">
            Search
          </button>

        </div>

        {/* ACTION BUTTONS */}
        <div className="home_hero_actions">
          <button className="home_btn_blue">I Lost an Item</button>
          <button className="home_btn_yellow">I Found an Item</button>
        </div>
        
        <Stats />

      </div>
    </section>
  );
}

export default Hero;