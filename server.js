const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Example: GET users
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Maria" }
  ]);
});

// Example: POST user
app.post("/api/users", (req, res) => {
  const user = req.body;
  res.json({
    message: "User received",
    user
  });
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
