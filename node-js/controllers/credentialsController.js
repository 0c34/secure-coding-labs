const fs = require("fs");
const path = require("path");

exports.getCredentials = (req, res) => {
    const clientIP = req.connection.remoteAddress;

    console.log("Request from:", clientIP);

    if (clientIP !== "::1" && clientIP !== "127.0.0.1" && clientIP !== "::ffff:127.0.0.1") {
        return res.status(403).json({ message: "Forbidden: Access only from localhost." });
    }

    const filePath = path.join(__dirname, "../keys/credentials.json");
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Credentials file not found." });
    }

    const credentials = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(credentials));
};