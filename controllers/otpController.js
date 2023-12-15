const otpGenerator = require("otp-generator");

const otpSchema = require("../models/otpSchema");
const Schema = require("../models/schema");

exports.otpController = async (req, res) => {
  try {
    const { Email } = req.body;
    console.log(Email);
    const userExist = await Schema.findOne({ Email });
    console.log(userExist);
    if (userExist) {
      let otpCode = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const otpData = await otpSchema.create({ Email, otpCode });
      console.log("OTP is : ", otpCode);

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

exports.otpValidation = async (req, res) => {
  try {
    const { OTP, Email } = req.body;
    if (!OTP) {
      return res.status(404).json({
        status: false,
        message: "OTP not Entered",
      });
    }

    const savedOTP = await otpSchema
      .findOne({ Email })
      .sort({ createdAt: -1 })
      .limit(1)
      .select("otpCode")
      .lean();
    console.log("saved otp", savedOTP);
    if (parseInt(OTP) != parseInt(savedOTP.otpCode)) {
      return res.status(401).json({
        status: false,
        message: "OTP is not valid",
      });
    }
    console.log("Otpvalidated");
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
