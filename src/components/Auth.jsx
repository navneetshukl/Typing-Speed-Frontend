import React, { useState } from "react";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true); // true = Register, false = Sign In
  const [name, setName] = useState(""); // ✅ FIXED: Added space
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (isRegister) { // ✅ FIXED: was !isRegister
      console.log("Name is ", name);
    }
    console.log("Email is ", email);
    console.log("Password is ", password);
    console.log("Mode:", isRegister ? "Register" : "Sign In");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30">
        {/* Header */}
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p 
            className="text-sm text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors duration-200"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
          </p>
        </div>

        {/* Form */}
        <form className="px-8 pb-8 space-y-6" onSubmit={onFormSubmit}> {/* ✅ FIXED: Added onSubmit */}
          {/* 1. NAME FIELD - DISAPPEARS WHEN SIGNING IN */}
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border-2 bg-white/60 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100/50 transition-all duration-200"
                value={name} // ✅ Added value
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* 2. EMAIL FIELD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 bg-white/60 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100/50 transition-all duration-200"
              value={email} // ✅ Added value
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 3. PASSWORD FIELD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 bg-white/60 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100/50 transition-all duration-200"
              value={password} // ✅ Added value
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 hover:from-emerald-600 hover:via-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-lg"
          >
            {isRegister ? "Register" : "Sign In"}
          </button>
        </form>

        {/* Guest Option */}
        <div className="px-8 pb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/80 text-slate-400">or</span>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full flex items-center justify-center py-3 px-6 border-2 border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100/50"
            onClick={onFormSubmit} // ✅ FIXED: Removed ()
          >
            👤 Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;