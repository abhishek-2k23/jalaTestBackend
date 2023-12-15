const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
//creating the schema :
const otpSchema = new mongoose.Schema({
    Email:{
        type : String,
        require : true,
    },
    otpCode:{
        type : String,
        require : true,
    },
    createdAt:{
        type : Date,
        default : Date.now(),
        expires:Date.now()+5*60,
    }
});

//lekin iss ke entry me save hone se phle meko otp bhejna hai.. To code h ye :
otpSchema.pre("save",async function(next){
    try{
        const transporter = new nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : "kumarabhishek00090@gmail.com",
                pass : "dnqmmfqvooyphwch",
            }
        });

        let info = await transporter.sendMail({
            from : 'Password Reset',
            to : `${this.Email}`,
            title : 'OTP for password reset password',
            subject : "Reset Password OTP",
            html : `<p>Otp to reset your Password : ${this.otpCode} </p>
                    <p>OTP will be expire in 5 minutes.`,
        });

        console.log(info);

    }catch(error){
        console.log("Error occurred in otp mail sending : ", error);
    }
    next();
})


module.exports = mongoose.model("otpSchema",otpSchema)