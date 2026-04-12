const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./src/config/db.js");
const authRoutes = require("./src/routes/authRoutes.js")
const postRoutes = require("./src/routes/postRoutes.js")


dotenv.config();

const PORT = process.env.PORT;
const app = express();


// middleware 
app.use(express.json())


// app.use(cors(
//     {origin: process.env.FRONTEND_URL,
//     credentials: false
// }
// ))

app.use(cors())
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/uploads", express.static("uploads"))

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT ",PORT)
    })
})
