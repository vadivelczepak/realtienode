const express = require("express");
const authMiddleware = require("./authMiddleware");
const db = require("./firebase");
const { generateToken } = require("./tokenService");
const { generateMobileToken } = require("./tokenMobileService");
const app = express();
app.use(express.json());




app.post("/api/login", (req, res) => {
    const { username, email } = req.body;

    // You can also check Firebase DB here if needed
    const user = {
        username,
        email,
        status: "verified"
    };

    const token = generateToken(user);

    res.json({
        status: 200,
        message: "success",
        token,
        user
    });
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

app.post("/api/checkOtp", async (req, res) => {
  try {
    const { mobileNumber, mobileOtp } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ status: 200, message: "failed" });
    }

    const snapshot = await db
      .collection("t_realtie_user")
      .where("mobile_number", "==", Number(mobileNumber))
      .where("otp", "==", Number(mobileOtp))
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ status: 200, message: "failed" });
    }

    const user = snapshot.docs[0].data();
    const userDetils = {
            mobileNumber,
            status: "verified"
        };
    const token = generateMobileToken(userDetils);
    res.json({ status: 200, message: "success", token });

  } catch (error) {
    res.status(500).json({ status: 400, message: error.message });
  }
});
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
// Correct Render port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));
