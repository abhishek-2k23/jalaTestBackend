const Schema = require("../models/schema");
exports.deleteUser = async (req,res) =>{
    //delete one user
    try{
        //get email from body
        const {email} = req.body;

        //delete function
        const user = await Schema.findOneAndRemove({email});
        console.log(user);

        //response of deletion
        res.status(200).json({
            status : true,
            users : user,
            message : "delete successfully",
        })
    }catch(err){
        //if any error occurs        
        res.status(500).json({
            status : false,
            message : err.message,
        })
    }
}