const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Root test
app.get("/", (req, res) => {
  res.send("Node API working!");
});

// Example GET API
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "John Doe" }, { id: 2, name: "Mary" }]);
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
