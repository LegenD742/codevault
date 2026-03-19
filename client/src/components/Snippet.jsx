import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createSnippet, updateSnippet } from "../services/snippetApi";

const Snippet = ({
  setShow,
  snippets = [],
  editingSnippet,
  setEditingSnippet,
  setSelectedSnippet,
  fetchSnippets
}) => {

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("js");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setLanguage(editingSnippet.language);
      setCode(editingSnippet.code);
    } else {
      setTitle("");
      setLanguage("js");
      setCode("");
    }
  }, [editingSnippet]);

 const handleSubmit = async () => {

  if (!title.trim() || !code.trim()) {
    toast.error("Title and code are required!");
    return;
  }

  const exists = snippets.some(
    s =>
      s.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      s._id !== editingSnippet?._id
  );

  if (exists) {
    toast.error("Snippet with same name exists!");
    return;
  }

  try {
    let res;

    if (editingSnippet) {
      // 🔥 UPDATE
      res = await updateSnippet(editingSnippet._id, {
        title,
        language,
        code
      });

      toast.success("Snippet updated!");

      // keep it selected after update
      setSelectedSnippet(res.data);

    } else {
      // 🔥 CREATE
      res = await createSnippet({
        title,
        language,
        code
      });

      toast.success("Snippet created!");

      // auto select new snippet
      setSelectedSnippet(res.data);
    }

    await fetchSnippets();

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong!");
  }

  setEditingSnippet(null);
  setShow(false);
};

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2">

      {/* Modal */}
      <div className="
        bg-[#1C2541] rounded-xl w-full h-full 
        md:w-[80vw] md:max-w-5xl md:h-[80vh]
        flex flex-col overflow-hidden
      ">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#0B132B]">
          <h2 className="text-lg md:text-2xl text-[#00D1FF] font-semibold">
            {editingSnippet ? "Edit Snippet ✏️" : "Add Snippet ⚡"}
          </h2>

          <button
            onClick={() => {
              setEditingSnippet(null);
              setShow(false);
            }}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-3 md:p-4 overflow-auto">

          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-3">

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-2 rounded bg-[#0B132B] outline-none"
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full md:w-40 p-2 rounded bg-[#0B132B]"
            >
              <option value="js">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>

          </div>

          {/* Code Area */}
          <textarea
            placeholder="Paste your code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="
              flex-1 p-3 rounded bg-[#0B132B] font-mono text-sm resize-none
              min-h-50 md:min-h-75
            "
          />

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 md:gap-3 p-3 md:p-4 border-t border-[#0B132B]">

          <button
            onClick={() => {
              setEditingSnippet(null);
              setShow(false);
            }}
            className="px-3 md:px-4 py-2 bg-gray-600 rounded-lg text-sm md:text-base"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 md:px-4 py-2 bg-[#3A86FF] rounded-lg hover:bg-[#00D1FF] transition text-sm md:text-base"
          >
            {editingSnippet ? "Update" : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Snippet;