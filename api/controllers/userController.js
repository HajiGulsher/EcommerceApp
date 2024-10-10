const crypto = require('crypto');  // Not 'react-native-crypto'
const User = require("../models/user");
const { sendVerificationEmail } = require("../utils/email");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ name, email, password });
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        await newUser.save();

        await sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(200).json({ message: "User registered successfully, verification email sent" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
};
