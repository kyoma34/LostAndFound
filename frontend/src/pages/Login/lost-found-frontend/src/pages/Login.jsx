import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

// IMPORT YOUR ASSETS
import logo from "../assets/logo.png";
import googleIcon from "../assets/google_icon.png";
import facebookIcon from "../assets/facebook_icon.png";
import okIcon from "../assets/ok_icon.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          
          {/* LOGO */}
          <div className="mb-8">
            <img src={logo} alt="logo" className="h-14 md:h-16" />
          </div>

          {/* CENTERED TEXT */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-5">
            
            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-black-800">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
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
              <label id="rem_text" className="flex items-center gap-2 text-medium font-medium text-gray-800">
  
                <input
                    type="checkbox" id="remember"
                    className="w-5 h-5 border border-gray-300 bg-gray-100 appearance-none 
                      checked:bg-[url('/src/assets/check_icon.png')] 
                      checked:bg-center 
                      checked:bg-no-repeat 
                      checked:bg-[length:27px]
                      hover:scale-105 active:scale-95 hover:bg-gray-200 transition duration-200"
                />

                <span>Remember me</span>

              </label>

              <span className="text-blue-500 cursor-pointer  hover:text-blue-700 transition duration-200">
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <button className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg">
              Sign In
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">Or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* SOCIAL BUTTONS WITH ICONS */}
            <div className="flex gap-4">
              <button className="flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <img src={googleIcon} alt="google" className="w-5 h-5" />
                Google
              </button>

              <button className="flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <img src={facebookIcon} alt="facebook" className="w-5 h-5" />
                Facebook
              </button>
            </div>

            {/* SIGN UP */}
            <p className="text-center text-sm mt-4 text-slate-600">
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200">
                Sign up
              </span>
            </p>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center" id="right_side">
          
          <h2 className=" font-semibold mb-4 leading-tight" id="reun">
            Reuniting People with <div>Their Belongings</div> 
          </h2>



          {/* FIXED FULL PARAGRAPH */}
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of users who trust our platform to find what matters most. 
            Our community-driven approach has helped recover countless lost items.
          </p>

          {/* BIGGER STATS */}
            <div className="flex gap-6 mb-10" id="cards">
  
                <div className="flex-1 rounded-2xl p-7 
                    bg-white/10 backdrop-blur-lg 
                    border border-white/20 
                    shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">

                    <p className="text-4xl font-medium text-yellow-400 tracking-tight">
                    12,547
                    </p>

                    <p className="text-sm text-blue-100 mt-2">
                    Items Found
                    </p>
                </div>

                <div className="flex-1 rounded-2xl p-7 
                    bg-white/10 backdrop-blur-lg 
                    border border-white/20 
                    shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">

                    <p className="text-4xl font-medium text-yellow-400 tracking-tight">
                    8,392
                    </p>

                    <p className="text-sm text-blue-100 mt-2">
                    Active Users
                    </p>
                </div>

            </div>

          {/* FEATURES WITH IMAGE ICON */}
          <div className="space-y-4 text-medium  font-regular">
            
            <div className="flex items-center gap-3">
              <img src={okIcon} alt="ok" className="w-10 h-10" />
              <span>Secure and private communication</span>
            </div>

            <div className="flex items-center gap-3">
              <img src={okIcon} alt="ok" className="w-10 h-10" />
              <span>24/7 support available</span>
            </div>

            <div className="flex items-center gap-3">
              <img src={okIcon} alt="ok" className="w-10 h-10" />
              <span>Free to use, always</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;