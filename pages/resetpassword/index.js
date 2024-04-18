import React, { useState } from "react";
import logo from "@/public/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

export default function ResetPass() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log(email);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/forgotpass",
        { userEmail: email }
      );
      toast.success("Email with OTP sent successfully");
      router.push("/OTPInput");
    } catch (error) {
      console.error(error);
      toast.error("User not found");
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="max-w-[400px] mx-auto border p-7 rounded-lg">
      <div className="flex flex-col gap-6 max-w-[600px]  justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          height={300}
          width={300}
          className="w-auto h-auto"
        />
        <div>
          <h1 className="text-center text-3xl font-semibold text-[#64748B]">
            Reset password
          </h1>
          <p className="text-center text-sm text-[#64748B]">
            Please enter your email
          </p>
        </div>
        <div className=" w-full flex flex-col gap-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="text-start flex flex-col gap-2">
              <input
                type="text"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="Enter student email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex">
              <button
                className="border  text-base py-3 rounded-md w-full bg-[#22D3EE] text-white cursor-pointer"
                type="submit"
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <span className="text-[#64748B]">
          Remember your password?{" "}
          <Link className="text-[#22D3EE]" href={"/"}>
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
}
