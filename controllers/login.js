const Schema = require("../models/schema");
const express = require("express");
exports.login = async(req,res)=>{
    try{
        const {Email,Password} = req.body;

        //check for the user is availabe or not
        let isUser = await Schema.findOne({Email});
        
        //if user not availabe -> return 
        if(!isUser){
            console.log("User is not available");
            return res.status(404).json({
                success : false,
                message : "user not found",
            })
        }

        //match the password
        if(isUser.Password === Password){
            console.log("User Logged in");
            isUser = isUser.toObject();
            isUser.Password = undefined;

            //if password match sent successfull login response with undefined password
            res.status(200).json({
                success : true,
                user : isUser,
                message : "user logged in successfully",
            })
        }else{
            
            console.log("Password unmatched.")
            res.status(402).json({
                success : false,
                message : "Password does not match."
            })
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal Server error",
            error : error.message,
        })
    }
}