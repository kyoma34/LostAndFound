// middleware/admin.js
const adminMiddleware = (req, res, next) => {
  // req.user est déjà peuplé par le middleware auth (verifyToken)
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit : rôle admin requis.' });
  }
  next();
};

module.exports = adminMiddleware;