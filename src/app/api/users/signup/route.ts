import {connect} from "@/dbConfig/dbConfig"
import mongoose from "mongoose"
import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { error } from "console"
import { sendEmail } from "@/helper/mailer"




export async function POST(request : NextRequest){
    try {
        await connect();
        const reqBody =  await request.json()
        const {username , email , password} = reqBody

        console.log(reqBody);

        // checked if user already exits

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error : "user already exits"} , {status : 400})
        }

        // hash password 
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password , salt)

        // new user

        const newUser = new User({
            username,
            email,
            password : hashPassword
        })

        const saveUser =  await newUser.save()
        console.log(saveUser);


        // send email verify
        await sendEmail({email , emailType : "VERIFY" , userId : saveUser._id})

        
        return NextResponse.json(
            {message : "user created successly ",
            success : true,
            saveUser
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}