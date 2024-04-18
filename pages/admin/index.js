import SearchBar from "@/components/TopBackgroud";
import Headeradmin from "../../components/Headeradmin";
import React, { useState, useEffect } from "react";
import { UsersIcon, BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import axios from "axios";

export default function Dashboard() {
  const [active, setActive] = useState(0);
  const [blocked, setBlocked] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:2000/api/products/"
        );
        const userResponse = await axios.get(
          "http://localhost:2000/api/users/"
        );

        setActive(userResponse.data.activeUsersCount);
        setBlocked(userResponse.data.blockedUsersCount);
        setTotalProducts(productResponse.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Headeradmin />
        <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[4.5%] pb-[4.5%] px-4 ">
          <h1 className="text-center font-semibold text-4xl ">Dashboard</h1>
        </div>
      </div>
      <div className="flex flex-row px-3 gap-3 py-4">
        <div className="w-1/3 h-[200px] bg-[#94A3B8] p-6 rounded-lg space-y-10">
          <h1 className="text-white text-3xl">Active user</h1>
          <p className="text-white text-7xl flex items-center">
            <UsersIcon width={70} height={70} className="inline-block mr-3" />
            {active}
          </p>
        </div>
        <div className="w-1/3 h-[200px bg-[#1E293B] p-6 rounded-lg space-y-10">
          <h1 className="text-white text-3xl">Blocked user</h1>
          <p className="text-white text-7xl flex items-center">
            <UsersIcon width={70} height={70} className="inline-block mr-3" />
            {blocked}
          </p>
        </div>
        <div className="w-1/3 h-[200px bg-[#E11D48] p-6 rounded-lg space-y-10">
          <h1 className="text-white text-3xl">Total product selling</h1>
          <p className="text-white text-7xl flex items-center">
            <BuildingStorefrontIcon
              width={70}
              height={70}
              className="inline-block mr-3"
            />
            {totalProducts}
          </p>
        </div>
      </div>
    </div>
  );
}
