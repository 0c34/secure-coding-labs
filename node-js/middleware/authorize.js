const jwt = require('jsonwebtoken');
const secretKey = 'securecodesecret';

// Middleware to verify JWT
/*const authorize = (req, res, next) => {
    const token = req.headers['Authorization']

    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided!');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).send('Invalid Token');
    }
};*/

const authorize = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authorize;