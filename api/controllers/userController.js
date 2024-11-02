const { registerUser, verifyEmail, loginUser, addAddress, getUserAddresses,createOrder} = require("../utils/email");
const User = require('../models/users'); // Adjust the path if necessary



exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(result.status).json({ message: result.message });
};

exports.verifyEmail = async (req, res) => {
    const token = req.params.token;
    const result = await verifyEmail(token);
    res.status(result.status).json({ message: result.message });
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(result.status).json({ message: result.message, token: result.token });
};
exports.addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        const result = await addAddress(userId, address); // Use the addAddress from email.js

        res.status(result.status).json({ message: result.message, user: result.user });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Error adding address", error: error.message });
    }
};
exports.getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;

        // Call the getUserAddresses function from email.js
        const result = await getUserAddresses(userId);

        // Send the result as a response
        res.status(result.status).json(result.status === 200 ? { addresses: result.addresses } : { message: result.message });
    } catch (error) {
        console.error("Error in getUserAddresses controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters
        console.log("Received userId:", userId); // Optional: Log userId for debugging

        const user = await User.findById(userId); // Find user by ID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        res.status(500).json({ message: "Error retrieving the user profile" });
    }
};