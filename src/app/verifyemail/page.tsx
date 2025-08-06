"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import Link from "next/link"

export default function VerifyEmail() {
  const [token, setToken] = useState("")
  const [verify, setVerify] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerify(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h1>

        <p className="text-sm text-gray-500 mb-6">
          Token: <span className="break-all text-blue-600">{token || "No token found"}</span>
        </p>

        {verify && (
          <div className="text-green-600">
            <h2 className="text-xl font-semibold mb-2">Email verified successfully! 🎉</h2>
            <Link
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="text-red-600">
            <h2 className="text-xl font-semibold mb-2">Invalid or Expired Token ❌</h2>
            <p>Please request a new verification link.</p>
          </div>
        )}

        {!verify && !error && (
          <div className="text-gray-500 italic">
            Verifying your email, please wait...
          </div>
        )}
      </div>
    </div>
  )
}
