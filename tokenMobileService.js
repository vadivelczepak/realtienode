const crypto = require("crypto");
const SECRET = crypto.randomBytes(30).toString("hex");
const jwt = require("jsonwebtoken");

function generateMobileToken(user) {
    const payload = {
        mobile: user.mobile,
        status: user.status // active, verified etc.
    };

    return jwt.sign(payload, SECRET, { expiresIn: "3h" });
}

module.exports = { generateMobileToken };
