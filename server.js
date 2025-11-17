import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import materialRoutes from "./routes/materialRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Serve uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/materials", materialRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("EduConnect Backend Running Successfully");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
