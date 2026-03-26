const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Vérifier si le token est présent dans le header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraire le token
            token = req.headers.authorization.split(' ')[1];

            // Vérifier le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attacher l'utilisateur à la requête
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }
};

module.exports = { protect };