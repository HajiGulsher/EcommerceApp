// routes/orderRoutes.js
const express = require("express");
const { createOrder, getUserOrders } = require("../controllers/orderController");

const router = express.Router();

// Route for creating an order
router.post("/orders", createOrder);
router.get("/orders/:userId", getUserOrders);

module.exports = router;
