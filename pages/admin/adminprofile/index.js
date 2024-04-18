import React, { useEffect, useState } from "react";
import Headeradmin from "@/components/Headeradmin";
import ProfileCard from "@/components/ProfileCard";
import SearchUser from "@/components/SearchUser";
import axios from "axios";

export default function ProfileList() {
  const [obj, setObj] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAlluser = async () => {
      try {
        const url = `http://localhost:2000/api/users?search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAlluser();
  }, [search]);

  const renderUsers = () => {
    if (!obj.users) {
      return null; // or return a loading indicator or an empty state message
    }

    return <UserProductCard products={product.products}  />;
  };
  return (
    <div className="">
      <Headeradmin />
      <div className="flex flex-col ">
        <div className="flex flex-col">
          <SearchUser setSearch={(search) => setSearch(search)} />
          <div className="my-6">
            <ProfileCard users={obj.users} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
