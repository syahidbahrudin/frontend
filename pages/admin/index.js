import SearchBar from "@/components/TopBackgroud";
import Headeradmin from "../../components/Headeradmin";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Headeradmin />
        <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[3%] pb-[7%] px-4 ">
          <h1 className="text-center font-semibold text-4xl mb-6">Dashboard</h1>
        </div>
      </div>
      <div className="flex flex-row px-3 gap-3 py-4">
        <div className="w-1/3 h-[200px] bg-[#94A3B8] p-2 rounded-lg">
          <h1 className="text-white text-xl">Total User</h1>
          <p className="text-white">12</p>
        </div>
        <div className="w-1/3 h-[200px bg-[#1E293B] p-2 rounded-lg">
          <h1 className="text-white text-xl">Total item listing</h1>
          <p className="text-white">12</p>
        </div>
        <div className="w-1/3 h-[200px bg-[#E11D48] p-2 rounded-lg">
          <h1 className="text-white text-xl">Total sold item</h1>
          <p className="text-white">15</p>
        </div>
      </div>
    </div>
  );
}
