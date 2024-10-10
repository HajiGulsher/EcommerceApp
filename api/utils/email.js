const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "shopizone.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the link to verify your email: http://localhost:8081/verify/${verificationToken}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
