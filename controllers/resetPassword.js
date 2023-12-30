// TO update the password
const Schema = require("../models/schema");

exports.resetPassword = async (req, res) => {
  try {
    const { Email, Password, confirmPassword } = req.body;

    //check for the new password and confirm password is equal or not 
    if (Password != confirmPassword) {
      return res.status(402).json({
        status: false,
        message: "Password doesn't Matched.",
        // message : Schema.findOne({Email}),
      });
    }

    //find the user with email and update the old password with new password
    const response = await Schema.findOneAndUpdate({Email : Email},{Password: Password},{new : true});
    
    //send the update response
    res.status(201).json({
      status: true,
      message: "Password is updated",
      userUpdatedData: response,
    });


  } catch (e) {
    //any error in password update
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Password not updated. Some error occured.",
      error: e.message,
    });
  }
};
