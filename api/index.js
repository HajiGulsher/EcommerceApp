// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const crypto = require('react-native-crypto');
// const nodemailer = require("nodemailer");

// const app = express();
// const port = 8081;
// const cors = require("cors");

// app.use(cors());  // Enabling CORS

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const jwt = require("jsonwebtoken");

// // mongodb connect code 

// mongoose.connect("mongodb+srv://hajigulsher939:hajigulsher@cluster0.oix7v.mongodb.net/", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("connected to mongo")
// }).catch((err) => {
//     console.log("error in connection of mongo", err)
// });

// app.listen(port, () => {
//     console.log("server is runnig on port 8081")
// });

// const User = require("./models/users");
// const Order = require("./models/order");

// //send the verfication email to the user
// const sendVerificationEmail = async (email, verificationToken) => {
//     // create a node mailer transpot to send emails
//     const transpoter = nodemailer.createTransport({
//         //configure the email service
//         service: "gmail",
//         auth: {
//             user: "hajigulsher939@gmail.com",
//             // pass:"kuse yyie mvxq dtjy"\
//             pass: "byku rcen czsq iqzy"
//         }
//     })

//     //compose the email msg
//     const mailOptions = {
//         from: "shopizone.com",
//         to: email,
//         subject: "Email Verification",
//         text: `Please click the link to verify your email: http://localhost:8081/verify/${verificationToken}`,
//     };

//     //send the email 
//     try {
//         await transpoter.sendMail(mailOptions)
//     } catch (error) {
//         console.log("error in sending email", error)

//     }
// }

// //// endpoint to register in app
// app.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         //check email is already registered
//         const exsistingUser = await User.findOne({ email });

//         if (exsistingUser) {
//             return res.status(400).json({ message: "email Already registered" });
//         }

//         //create a new user
//         const newUser = new User({ name, email, password });

//         //genrate and store the verification token
//         newUser.verificationToken = crypto.randomBytes(20).toString("hex");

//         //save the user to database
//         await newUser.save();

//         //send the verification email to user
//         sendVerificationEmail(newUser.email, newUser.verificationToken);

//     } catch (error) {
//         console.log("Error in registration");
//         res.status(500).json({ message: "Registration Failed" })
//     }
// });

// //endpoint to verify the email

// app.get("/verify/:token", async (req, res) => {
//     try {
//         const token = req.params.token;

//         //find the user with given verificationn token
//         const user = await User.findOne({ verificationToken: token });
//         if (!user) {
//             return res.status(404).json({ message: "Invalid Verification Token" })
//         }

//         ///Mark the userd as Verified
//         user.verified = true;
//         user.verificationToken = undefined;
//         await user.save();

//         res.status(200).json({ message: "Email Verified Successfully" })
//     } catch (error) {
//         res.status(500).json({ message: "Email verification Failed" });
//     }
// })

// // Backend code (running on Node.js server)
// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const mongoose = require("mongoose");
// // const crypto = require("crypto"); // Only for Node.js backend
// // const nodemailer = require("nodemailer");

// // const app = express();
// // const port = 8081;
// // const cors = require("cors");

// // app.use(cors());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());

// // mongoose.connect("mongodb+srv://hajigulsher:gulsher@cluster0.oix7v.mongodb.net/", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(() => {
// //     console.log("connected to mongo");
// // }).catch((err) => {
// //     console.log("error in connection of mongo", err);
// // });

// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// // });

// // // Example: User Registration with Email Verification
// // const User = require("./models/users");
// // const Order = require("./models/order");

// // const sendVerificationEmail = async (email, verificationToken) => {
// //     const transporter = nodemailer.createTransport({
// //         service: "gmail",
// //         auth: {
// //             user: "your-email@gmail.com",
// //             pass: "your-email-password"
// //         }
// //     });

// //     const mailOptions = {
// //         from: "noreply@yourdomain.com",
// //         to: email,
// //         subject: "Email Verification",
// //         text: `Please verify your email using this token: ${verificationToken}`
// //     };

// //     try {
// //         await transporter.sendMail(mailOptions);
// //     } catch (error) {
// //         console.log("Error sending email", error);
// //     }
// // };

// // app.post("/register", async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;

// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) {
// //             return res.status(400).json({ message: "Email already registered" });
// //         }

// //         const newUser = new User({ name, email, password });
// //         newUser.verificationToken = crypto.randomBytes(20).toString("hex");

// //         await newUser.save();
// //         sendVerificationEmail(newUser.email, newUser.verificationToken);

// //         res.status(200).json({ message: "User registered, verification email sent" });
// //     } catch (error) {
// //         console.log("Error in registration", error);
// //         res.status(500).json({ message: "Registration Failed" });
// //     }
// // });
