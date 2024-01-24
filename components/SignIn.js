import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import axios from "axios";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { useUser } from "./UserContext";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function SignIn() {
  const { userData, setUserData } = useUser();
  const router = useRouter();
  const [userStudID, setuserStudID] = useState(null);
  const [userPass, setuserPass] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userStudID && !userPass) {
        toast.error("Please fill the form");
      } else {
        const res = await axios.post("http://localhost:2000/api/users/login", {
          userStudID,
          userPass
        });
        router.push("/home");
        setUser(res.data);
        setUserData(res.data);
      }
    } catch (err) {
      console.error("Login error:", err);

      // Check if the error is a response error (from the server)
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);

        // You can extract specific error messages from the response data and handle them
        if (err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during request setup:", err.message);
      }
    }
  };

  useEffect(() => {
    console.log("Login Success", user);
    if (user && user.accessToken) {
      try {
        const userdata = jwtDecode(user.accessToken);
        console.log("Decoded Token", userdata.id);

        if (userdata.exp * 1000 < new Date().getTime()) {
          refreshToken();
        } else {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-6 max-w-[600px]  justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            height={150}
            width={150}
            className="w-auto h-auto"
          />
          <div>
            <h1 className="text-center text-3xl font-semibold text-[#64748B]">
              {loading ? "Processing" : "Welcome Back"}
            </h1>
            <p className="text-center text-sm text-[#64748B]">
              Please Login to continue
            </p>
          </div>
          <div className=" w-full flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="text-start flex flex-col gap-2">
                <label className="text-[#64748B] text-sm">Student email</label>
                <input
                  type="text"
                  className="outline-none border rounded-md px-3 py-2 text-lg"
                  placeholder="Enter student email"
                  onChange={(e) => setuserStudID(e.target.value)}
                />
              </div>
              <div className="text-start flex flex-col gap-2">
                <label className="text-[#64748B] text-sm">Password</label>
                <input
                  type="password"
                  className="outline-none border rounded-md px-3 py-2 text-lg"
                  placeholder="Enter password"
                  onChange={(e) => setuserPass(e.target.value)}
                />
              </div>
              <div className="flex">
                <button
                  className="border  text-base py-3 rounded-md w-full bg-[#22D3EE] text-white cursor-pointer"
                  type="submit"
                  disabled={buttonDisabled}
                >
                  {buttonDisabled ? "No signup" : "Login"}
                </button>
              </div>
            </form>
            <Link
              href={"/"}
              className="text-end text-[#64748B]"
              onClick={() => sendOTP()}
            >
              Forgot Password?
            </Link>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
          <span className="text-[#64748B]">
            Don't have an account yet?{" "}
            <a className="text-[#22D3EE]" href={"/register"}>
              Create account
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
