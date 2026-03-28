const jwt  = require("jsonwebtoken");
const User = require("../models/User");


async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT containing only the user's ID
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        // password is never returned, per the doc
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}
module.exports = { login };