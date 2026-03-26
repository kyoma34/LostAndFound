const app = require('./src/app');

const PORT = process.env.PORT || 5000;





const server = app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
});


// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
    console.log('Erreur non gérée:', err);
    server.close(() => process.exit(1));
});