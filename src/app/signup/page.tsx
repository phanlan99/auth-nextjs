"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Signuppage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user) // ← Đã sửa
      console.log("Đăng ký thành công", response.data)
      router.push("/login") // ← Redirect
    } catch (error: any) {
      console.log("Lỗi đăng ký:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisable(
      !(user.username.length > 0 && user.password.length > 0 && user.email.length > 0)
    )
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
        </h1>
        <hr className="border-gray-300" />
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tên người dùng"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={onSignUp}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={buttonDisable}
        >
          {buttonDisable ? "Vui lòng điền đủ thông tin" : "Đăng ký"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
