import React from "react";
import Headeradmin from "@/components/Headeradmin";
import Filter from "@/components/Filter";
import Product from "@/components/Product";
import TopBackgroud from "@/components/TopBackgroud";
import SearchBar from "@/components/SearchBar";

export default function Products() {
  return (
    <div className="">
      <Headeradmin />
      <div className="flex flex-col ">
        <div className="flex flex-col">
          <SearchBar />
          <div className="my-4">
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
}
