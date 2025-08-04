"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {

  const router = useRouter()

  const [data, setData] = useState("nothing")

  const getUserDetail = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)

  }

  const logOut = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("logout successfull")
      router.push("/login")

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col ">
      <button className="mb-2 p-3 bg-amber-500 text-white " onClick={logOut}>Logout thui</button>
      <h2>{data === "nothing" ? "Bấm Lấy id người dùng" : <Link href={`/profile/${data}`} className="text-blue-600 underline">
        Xem hồ sơ chi tiết
      </Link>}</h2>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hồ sơ người dùng</h1>
        <p className="text-gray-600">Thông tin cá nhân sẽ hiển thị tại đây.</p>
      </div>
      <button className="mb-2 p-3 bg-amber-500 text-white " onClick={getUserDetail}>Lấy id người dùng</button>
    </div>
  )
}
