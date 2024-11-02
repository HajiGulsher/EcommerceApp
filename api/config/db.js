const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            
        });
        console.log("MongoDB connected successfully");

        // Test query to check if connection is active
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.ping((err, result) => {
            if (err) {
                console.error("Ping to MongoDB failed:", err);
            } else {
                console.log("Ping to MongoDB successful:", result);
            }
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);  // Exit process on failure
    }
};

module.exports = connectDB;
