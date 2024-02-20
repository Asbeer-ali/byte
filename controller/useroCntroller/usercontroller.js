const sendMail = require("../../util/mail.js");
const OTP = require("../../models/otpSchema");
const user = require("../../models/userSchema");
const product = require("../../models/productSchema")
const sendOTP = require("../otpController");
const bcrypt = require("bcryptjs");

const { EMAIL } = process.env;

//guestUser
const guestUser = (req, res) => {
  res.render("../views/user/guestUser.ejs");
};

const home = (req, res) => {
  res.render("../views/user/userSignup.ejs");
};
const tohome = async(req, res) => {
  
  const products = await product.find({})

  res.render("./user/home.ejs",{products});
};
//signUp
const Signup = async (req, res) => {
  try {
    const check = await user.findOne({ email: req.body.email });
    console.log(check, "@@@@@@");
    if (!check) {
      console.log("reached not check");
      const pass = await bcrypt.hash(req.body.password, 10);
      const data = {
        userName: req.body.name,
        email: req.body.email,
        password: pass,
        reffer: req.body.referralId,
      };
      req.session.data = data;
      req.session.email = data.email;
      req.session.signotp = true;
      return res.redirect("/sendOtp");
    } else {
      console.log("%$$$$$$$$$");
      req.flash("err", "*User with this email Already exist");
      req.session.err = "user already exist";
      const reffer = req.query.ref;
      res.render("./user/userSignup.ejs", {
        title: "signup",
        err: "User with this email already exist",
        reffer,
      });
    }

    //     const{ name,email,password,confirmPassword}=req.body
    // console.log(name,email,password,confirmPassword);
    // req.session.email=email
    // res.redirect('sendOtp')
  } catch (error) {
    console.error("error while post signuo:", error);
    // req.flash("err","Sorry!!Something went wrong please try again after some times!!")
    // req.session.err = "something went wrong"
    // const reffer = req.query.ref;
    // res.render('./user/userSignup',{err: "Sorry.. Something went wrong please try again after some times",reffer})
  }
};

//otpSending

const sendOtp = async (req, res) => {
  try {
    console.log("otp sending process....");
    let email = req.session.email;
    await OTP.deleteOne({ email });

    const generatedOTP = `${Math.floor(100000 + Math.random() * 900000)}`;

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Verify the email using this otp",
      html: `<p>Hello new user use the this otp to verify your email to continue </p><p style="color:tomato;font-size:25px;letter-spacing:2px;">
            <b>${generatedOTP}</b></p><p>OTP will expire in<b> 10 minute(s)</b>.</p>`,
    };
    tempOtp = generatedOTP;
    await sendMail(mailOptions);

    function addMinutesToDate(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }
    const currentDate = new Date();
    const newDate = addMinutesToDate(currentDate, 10);
    console.log("date created........................");
    const otp = await new OTP({
      email,
      otp: generatedOTP,
      createdAt: Date.now(),
      expireAt: newDate,
    });
    console.log("otp details is.......", otp);
    await otp.save();
    res.render("./user/otp", { err: "" });
  } catch (error) {
    console.error("error while sending the OTP:", error);
  }
};

//otp verification

const verifyOtp = async (req, res) => {
  try {
    const email = req.session.email;
    console.log(req.body, "bbbbbbbbbbbb");
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push(req.body[`input${i + 1}`]);
    }
    console.log(arr, "@@@@@@@@@@@@@@@@@@@");
    const Otp = await OTP.findOne({ email: email });

    const newData = arr.join("");
    console.log(newData, "wer");
    console.log(Otp, "1111111111");
    if (newData === Otp.otp) {
      const data = req.session.data;
      const User = new user({
        UserName: data.userName,
        Email: data.email,
        Password: data.password,
      });
      console.log(User, "///////////////");

      await User.save();
      console.log("user saved");
      console.log(User, "ddddddddddddddd");
      res.redirect("/home");
    } else {
      res.render("./user/otp.ejs", { err: "invalid OTP" });
    }
  } catch (error) {
    console.error("error while verifing the otp:", error);
  }
};

