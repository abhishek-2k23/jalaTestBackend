const Schema = require("../models/schema");
exports.resetPassword = async (req, res) => {
  try {
    const { Email, Password, confirmPassword } = req.body;
    if (Password != confirmPassword) {
      return res.status(402).json({
        status: false,
        message: "Password doesn't Matched.",
        // message : Schema.findOne({Email}),
      });
    }
    const response = await Schema.findOneAndUpdate({Email : Email},{Password: Password},{new : true});
    console.log("Updated Details : ", response);
    res.status(201).json({
      status: true,
      message: "Password is updated",
      userUpdatedData: response,
    });


  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      message: "Password not updated. Some error occured.",
      error: e.message,
    });
  }
};
