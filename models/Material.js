import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  description: String,
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
},
{ timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);
export default Material;
