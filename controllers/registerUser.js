//This is to register the new users only
const express = require("express");
const Schema = require("../models/schema");
exports.registerUser = async (req, res) => {
  try {
    //extract all data of the user
    const { Name,Email,Password } = req.body;

    //check for users exist
    const existingUser = await Schema.findOne({Email})

    //if already availabe then -> return 
    if (existingUser) {
        console.log("user Exist");
      return res.status(409).json({
        success: false,
        message: "user already exist",
        data : existingUser
      });
    } else {
      //save data to db
      const response = await Schema.create({
        Name,Email,Password
      });

      res.status(200).json({
        success: true,
        data: response,
        message: "submitted successfully",
      });

      console.log("data submitted");
    }
  } catch (error) {
    //any error in data validation 
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to submit the data",
      error: error,
    });
  }
};
