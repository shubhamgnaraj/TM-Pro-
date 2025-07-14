const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    console.log("Request to:", req.originalUrl);
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({message: "No token"});

    const token = authHeader?.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({message: "Token invalid", error})
    }
}