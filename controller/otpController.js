const OTP=require("../models/otpSchema");
const generateOTP = require("../util/mail");
const sendEmail=require("../util/mail");
const bcrypt=require("bcryptjs");
const {AUTH_EMAIL}=process.env;


const sendOTP = async (email)=>{
    
    try{
        if(!(email)){
            throw Error("provide values for email,subject,message")
        }
        
        //clear old otp
        await OTP.deleteOne({email})
        
        const generatedOTP = `${Math.floor(100000 + Math.random() * 900000)}`;
        
        console.log(generatedOTP,'reached inside controller');
        //sending email to the user
        const mailOptions={
            from:AUTH_EMAIL,
            to:email,
            subject:"Verify the email using this otp",
            html:`<p>Hello new user use the this otp to verify your email to continue </p><p style="color:tomato;font-size:25px;letter-spacing:2px;">
            <b>${generatedOTP}</b></p><p>OTP will expire in<b> 10 minute(s)</b>.</p>`
        }
        await sendEmail(mailOptions);
      
      
        function addMinutesToDate(date, minutes) {
            return new Date(date.getTime() + minutes * 60000); // 60000 milliseconds in a minute
          }
        const currentDate =new Date();
        const newDate = addMinutesToDate(currentDate, 10);
        const newOTP= await new OTP({
            email,
            otp:generatedOTP,
            createdAt:Date.now(),
            expireAt:newDate,
        })
        const createdOTPrecord=await newOTP.save()

        return createdOTPrecord
    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports = sendOTP;

