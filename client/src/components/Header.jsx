import { motion } from "framer-motion";
import React from 'react'

const Header = ({ setShow }) => {
  return (
    <header className="bg-[#0B132B] text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-[#1C2541]">
      
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-[#3A86FF]"
      >
        CodeVault ⚡
      </motion.h1>

      <div className="flex items-center gap-4">
        
        <input
          type="text"
          placeholder="Search snippets..."
          className="bg-[#1C2541] px-4 py-2 rounded-lg outline-none text-sm focus:ring-2 focus:ring-[#00D1FF]"
        />

        <button
          onClick={() => setShow(true)}
          className="bg-[#3A86FF] hover:bg-[#00D1FF] transition px-4 py-2 rounded-lg font-semibold"
        >
          + Add Snippet
        </button>

      </div>
    </header>
  )
}

export default Header