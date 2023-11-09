const express=require("express")
const app=express()
const otpGenerator = require('otp-generator');
const connect=require("./database/connect")
const model=require("./database/model")
app.use(express.json())
const nodemailer=require("nodemailer")
app.post("/forgotpassword",async(req,res)=>{
    const {email}=req.body
    const user=await model.findOne({email:email})
    if(!user){
      res.send("invalid email")
      return
  }
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    user.otp=otp 
    await user.save()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vivekmethuku1@gmail.com',
        pass: 'iqfjinontxywnyfb'
      }
    });
    const mailOptions = {
      from: 'vivekmethuku1@gmail.com',
      to: 'vivekmethuku2@gmail.com',
      subject: 'password reset ',
      text: `otp to reset your password ${user.otp}`,
    };
    await transporter.sendMail(mailOptions);
    res.send("otp is sent to your mail")
  

})
app.listen(4000,()=>{
    console.log("server is created")
})