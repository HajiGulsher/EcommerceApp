require('dotenv').config();  // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8081;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
