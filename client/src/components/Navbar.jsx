import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 🔤 Name variable defined outside the component
const name = "Abhinaw";

const Button = ({ children, onClick, variant = "outline" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md border ${
        variant === "outline"
          ? "border-cyan-500 text-cyan-400 hover:bg-cyan-900"
          : "bg-cyan-500 text-white"
      } transition duration-200`}
    >
      {children}
    </button>
  );
};

const Avatar = ({ src, fallback }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400 bg-gray-800">
      {src ? (
        <img src={src} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm text-white font-semibold uppercase">
          {fallback}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [user, setUser] = useState(true);
  const avatarUrl = null; // fallback avatar
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="relative z-50 w-full bg-[#0f0f0f] text-white shadow-md border border-cyan-500 rounded-md overflow-hidden">
      {/* Laser border animation */}
      <div className="absolute inset-0 rounded-md pointer-events-none animate-blue-laser-border"></div>

      <div className="flex items-center justify-between px-6 py-4 relative z-10">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          StackIt
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/home" className="hover:text-cyan-400 transition">
              Home
            </Link>

            <span className="text-sm text-gray-400">🔔 Notifications</span>

            <Link to="/profile">
              <Avatar src={avatarUrl} fallback={firstLetter} />
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline" onClick={() => setUser(true)}>
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Laser border animation styles */}
      <style>
        {`
          @keyframes blue-laser-border {
            0% { box-shadow: 0 0 0px 0px rgba(34, 211, 238, 0.6); }
            50% { box-shadow: 0 0 14px 5px rgba(34, 211, 238, 0.95); }
            100% { box-shadow: 0 0 0px 0px rgba(34, 211, 238, 0.6); }
          }

          .animate-blue-laser-border {
            border: 2px solid transparent;
            box-shadow: 0 0 14px 5px rgba(34, 211, 238, 0.5);
            animation: blue-laser-border 2.5s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
