// controllers/orderController.js
const mongoose = require("mongoose");
const Order = require("../models/order");
const User = require('../models/users'); // Adjust path if necessary

exports.createOrder = async (req, res) => {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const products = cartItems.map((item) => ({
            name: item.title,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
        }));
        const completeShippingAddress = {
            name: shippingAddress.name || "Unnamed",
            mobileNo: shippingAddress.mobileNo || "0000000000",
            houseNo: shippingAddress.houseNo || "N/A",
            street: shippingAddress.street || "Main Street",
            landMark: shippingAddress.landMark || "Unknown",
            postalCode: shippingAddress.postalCode || "000000"
        };

        const order = new Order({
            user: userId,
            products:products,
            totalPrice:totalPrice,
            shippingAddress:completeShippingAddress,
            paymentMethod:paymentMethod
        });

        await order.save();
        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Received userId:", userId);

        // Convert to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        console.log("Converted userId to ObjectId:", userObjectId);

        // Query orders for this userId and populate the "user" field
        const orders = await Order.find({ user: userObjectId }).populate("user");

        // Log retrieved orders
        console.log("Orders found:", orders);

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: "Error retrieving orders", error: error.message });
    }
};
