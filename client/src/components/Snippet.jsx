import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createSnippet, updateSnippet } from "../services/snippetApi";

const Snippet = ({
  setShow,
  snippets,
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
    console.log("CLICKED SAVE");

    if (!title.trim() || !code.trim()) {
      toast.error("Title and code BOTH are required!");
      return;
    }

    const exists = snippets.some(
      s =>
        s.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        s._id !== editingSnippet?._id
    );

    if (exists) {
      toast.error("Snippet with this name already exists!");
      return;
    }

    try {
      if (editingSnippet) {
        
        const res = await updateSnippet(editingSnippet._id, {
          title,
          language,
          code
        });

        setSelectedSnippet(res.data);
        toast.success("Snippet updated ✏️");

      } else {
        
        const res = await createSnippet({
          title,
          language,
          code
        });

        setSelectedSnippet(res.data);
        toast.success("Snippet added 🚀");
      }

      await fetchSnippets();

      setEditingSnippet(null);
      setShow(false);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#1C2541] p-6 rounded-xl w-[80vw] max-w-5xl h-[80vh] flex flex-col shadow-[0_0_30px_rgba(58,134,255,0.2)]">

        <h2 className="text-2xl mb-4 text-[#00D1FF] font-semibold">
          {editingSnippet ? "Edit Snippet ✏️" : "Add Snippet ⚡"}
        </h2>

        <div className="flex gap-4 mb-4">

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 rounded bg-[#0B132B] outline-none focus:ring-2 focus:ring-[#3A86FF]"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-40 p-2 rounded bg-[#0B132B] outline-none"
          >
            <option value="js">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

        </div>

        <textarea
          placeholder="Paste your code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-3 rounded bg-[#0B132B] font-mono text-sm resize-none outline-none focus:ring-2 focus:ring-[#3A86FF]"
        />

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={() => {
              setEditingSnippet(null);
              setShow(false);
            }}
            className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#3A86FF] rounded-lg hover:bg-[#00D1FF] transition"
          >
            {editingSnippet ? "Update" : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Snippet;