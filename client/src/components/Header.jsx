import { motion } from "framer-motion";
import Logo from "./Logo.jsx";
import { Menu } from "lucide-react";
import React from "react";

const Header = ({ setShow, setSidebarOpen }) => {
  return (
    <header className="bg-[#0B132B] text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-lg border-b border-[#1C2541]">

      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-3">
        
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-white"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <Logo />
        </motion.div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Search (hidden on small screens) */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block bg-[#1C2541] px-4 py-2 rounded-lg outline-none text-sm focus:ring-2 focus:ring-[#00D1FF]"
        />

        {/* Add Button */}
        <button
          onClick={() => setShow(true)}
          className="bg-[#3A86FF] hover:bg-[#00D1FF] transition px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base"
        >
          + Add
        </button>

      </div>
    </header>
  );
};

export default Header;