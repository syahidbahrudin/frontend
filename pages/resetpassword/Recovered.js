import React, { useState } from "react";
import logo from "@/public/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Recovered() {
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
          <h1 className="text-center text-2xl font-semibold text-[#64748B]">
            Congrats your password already recovered!
          </h1>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
