const crypto = require('crypto');
const nodemailer = require("nodemailer");
const User = require("../models/users");
const Order=require("../models/order");
const jwt = require('jsonwebtoken');
const { response } = require('express');
const mongoose = require('mongoose');
// Email transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to register a new user and send a verification email
// Function to register a new user without hashing the password
exports.registerUser = async (name, email, password) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { status: 400, message: "Email already registered" };
        }

        // Create a new user without hashing the password
        const newUser = new User({ name, email, password }); // Storing password in plaintext
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user in the database
        await newUser.save();

        // Send verification email
        const mailOptions = {
            from: "shopizone.com",
            to: newUser.email,
            subject: "Email Verification",
            text: `Please click the link to verify your email: http://192.168.100.55:8081/verify/${newUser.verificationToken}`
        };
        await transporter.sendMail(mailOptions);

        // Return success response
        return { status: 200, message: "User registered successfully, verification email sent" };
    } catch (error) {
        // Handle and return error
        console.error("Error during registration:", error);
        return { status: 500, message: "Unexpected server error", error: error.message };
    }
};


// Function to verify user email
exports.verifyEmail = async (token) => {
    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return { status: 404, message: "Invalid verification token" };
        }

        // Update user as verified
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        // Send success email
        const mailOptions = {
            from: "shopizone.com",
            to: user.email,
            subject: "Verification Successful",
            text: "Your email has been successfully verified."
        };
        await transporter.sendMail(mailOptions);

        // Return success response
        return { status: 200, message: "Email verified successfully" };
    } catch (error) {
        console.error("Error during email verification:", error);
        return { status: 500, message: "Email verification failed", error: error.message };
    }
};
// Function to log in a user without hashing the password
exports.loginUser = async (email, password) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return { status: 404, message: "User not found" };
        }

        // Check if the user is verified
        if (!user.verified) {
            return { status: 400, message: "Email not verified" };
        }

        // Compare the password directly
        if (user.password !== password) {
            return { status: 401, message: "Invalid password" };
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success with the generated token
        return { status: 200, message: "Login successful", token };
    } catch (error) {
        console.error("Error during login:", error);
        return { status: 500, message: "Unexpected server error", error: error.message };
    }
};
exports.addAddress = async (userId, address) => {
    try {
        // Check if userId is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: 400, message: "Invalid user ID" };
        }

        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Find user by ObjectId
        const user = await User.findById(objectId);
        if (!user) {
            return { status: 404, message: "User not found" };
        }

        // Add address to user's addresses array
        user.addresses.push(address);
        await user.save();

        // Return success response
        return { status: 200, message: "Address added successfully", user };
    } catch (error) {
        console.error("Error adding address:", error);
        return { status: 500, message: "Error adding address", error: error.message };
    }
};
exports.getUserAddresses = async (userId) => {
    try {
        // Find the user by ID and select only the addresses field
        const user = await User.findById(userId, 'addresses');
        
        if (!user) {
            return { status: 404, message: "User not found" };
        }

        // Return the addresses as a successful response
        return { status: 200, addresses: user.addresses };
    } catch (error) {
        console.error("Error retrieving addresses:", error);
        return { status: 500, message: "Error retrieving addresses", error: error.message };
    }
};

// exports.createOrder = async (userId, cartItems, totalPrice, shippingAddress, paymentMethod) => {
//     try {
//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return { status: 404, message: "User not found" };
//         }

//         // Create an array of product objects from the cart items
//         const products = cartItems.map((item) => ({
//             name: item?.title,
//             quantity: item.quantity,
//             price: item.price,
//             image: item?.image,
//         }));

//         // Create a new Order
//         const order = new Order({
//             user: userId,
//             products: products,
//             totalPrice: totalPrice,
//             shippingAddress: shippingAddress,
//             paymentMethod: paymentMethod,
//         });

//         await order.save();

//         return { status: 200, message: "Order created successfully!" };
//     } catch (error) {
//         console.log("Error creating orders:", error);
//         return { status: 500, message: "Error creating orders", error: error.message };
//     }
// };

