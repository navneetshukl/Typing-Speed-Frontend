import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session / token
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <div className="flex-shrink-0 font-bold text-xl cursor-pointer">
            <Link to="/">TypeMaster Pro</Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/dashboard"
              className="hover:text-gray-200 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/typing"
              className="hover:text-gray-200 transition-colors"
            >
              Typing Test
            </Link>
            <Link
              to="/profile"
              className="hover:text-gray-200 transition-colors"
            >
              Profile
            </Link>
          </nav>

          {/* User / Logout */}
          <div className="flex items-center space-x-4">
            {user && <span className="hidden md:block">Hi, {user.name}</span>}
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl text-sm transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
