import React, { useEffect } from "react";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import { useState } from "react";
import cart from "../public/icon/cart.svg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import { storageKey } from "./constants";
import {
  ArrowLeftStartOnRectangleIcon,
  ShoppingBagIcon
} from "@heroicons/react/20/solid";

export default function Headeruser() {
  const router = useRouter();
  const { id } = router.query;
  const { userData, setUserData } = useUser();
  const [user, setUser] = useState([]);
  const refreshToken = async () => {
    try {
      if (userData && userData.refreshToken) {
        const res = await axios.post(
          "http://localhost:2000/api/users/refresh",
          {
            token: userData.accessToken
          }
        );
        console.log("sdzc", userData.refreshToken);
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
    router.replace("/");
  };

  return (
    <div className="max-w-[1280px]">
      <div className="fixed inset-x-0 top-0 z-30 px-[30px] bg-white border-b">
        <div className="flex  py-5 items-center">
          <div className="text-black flex flex-row justify-start flex-1">
            <Link href="/home" className="flex flex-row gap-2">
              <Image
                src={logo}
                alt="logo"
                width={150}
                height={30}
                className="w-auto h-auto"
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center">
            <div className="text-black flex flex-row items-center gap-[15px] ">
              <Link href={`/myprofile/${user.id}`} className="font-semibold">
                Hi, {userData.userStudID ? userData.userStudID : "Guest"}
              </Link>
              <div>
                <Link href={"/"}>
                  <ShoppingBagIcon
                    width={30}
                    height={35}
                    className="inline-block text-gray-400"
                  />
                </Link>
              </div>
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
        </div>
      </div>
    </div>
  );
}
