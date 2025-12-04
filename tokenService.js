const crypto = require("crypto");
const SECRET = crypto.randomBytes(30).toString("hex");
const jwt = require("jsonwebtoken");

function generateToken(user) {
    const payload = {
        username: user.username,
        email: user.email,
        status: user.status // active, verified etc.
    };

    return jwt.sign(payload, SECRET, { expiresIn: "3h" });
}

module.exports = { generateToken };
