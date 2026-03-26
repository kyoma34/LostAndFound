const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API Community First is running' });
});   

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;