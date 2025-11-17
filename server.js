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
// CORS configuration: allow localhost during development and the deployed frontend in production.
// Read allowed frontend origin from env so you can set it in Vercel (FRONTEND_URL).
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: (origin, callback) => {
      // origin is undefined for same-origin requests or some server-side tools — allow those
      if (!origin) return callback(null, true);

      const allowed = [FRONTEND_URL, "https://edu-connect-f.vercel.app"];
      if (allowed.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Ensure preflight (OPTIONS) requests receive the CORS headers
app.options("*", cors());
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
