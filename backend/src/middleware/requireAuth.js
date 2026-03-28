
const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Header must be: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: "1", iat: ..., exp: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};