require("dotenv").config();

const express    = require("express");
const helmet     = require("helmet");
const authRoutes = require("./src/routes/userRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));