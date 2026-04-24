// À ajouter dans controllers/postController.js
const Post = require('../models/Post');

// DELETE /api/posts/:id — Supprimer une publication (admin)
const deletePostAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Publication supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur deletePostAdmin:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};

module.exports = { /* ...exports existants..., */ deletePostAdmin };