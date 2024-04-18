import React, { useEffect } from "react";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import { storageKey } from "./constants";
import {
  FlagIcon,
  PencilIcon,
  UserIcon,
  HeartIcon,
  BuildingStorefrontIcon,
  ArrowLeftStartOnRectangleIcon,
  ShoppingBagIcon,
  Bars3BottomRightIcon
} from "@heroicons/react/20/solid";

export default function Headeruser() {
  const router = useRouter();
  const { id } = router.query;
  const { userData, setUserData } = useUser();
  const [user, setUser] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const refreshToken = async () => {
    try {
      if (userData && userData.refreshToken) {
        const res = await axios.post(
          "http://localhost:2000/api/users/refresh",
          {
            token: userData.accessToken
          }
        );
        console.log(userData.refreshToken);
        const updatedUserData = {
          ...userData,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken
        };

        setUserData(updatedUserData);

        // Check if localStorage is available before using it
        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(updatedUserData));
        }

        console.log("Token refreshed", res.data);
        return res.data;
      } else {
        console.error("No valid refreshToken available");
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

  useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof window !== "undefined") {
      // Check for user data in storage on page load
      const storedUserData = localStorage.getItem(storageKey);
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    }

    if (userData.accessToken) {
      try {
        const decodedToken = jwtDecode(userData.accessToken);
        setUser(decodedToken);
        // Check token expiration and refresh if needed
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          refreshToken(); // Call your token refreshing logic here
        }
      } catch (error) {
        console.error("Error decoding token in Headeruser:", error);
      }
    }
  }, [userData.accessToken]);

  const logout = async () => {
    try {
      // Send a request to logout endpoint
      const res = await axios.post(`http://localhost:2000/api/users/logout`, {
        token: userData.refreshToken
      });

      // If the request is successful, clear local storage
      localStorage.removeItem("user_data");
      localStorage.removeItem("likedProducts");

      // Redirect the user to the homepage
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:max-w-[1280px] max-w-[]">
      <div className="fixed inset-x-0 top-0 z-30 px-[30px] bg-white border-b">
        <div className="flex  py-5 items-center">
          <div className="text-black flex flex-row justify-start flex-1">
            <Link href={`/home`} className="flex flex-row gap-2">
              <Image
                src={logo}
                alt="logo"
                width={150}
                height={30}
                className="w-auto h-auto"
              />
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 justify-end items-center">
            <div className="text-black flex flex-row items-center gap-[15px] ">
              <Link href={`/myprofile/${user.id}`} className="font-semibold">
                {userData.userStudID ? userData.userStudID : "Guest"}
              </Link>
              <div>
                <button onClick={logout}>
                  <ArrowLeftStartOnRectangleIcon
                    width={30}
                    height={35}
                    className="inline-block"
                  />
                </button>
              </div>

              <div className="">
                <Link
                  className="font-semibold text-white bg-red-500 px-3 py-2 rounded-md"
                  href={`/sellproduct/${user.id}`}
                >
                  Sell
                </Link>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 lg:hidden"
            onClick={toggleSidebar}
          >
            <span class="sr-only">Toggle Navigation</span>
            <Bars3BottomRightIcon width={30} height={30} />
          </button>
          <div
            id="docs-sidebar"
            className={`hs-overlay ${
              isSidebarOpen
                ? "hs-overlay-open translate-x-0"
                : "-translate-x-full"
            } transition-all duration-300 transform lg:hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-gray-100 border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full `}
          >
            <div class="px-6">
              <a
                class="flex-none text-xl font-semibold dark:text-white"
                href="#"
                aria-label="Brand"
              >
                <Image src={logo} />
              </a>
            </div>
            <nav
              class="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul class="space-y-1.5">
                <li className="text-[#64748B] text-base">
                  Hi, {user.userName}
                </li>
                <li>
                  <div className="border-b bg-gray-200  rounded-md p-2">
                    <UserIcon
                      height={25}
                      width={25}
                      className="inline-block text-[#64748B] mr-2"
                    />
                    <Link
                      href={`/myprofile/${user.id}`}
                      className="text-[#64748B]"
                    >
                      Profile
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="border-b bg-gray-200  rounded-md p-2">
                    <PencilIcon
                      height={25}
                      width={25}
                      className="inline-block text-[#64748B] mr-2"
                    />
                    <Link
                      href={`/editprofile/${user.id}`}
                      className="text-[#64748B]"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="border-b bg-gray-200  rounded-md p-2">
                    <FlagIcon
                      height={25}
                      width={25}
                      className="inline-block text-[#64748B] mr-2"
                    />
                    <Link href={"/report"} className="text-[#64748B]">
                      Report
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="border-b  rounded-md p-2 bg-red-600">
                    <BuildingStorefrontIcon
                      height={25}
                      width={25}
                      className="inline-block text-white mr-2"
                    />
                    <Link
                      href={`/sellproduct/${user.id}`}
                      className="font-medium text-white text-center"
                    >
                      Sell
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="border-b bg-gray-400  rounded-md p-2">
                    <ArrowLeftStartOnRectangleIcon
                      height={25}
                      width={25}
                      className="inline-block text-[#64748B] mr-2"
                    />
                    <button onClick={logout} className="text-gray-500">
                      Logout
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
