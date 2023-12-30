//Get the all users in the db
const Schema = require("../models/schema");

exports.getUser = async(req,res) =>{
    try{
        //fetch the users 
        const userData = await Schema.find();
        if(!userData){
            console.log("No data found");
            return res.status(401).json({
                success : false,
                message : "users not available"
            })
        }
        res.status(200).json({
            success : true,
            message : "Users Found",
            data : userData,
        })

    }catch(error){
        console.log(error);
        res.status(404).json({
            success : false,
            message : "not found",
            
        })
    }
}
