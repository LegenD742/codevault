import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  code: String,
  language: String,
}, { timestamps: true });

export default mongoose.model("Snippet", snippetSchema);