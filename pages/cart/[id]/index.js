import Cartcard from "@/components/Cartcard";
import Headeruser from "@/components/Headeruser";
import React from "react";

export default function index() {
  return (
    <div>
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 py-[5%] px-4 ">
        <h1 className="text-center text-4xl font-semibold">Your Favourites</h1>
      </div>
      <Cartcard />
    </div>
  );
}
