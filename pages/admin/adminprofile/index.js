import React from "react";
import Headeradmin from "@/components/Headeradmin";
import TopBackgroud from "@/components/TopBackgroud";
import Filter from "@/components/Filter";
import ProfileCard from "@/components/ProfileCard";
import SearchBar from "@/components/SearchBar";

export default function ProfileList() {
  return (
    <div className="">
      <Headeradmin />
      <div className="flex flex-col ">
        <div className="flex flex-col">
          <SearchBar />
          <div className="my-6">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}
