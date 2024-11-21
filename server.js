const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const connectDB = require("./config/db.js");
const errorHandler = require("./middlewares/errorHandlers.js");
dotenv.config();

connectDB();
const app = express();
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client’s origin
  })
);
app.use(express.json());
// Routes
app.use("/api/items", itemRoutes);
app.use("/api/user", userRoutes);
// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
