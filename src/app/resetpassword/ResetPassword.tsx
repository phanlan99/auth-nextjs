"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      setSuccess(res.data.message);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Có lỗi xảy ra");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Reset Password
        </button>

        {success && (
          <p className="text-green-600 text-center">
            {success} <br />
            <Link href="/login" className="underline text-blue-600">
              Go to Login
            </Link>
          </p>
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}
