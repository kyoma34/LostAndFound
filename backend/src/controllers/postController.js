const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, desc, type, date, location } = req.body;
    const userId = req.user.id;

    if (!title || !desc || !type || !date || !location) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPost = new Post({
      title,
      desc,
      type,
      date,
      location,
      image: req.file ? req.file.path : null,
      createdBy: userId,
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully.', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('createdBy', 'name email');
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate('createdBy', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, type, date, location, status } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Check if user is the creator
    if (post.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this post.' });
    }

    if (title) post.title = title;
    if (desc) post.desc = desc;
    if (type) post.type = type;
    if (date) post.date = date;
    if (location) post.location = location;
    if (status) post.status = status;
    if (req.file) post.image = req.file.path;

    await post.save();
    return res.status(200).json({ message: 'Post updated successfully.', post });
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Check if user is the creator
    if (post.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post.' });
    }

    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};