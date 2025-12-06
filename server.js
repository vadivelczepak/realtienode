const express = require("express");
const db = require("./firebase");

const app = express();
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Render + Firebase Connected!");
});

// Write test data
app.get("/test-write", async (req, res) => {
  await db.ref("t_realtie_user").set({ message: "Hello from Render!" });
  res.send("Data written!");
});

app.post("/api/checkMobileNumber", async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ status: 200, message: "failed" });
    }

    const snapshot = await db
      .collection("t_realtie_user")
      .where("mobile_number", "==", Number(mobileNumber))
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ status: 200, message: "failed" });
    }

    const user = snapshot.docs[0].data();
  
    res.json({ status: 200, message: "success" });

  } catch (error) {
    res.status(500).json({ status: 400, message: error.message });
  }
});
// Read test data
app.get("/test-read", async (req, res) => {
  const snap = await db.ref("t_realtie_user").once("value");
  res.json(snap.val());
});

// Correct Render port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));
