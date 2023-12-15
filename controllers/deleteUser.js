const Schema = require("../models/schema");
exports.deleteUser = async (req,res) =>{
    //fetch all users
    try{
        const {email} = req.body;
        const user = await Schema.findOneAndRemove({email});
        console.log(user);

        res.status(200).json({
            status : true,
            users : user,
            message : "delete successfully",
        })
    }catch(err){
        res.status(500).json({
            status : false,
            message : err.message,
        })
    }
}