const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); // déjà existant

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // déjà enregistré