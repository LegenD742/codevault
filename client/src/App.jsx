import { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Snippet from "./components/Snippet.jsx";
import { getSnippets, deleteSnippet } from "./services/snippetApi";
import Herographic from "./components/Herographic.jsx";

const App = () => {
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [show, setShow] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex flex-col h-screen bg-[#0B132B] text-white relative">
      
      <Toaster position="top-right" />

      <Header setShow={setShow} setSidebarOpen={setSidebarOpen} />

      
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      
      <div className="flex flex-1 overflow-hidden relative">


        <Sidebar 
          snippets={snippets}
          setSelectedSnippet={(snippet) => {
            setSelectedSnippet(snippet);
            setSidebarOpen(false); 
          }}
          selectedSnippet={selectedSnippet}
          handleDelete={handleDelete}
          setEditingSnippet={setEditingSnippet}
          setShow={setShow}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        
        <div className="flex-1 p-2 md:p-4">
          <div className="h-full rounded-xl bg-[#1C2541] p-4 overflow-hidden">

            {selectedSnippet ? (
              <pre className="text-sm whitespace-pre-wrap overflow-auto h-full">
                {selectedSnippet.code || "// No code yet"}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
                <Herographic />
                <p className="text-gray-400 text-sm md:text-base">
                  Select or create a snippet 🚀
                </p>
              </div>
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