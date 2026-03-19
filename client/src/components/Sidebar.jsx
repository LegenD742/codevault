import React from 'react'
import { Trash2, Pencil } from "lucide-react";

const Sidebar = ({ 
  snippets, 
  setSelectedSnippet, 
  selectedSnippet, 
  handleDelete,
  setEditingSnippet,
  setShow
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
    <div className="w-64 bg-[#1C2541] text-white p-4 h-full overflow-y-auto">

      <h2 className="text-lg font-semibold mb-4 text-[#00D1FF]">
        Snippets
      </h2>

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
                onClick={() => setSelectedSnippet(snippet)}
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