import React from "react";
import SearchBar from "./SearchBar";

export default function TopBackgroud() {
  return (
    <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 py-[5%] px-4 ">
      <div className="max-w-[1400px] mx-auto">
        <SearchBar />
      </div>
    </div>
  );
}
