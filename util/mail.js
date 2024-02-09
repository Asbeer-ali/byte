const nodemailer = require("nodemailer");
require('dotenv').config();
const { EMAIL_PASS, EMAIL } = process.env;


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, 
    },
});

mailTransporter.verify((error, success) => {
    if (error) {
        console.log("Error verifying email transporter:", error);
    } else {
        console.log("Email transporter is ready");
        console.log(success);
    }
});

const sendEmail = async (mailOptions) => {
    try {
        await mailTransporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return;
    } catch (err) {
        throw err;
    }
};



module.exports = sendEmail;
