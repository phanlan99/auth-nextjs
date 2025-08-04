import { connect } from "@/dbConfig/dbConfig"
import mongoose from "mongoose"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { error } from "console"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);

        // kiểm tra xem user tồn tại chưa

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "user does not exist " }, { status: 400 })
        }

        // kiểm tra xem đúng mật khẩu không
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Sai mật khẩu rùi" }, { status: 400 })
        }

        // Tạo token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Tạo token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1d", // ✅ sửa đúng key
        });
        
        const response = NextResponse.json({
            message: "login successly",
            success: true,
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}