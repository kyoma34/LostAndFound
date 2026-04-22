
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



async function createPost(req, res) {
  try {
    const { title, desc, type, date, location } = req.body;

    // Check all required fields
    if (!title || !desc || !type || !date || !location)
      return res.status(400).json({ message: "All fields are required." });

    // If an image was uploaded, multer puts it on req.file
    const image = req.file ? req.file.filename : null;

    const post = await Post.create({
      title,
      desc,
      type,
      date,
      location,
      image,
      createdBy: {
        id:    req.user.id,       // comes from requireAuth middleware
        name:  req.user.name,
        email: req.user.email,
      },
    });

    return res.status(201).json(post);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found." });

    return res.status(200).json(post);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

module.exports = { createPost, getAllPosts, getPostById };