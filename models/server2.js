require("dotenv").config(); // ✅ Load environment variables only once

console.log("MONGO_URI:", process.env.MONGO_URI);

import express from ("express");
import mongoose from ("mongoose");
import cors from ("cors");
import path from ("path");
import http from ("http");
import helmet from ("helmet");
import morgan from ("morgan");
import socketIo from ("socket.io");
import dbconnection from ("./dbconfig/index.js");

// Initialize Express App
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve Static Files (✅ Moved Above Routes)
app.use(express.static(path.join(__dirname, "views")));

// Database Connection
dbconnection(); // ✅ No need to manually connect mongoose again

// Import Routes
const postRoutes = require("./routes/postroutes.js");
app.use("/api/posts", postRoutes);

// WebSockets (Socket.io)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Login Page Route (✅ Fixed Undefined Variable)
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Start Server (✅ Removed Duplicate `app.listen`)
const PORT = process.env.PORT || 40066;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
