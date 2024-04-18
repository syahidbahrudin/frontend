import React, { useState } from "react";
import logo from "@/public/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Reset() {
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
          <form onSubmit={""} className="space-y-3">
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">
                Create new password
              </label>
              <input
                type="text"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="••••••••"
              />
            </div>
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">
                Confirm new password
              </label>
              <input
                type="text"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-row">
              <div className="flex  items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                ></input>
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-gray-600 dark:text-gray-600"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="flex">
              <button
                className="border  text-base py-3 rounded-md w-full bg-[#22D3EE] text-white cursor-pointer"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
