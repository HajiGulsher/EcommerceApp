require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const orderRoutes =require("./routes/orderRoutes")

const app = express();
const port = process.env.PORT || 8081;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: '*', // For development, allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // If you need to include cookies in requests
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api", orderRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


