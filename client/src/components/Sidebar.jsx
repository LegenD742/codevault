import React from 'react'
import Icon from './Icon';
import { Trash2, Pencil, X } from "lucide-react";

const Sidebar = ({ 
  snippets, 
  setSelectedSnippet, 
  selectedSnippet, 
  handleDelete,
  setEditingSnippet,
  setShow,
  sidebarOpen,
  setSidebarOpen
}) => {

  const groupedSnippets = {
    js: [],
    cpp: [],
    java: []
  };

  snippets.forEach(s => {
    if (groupedSnippets[s.language]) {
      groupedSnippets[s.language].push(s);
    }
  });

  return (
    <div
      className={`
        fixed md:static top-0 left-0 h-full z-50
        w-64 bg-[#1C2541] p-4 overflow-y-auto
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >

      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#00D1FF]">
            Snippets
          </h2>
        </div>

        {/* Close button (mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-white"
        >
          <X size={22} />
        </button>

      </div>

      {/* Snippets */}
      {Object.keys(groupedSnippets).map((lang) => (
        <div key={lang} className="mb-4">

          <h3 className="text-sm uppercase text-[#3A86FF] mb-2">
            {lang}
          </h3>

          {groupedSnippets[lang].map((snippet) => (
            <div
              key={snippet._id}
              className={`group flex justify-between items-center p-2 rounded-lg cursor-pointer transition
                ${selectedSnippet?._id === snippet._id
                  ? "bg-[#3A86FF]/20 border border-[#3A86FF]"
                  : "hover:bg-[#0B132B]"
                }
              `}
            >
              {/* Select */}
              <span
                onClick={() => {
                  setSelectedSnippet(snippet);
                  setSidebarOpen(false); // 🔥 auto close on mobile
                }}
                className="flex-1"
              >
                {snippet.title}
              </span>

              {/* Icons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">

                {/* Edit */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSnippet(snippet);
                    setShow(true);
                  }}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <Pencil size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(snippet._id);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>
      ))}

    </div>
  )
}

export default Sidebar;