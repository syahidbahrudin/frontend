import React from "react";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import logout from "../public/icon/logout.svg";
import Link from "next/link";

const link = [
  {
    label: "Dashboard",
    href: "/admin/"
  },
  {
    label: "User",
    href: "/admin/adminprofile"
  },
  {
    label: "Item",
    href: "/admin/adminproduct"
  }
];

export default function Headeradmin() {
  return (
    <header>
      <div className="max-w-[1280px]">
        <div className="fixed  inset-x-0 top-0  px-[30px] bg-white border-b">
          <div className="flex  py-5 items-center">
            <div className="text-black flex justify-start flex-1">
              <Image
                src={logo}
                alt="logo"
                width={150}
                height={150}
                className="w-auto h-auto"
              />
            </div>
            <div className="flex justify-center flex-1">
              <nav>
                <ul class="hidden flex-row gap-8 checked:border-b-2 md:flex">
                  {link.map((l) => (
                    <li
                      key={l.label}
                      class=" text-black font-base hover:text-orange-500 transition"
                    >
                      <Link href={l.href} class="navbar">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="text-black flex flex-row gap-[20px] items-center">
                <Link href="admin/profile" className="font-semibold">
                  Hi admin
                </Link>
                <Link href="admin/profile" className="font-semibold">
                  <Image src={logout} height={30} alt="logout" width={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