//loginPost
const loginPost = async (req, res) => {
  try {
    res.render("user/login");
  } catch (error) {
    console.error(error);
  }
};

//userlogin

const userLogin = async (req, res) => {
  try {
    console.log(req.body.email);
    const check = await user.findOne({ Email: req.body.email });
    //    console.log(check,'@@@@@@@');
    if (check) {
      console.log("!!!!", req.session, "23432");
      const isMatch = await bcrypt.compare(req.body.password, check.Password);
      console.log("is match is completed");
      if (isMatch) {
        if (check.Status == true) {
          req.session.user = check.userName;
          req.session.logged = true;
          req.session.email = req.body.email;
          return res.json({ success: true });
        } else {
          return res.json({ success: false, error: "User is blocked" });
        }
      } else {
        return res.json({ error: "Invalid password" });
      }
    } else {
      return res.json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error(error, "login error");
    return res.json({ success: false, error: "Invalid username or password" });
  }
};

//forgot password
const forgotPassword = (req, res) => {
  res.render("user/forgotPassWord", { err: "" });
};

//forgot otp
const forgotPost = async (req, res) => {
  try {
    console.log("forgot otp sending process....");
    let email = req.body.email;
    req.session.email=email

    const userData = await user.findOne({ Email: email });

    if (!userData) {
      return res.render("user/forgotPassWord", { err: "user not exits" });
    }

    await OTP.deleteOne({ email });

    const generatedOTP = `${Math.floor(100000 + Math.random() * 900000)}`;

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Verify the email using this otp",
      html: `<p>Hello new user use the this otp to verify your email to continue </p><p style="color:tomato;font-size:25px;letter-spacing:2px;">
          <b>${generatedOTP}</b></p><p>OTP will expire in<b> 10 minute(s)</b>.</p>`,
    };
    tempOtp = generatedOTP;
    await sendMail(mailOptions);

    function addMinutesToDate(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }
    const currentDate = new Date();
    const newDate = addMinutesToDate(currentDate, 10);
    console.log("date created........................");
    const otp = await new OTP({
      email,
      otp: generatedOTP,
      createdAt: Date.now(),
      expireAt: newDate,
    });
    console.log("otp details is.......", otp);
    await otp.save();
    res.render("user/fotp", { err: "" });
  } catch (error) {
    console.error("error while otp creation:", error);
  }
};



const verifyForgetOtp=async(req,res)=>{
  try {
    console.log('i am here ',req.body);
    const arr = [];
    for (let i = 0; i < 6; i++) {
      console.log(arr);
      arr.push(req.body[`input${i + 1}`]);
    }
    console.log('222222');
    const useremail=req.session.email
    const Otp = await OTP.findOne({ email: useremail });
console.log('333333',Otp)
    const newData = arr.join("");
console.log('444444',newData)
    
    if (newData === Otp.otp) {
console.log('55555555')

       res.render('user/resetPassword',{err:''})
      }else{
        res.render("user/fotp", { err: "invalid OTP" });
        console.log('6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666');
      }
  } catch (error) {
    
  }
}


//resetPassword

const resetPassword=async(req,res)=>{
try {
  const {new_password,confirm_password} = req.body;
if( new_password !== confirm_password ){
  return res.render('user/resetPassword',{err:'Passwords do not match'})
}
const userEmail = req.session.email;
const hashedPassword = await bcrypt.hash(new_password, 10);
await user.findOneAndUpdate({ Email: userEmail }, { Password: hashedPassword });
await OTP.deleteOne({ email: userEmail });
res.redirect('/login')
} catch (error) {
  console.error('error while reset password:',error)
}
}



module.exports = {
  guestUser,
  home,
  Signup,
  sendOtp,
  verifyOtp,
  userLogin,
  loginPost,
  tohome,
  forgotPassword,
  forgotPost,
  verifyForgetOtp,
  resetPassword
};
