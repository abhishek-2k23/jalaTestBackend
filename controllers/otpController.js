const otpGenerator = require("otp-generator");

const otpSchema = require("../models/otpSchema");
const Schema = require("../models/schema");

//function to generate and send otp to the user
exports.otpController = async (req, res) => {
  try {
    const { Email } = req.body;
    console.log(Email);

    //first check for the email existence
    const userExist = await Schema.findOne({ Email });
    console.log(userExist);

    //on user existance generated otp and created entry to db
    if (userExist) {

      //otp generated with only numbers of length 6
      let otpCode = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      //otp saved to database
      const otpData = await otpSchema.create({ Email, otpCode });
      console.log("OTP is : ", otpCode);

      //sending response
      res.status(201).json({
        status: true,
        message: "OTP sent successfully. Check your Mail",
        data: otpData,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "User doesn't Exist. Try with another mail id.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in otp Generation.",
      error: error.message,
    });
  }
};

//function for otp validation
exports.otpValidation = async (req, res) => {
  try {
    const { OTP, Email } = req.body;

    //if otp not ented from the user
    if (!OTP) {
      return res.status(404).json({
        status: false,
        message: "OTP not Entered",
      });
    }
    
    //get the latest otp from the database
    const savedOTP = await otpSchema
      .findOne({ Email })
      .sort({ createdAt: -1 })
      .limit(1)
      .select("otpCode")
      .lean();
    console.log("saved otp", savedOTP);

    //match the otp
    if (parseInt(OTP) != parseInt(savedOTP.otpCode)) {
      return res.status(401).json({
        status: false,
        message: "OTP is not valid",
      });
    }
    console.log("Otpvalidated");

    //after matching send the successfull response
    res.status(200).json({
      status: true,
      message: "OTP validation successfull",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "OTP validation failed. Some error occured",
      error: error.message,
    });
  }
};
