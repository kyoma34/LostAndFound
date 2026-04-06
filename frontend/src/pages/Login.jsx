import { useState ,useEffect, useRef} from "react";
import { Eye, EyeOff, Mail, Lock, Package, Users } from "lucide-react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

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
    <div className="log_card flex-1 rounded-2xl p-7 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">
      <div className="home_stats_icon">{icon}</div>
      <h2 className="text-4xl font-bold text-yellow-400">{count.toLocaleString()}</h2>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}




function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" id="log_body">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-8 md:p-12">

          {/* LOGO */}
          <div className="mb-8">
            <img src="/logo.png" alt="logo" className="h-14 md:h-16" />
          </div>

          {/* CENTERED TEXT */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-black-800">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3.5 
                  bg-gray-100/80 
                  rounded-xl 
                  outline-none 
                  border border-transparent 
                  focus:border-blue-400 
                  focus:bg-gray-50 
                  transition-all duration-200"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-black-800">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3.5 
                  bg-gray-100/80 
                  rounded-xl 
                  outline-none 
                  border border-transparent 
                  focus:border-blue-400 
                  focus:bg-gray-50 
                  transition-all duration-200"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex justify-between items-center text-sm my-2">
              <label id="log_rem_text" className="flex items-center gap-2 font-medium text-gray-800">
               <input
                    type="checkbox" id="log_remember"
                    className="w-5 h-5 border border-gray-300 bg-gray-100 appearance-none 
                      checked:bg-[url('/public/fl_check_icon.png')] 
                      checked:bg-center 
                      checked:bg-no-repeat 
                      checked:bg-[length:27px]
                      hover:scale-105 active:scale-95 hover:bg-gray-200 transition duration-200"
                />
                <span>Remember me</span>
              </label>

              <span className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200">
                Forgot password?
              </span>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">Or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                <img src="/fl_google_icon.png" alt="google" className="w-5 h-5" />
                Google
              </button>

              <button
                type="button"
                className="flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                <img src="/fl_facebook_icon.png" alt="facebook" className="w-5 h-5" />
                Facebook
              </button>
            </div>

            {/* SIGN UP */}
            <p className="text-center text-sm mt-4 text-slate-600">
              Don't have an account?{" "}
              <span
                  onClick={() => navigate("/register")}
                  className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200"
                ></span>
              <span className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200">
                <a href="/register">Sign up</a>
              </span>
            </p>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center" id="log_right_side">

          <h2 className="font-semibold mb-4 leading-tight" id="log_reun">
            Reuniting People with <div>Their Belongings</div>
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of users who trust our platform to find what matters most.
            Our community-driven approach has helped recover countless lost items.
          </p>

          {/* STATS */}
          <div className={`flex gap-6 mb-10 ${visible ? "visible" : ""}`} ref={statsRef} id="log_cards">
            <StatCard value={12398} label="Items Found" icon={<Package size={35} color="white"/>} isVisible={visible}/>
            <StatCard value={9876} label="Active Users" icon={<Users size={35} color="white"/>} isVisible={visible}/>
          </div>

          {/* FEATURES */}
          <div className="space-y-4 font-regular">
            <div className="flex items-center gap-3">
              <img src="/fl_ok_icon.png" alt="ok" className="w-10 h-10" />
              <span>Secure and private communication</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/fl_ok_icon.png" alt="ok" className="w-10 h-10" />
              <span>24/7 support available</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/fl_ok_icon.png" alt="ok" className="w-10 h-10" />
              <span>Free to use, always</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;