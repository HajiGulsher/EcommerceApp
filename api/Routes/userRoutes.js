const express = require("express");
const { registerUser, verifyEmail, loginUser ,addAddress,getUserAddresses, getUserProfile} = require("../controllers/userController");

const router = express.Router();

router.post("/register",registerUser);
router.get("/verify/:token", verifyEmail);
router.post('/login', loginUser);
router.post('/addresses', addAddress);
router.get('/addresses/:userId', getUserAddresses);
router.get("/profile/:userId",getUserProfile);

module.exports=router;
