"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function Loginpage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        // Xử lý login tại đây
        try {
            setLoading(true)
            const response = await axios.post("api/users/login", user) // gởi qua api login
            console.log("Login success", response.data);
            toast.success("login success")
            router.push("/profile")

        } catch (error) {
            console.log(error.message);
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [user])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">{loading ? "Đang  đăng nhập..." : "Đăng nhập"}</h1>
                <hr className="border-gray-300" />

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    {buttonDisable ? "Vui lòng điền đủ thông tin" : "Đăng nhập"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Đăng ký
                    </Link>
                </p>
                <p className="text-sm text-right mt-2">
                    <Link href="/forgotpassword" className="text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                </p>

            </div>
        </div>
    )
}
