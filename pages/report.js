import Link from "next/link";
import React from "react";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import Headeruser from "@/components/Headeruser";

export default function Report() {
  return (
    <div className="pt-[70px]">
      <Headeruser />
      <div className="max-w-[300px] mx-auto flex justify-center items-center flex-col gap-2">
        <div className="border w-full text-center rounded-lg py-2 px-3 bg-black text-white">
          <Link href={"mailto:muhammadsyahidbahrudin03@gmail.com"}>
            Email Admin
          </Link>
        </div>
        <div className="border w-full text-center rounded-lg py-2 px-3 bg-red-500 text-white">
          <Link href={"https://wa.me/0122058840"}>Whatsapp Admin</Link>
        </div>
      </div>
    </div>
  );
}
