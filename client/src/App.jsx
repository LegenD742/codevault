import { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Snippet from "./components/Snippet.jsx";
import { useEffect } from "react";
import { getSnippets } from "./services/snippetApi";
import { deleteSnippet } from "./services/snippetApi";

const App = () => {
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [show, setShow] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
  fetchSnippets();
}, []);

const fetchSnippets = async () => {
  try {
    const res = await getSnippets();
    setSnippets(res.data);
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = async (id) => {
  try {
    console.log("Deleting:", id); 

    await deleteSnippet(id);

    await fetchSnippets(); 

    if (selectedSnippet?._id === id) {
      setSelectedSnippet(null);
    }

  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <div className="flex flex-col h-screen bg-[#0B132B] text-white">
      <Toaster position="top-right" />

      <Header setShow={setShow} />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar 
  snippets={snippets}
  setSelectedSnippet={setSelectedSnippet}
  selectedSnippet={selectedSnippet}
  handleDelete={handleDelete}
  setEditingSnippet={setEditingSnippet}
  setShow={setShow}
/>

        <div className="flex-1 p-4">
          <div className="h-full rounded-xl bg-[#1C2541] p-4 overflow-hidden">
            
            {selectedSnippet ? (
              <pre className="text-sm whitespace-pre-wrap overflow-auto h-full">
  {selectedSnippet.code || "// No code yet"}
</pre>
            ) : (
              <p className="text-gray-400">
                Select a snippet 🚀
              </p>
            )}

          </div>
        </div>

      </div>

      {show && (
  <Snippet
    setShow={setShow}
    snippets={snippets} 
    editingSnippet={editingSnippet}
    setEditingSnippet={setEditingSnippet}
    setSelectedSnippet={setSelectedSnippet} 
    fetchSnippets={fetchSnippets}
  />
)}

      <Footer />
    </div>
  );
};

export default App;