import { useState } from "react";
import Input from "../components/Input";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBEFEF] flex items-center justify-center p-6">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Brand Section */}
        <div className="md:w-1/2 bg-[#C5B3D3] p-10 flex flex-col justify-center items-center text-center">

          <div className="text-6xl mb-5">
            🎂
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Sweet Crumbs
          </h1>

          <p className="text-white text-lg">
            Order happiness, one slice at a time 🍰
          </p>

          <p className="text-white/80 mt-5">
            Freshly baked cakes made with love for your special moments.
          </p>

        </div>


        {/* Form Section */}
        <div className="md:w-1/2 bg-[#FFE2E2] p-10">

          <h2 className="text-3xl font-bold text-[#5A4055] mb-2">
            {isSignUp ? "Create Account 🎂" : "Welcome Back 🍰"}
          </h2>

          <p className="text-gray-600 mb-8">
            {isSignUp
              ? "Join Sweet Crumbs and order your favourite cakes."
              : "Login to continue your cake journey."}
          </p>


          <form className="space-y-4">


            {isSignUp && (
              <>
                <Input 
                  placeholder="Full Name"
                  type="text"
                />

                <Input
                  placeholder="Phone Number"
                  type="text"
                />
              </>
            )}


            <Input
              placeholder="Email Address"
              type="email"
            />


            <Input
              placeholder="Password"
              type="password"
            />


            {isSignUp && (
              <Input
                placeholder="Confirm Password"
                type="password"
              />
            )}



            {!isSignUp && (
              <div className="flex justify-between items-center text-sm">

                <label className="flex gap-2 items-center">
                  <input 
                    type="checkbox"
                    className="accent-[#C5B3D3]"
                  />
                  Remember me
                </label>

                <a 
                  href="#"
                  className="text-[#8A6FA8]"
                >
                  Forgot Password?
                </a>

              </div>
            )}



            <button
              className="
              w-full
              bg-[#F5CBCB]
              hover:bg-[#C5B3D3]
              text-[#5A4055]
              font-semibold
              py-3
              rounded-full
              transition
              duration-300
              "
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>


          </form>



          <div className="text-center mt-6 text-gray-700">

            {isSignUp 
              ? "Already have an account?"
              : "Don't have an account?"
            }


            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="
              ml-2
              text-[#8A6FA8]
              font-semibold
              hover:underline
              "
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>

          </div>


        </div>

      </div>

    </div>
  );
}
