// backend/server.js

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config();
const app = express();

console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

if (process.env.NODE_ENV === "production") {
  console.log("Serving static files from:", path.join(__dirname, "public"));
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    console.log("Serving index.html for:", req.path);
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api/tasks`);
});
