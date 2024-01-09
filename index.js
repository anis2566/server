const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

// external imports
const { notFound, errorHandler } = require("./middlewares/error");
const { connectDB } = require("./config/db");

// routes imports
const authRoutes = require("./routes/auth.routes");
const scoutRoutes = require("./routes/scout.routes");
const unitRoutes = require("./routes/unit.routes");

// dashboard routes imports

// initialization
const app = express();
dotenv.config({
  path: "./config/.env",
});

// connect database
connectDB();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://apbn.padmacart.com", "http://localhost:5173"],
    credentials: true,
  })
);

// default req
app.get("/", (req, res) => {
  res.send("working");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/scout", scoutRoutes);
app.use("/api/unit", unitRoutes);

// dashboard routes

// error handler
app.use(notFound);
app.use(errorHandler);

// run server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
