// controllers/userController.js
const User = require('../models/User');
const Post = require('../models/Post');

// GET /api/users — Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'id name email'); // Retourne uniquement id, name, email
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// DELETE /api/users/:id — Supprimer un utilisateur + ses publications
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Supprimer les publications liées à cet utilisateur
    await Post.deleteMany({ createdBy: id });

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Utilisateur et ses publications supprimés avec succès.' });
  } catch (error) {
    console.error('Erreur deleteUser:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

module.exports = { getAllUsers, deleteUser };