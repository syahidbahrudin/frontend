import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import Headeradmin from "@/components/Headeradmin";
import { useradminProductCard as UseradminProductCard } from "@/components/ProductCard";
export default function MyProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [me, setMe] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);
  const [buttonColor, setButtonColor] = useState("primary");
  const [product, setproduct] = useState({});

  const blockUser = async (blockAction) => {
    try {
      const isActive = blockAction === "block" ? "Block" : "Active";
      const blockResponse = await axios.put(
        `http://localhost:2000/api/users/block/${id}`,
        { isActive }
      );
      setIsBlocked(blockAction === "block"); // Update isBlocked state based on the action
      setButtonColor(blockAction === "block" ? "809EBC" : "132B68"); // Update button color based on action
      toast.success(
        blockAction === "block" ? "User blocked" : "User unblocked"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to block/unblock user");
    }
  };

  const data = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/api/users/${id}`);
      setMe(res.data);
      setIsBlocked(res.data.isActive === "Block");
      const products = await axios.get(
        `http://localhost:2000/api/products/user/${id}`
      );

      setproduct(products.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      data();
    }
  }, [id]);

  return (
    <div>
      <Headeradmin />
      <Toaster position="top-center" />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100  h-[150px] flex justify-center items-center px-4 "></div>
      <div className="px-3 flex-row flex">
        <div className="flex justify-start">
          <div className="flex flex-row  -mt-[9%]">
            <div className="w-40 h-40 border-4 border-white rounded-full overflow-hidden flex items-center justify-center">
              <img
                className="object-cover object-center h-full"
                src={
                  me.profilePicture
                    ? me.profilePicture instanceof File
                      ? URL.createObjectURL(me.profilePicture)
                      : `http://localhost:2000/uploads/${me.profilePicture}`
                    : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt="profile image"
              />
            </div>

            <div className="space-y-4 ml-7 mt-[]">
              <div>
                <h1 className="text-[30px] font-semibold">{me.userName}</h1>
                <p className="text-gray-500">
                  {me.userCourse} | {me.userCollege}
                </p>
              </div>
              <div>
                <p className="text-gray-500 max-w-[60%]">{me.profileAbout}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-end mt-4">
          <div className="flex flex-1 justify-end mt-4">
            <button
              className={`border p-2 absolute rounded-lg bg-[#${buttonColor}] `}
              onClick={() => blockUser(isBlocked ? "unblock" : "block")}
            >
              {isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-3 py-2 items-center">
        <div className="flex justify-start flex-1">
          <h1 className="text-3xl font-semibold">Listing </h1>
        </div>
        <div className="flex justify-end flex-1">
          <div className="w-full border rounded-lg">
            <div className="flex justify-between py-2 px-3">
              <input
                className="w-full text-lg outline-none"
                placeholder="Search everything and anything"
              />
              <button className="ml-2 text-base text-white px-4 py-1 rounded-md bg-[#22D3EE]">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UseradminProductCard products={product.products} />
      </div>
    </div>
  );
}
