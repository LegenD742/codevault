import Snippet from "../models/Snippet.js";

export const getSnippets = async (req, res) => {
  try {
    console.log("GET /api/snippets HIT");

    const snippets = await Snippet.find();

    console.log("Snippets fetched:", snippets.length);

    res.json(snippets);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.create(req.body);
    res.json(snippet);
  } catch (err) {
    res.status(400).json({ error: "Duplicate title" });
  }
};

export const updateSnippet = async (req, res) => {
  const snippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(snippet);
};

export const deleteSnippet = async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};