import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "làm ơn nhập username"],
        unique : true
    },
    email : {
        type : String,
        required : [true , "làm ơn nhập email"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "làm ơn nhập password"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date



})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User