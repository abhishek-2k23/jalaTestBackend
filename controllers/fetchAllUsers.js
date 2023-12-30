const Schema = require("../models/schema");
exports.fetchAllUsers = async (req,res) =>{
    //fetch all users
    try{
        //fetching all users
        const users = await Schema.find({});
        console.log(users);

        //successfull response sent to user
        res.status(200).json({
            status : true,
            users : users,
            message : "all users fetched",
        })
    }catch(err){
        res.status(500).json({
            status : false,
            message : err.message,
        })
    }
}