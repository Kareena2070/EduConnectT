import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";
import Material from "../models/Material.js";

const router = express.Router();

// Configure multer to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // backend/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload material with file
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const fileUrl = req.file.path; // multer gives file path

    const material = await Material.create({
      title,
      subject,
      description,
      fileUrl,
      uploadedBy: req.user._id,
    });

    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find().populate("uploadedBy", "name email");
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
