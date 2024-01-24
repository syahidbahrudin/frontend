import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({ setSearch }) {
  return (
    <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 py-[5%] px-4 ">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white border rounded-lg shadow-lg w-full ">
          <div className="flex justify-between items-center p-2">
            <input
              type="text"
              onChange={({ currentTarget: input }) => setSearch(input.value)}
              className="w-full text-xl outline-none"
              placeholder="Search everything and anything"
            />
            <MagnifyingGlassIcon
              width={20}
              height={20}
              className="text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
