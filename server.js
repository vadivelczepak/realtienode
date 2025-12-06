const express = require("express");
const admin = require("./firebase");

const app = express();
app.use(express.json());

// Realtime Database
const db = admin.database();

// Test route
app.get("/", (req, res) => {
  res.send("Render + Firebase Connected!");
});

// Write test data
app.get("/test-write", async (req, res) => {
  await db.ref("test").set({ message: "Hello from Render!" });
  res.send("Data written!");
});

// Read test data
app.get("/test-read", async (req, res) => {
  const snap = await db.ref("test").once("value");
  res.json(snap.val());
});

// Correct Render port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));
