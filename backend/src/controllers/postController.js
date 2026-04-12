const Post = require("../models/Post");


// 🔹 CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, desc, type, date, location } = req.body;

    if (!title || !desc || !type || !date || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const post = await Post.create({
      title,
      desc,
      type,
      date,
      location,
      image: req.file ? req.file.path : null,
      createdBy: req.user.id, // ⚠️ ONLY ID (not object)
    });

    res.status(201).json(post);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};


// 🔹 GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "name email") // get user info
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(posts);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};


// 🔹 GET POST BY ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);

  } catch (err) {
    res.status(500).json({ message: "Invalid ID or server error." });
  }
};


// 🔹 UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const { title, desc, type, date, location, status } = req.body;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Optional: only owner can update
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized." });
    }

    post.title = title || post.title;
    post.desc = desc || post.desc;
    post.type = type || post.type;
    post.date = date || post.date;
    post.location = location || post.location;
    post.status = status || post.status;

    if (req.file) {
      post.image = req.file.path;
    }

    await post.save();

    res.status(200).json(post);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};


// 🔹 DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Optional: only owner can delete
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized." });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};