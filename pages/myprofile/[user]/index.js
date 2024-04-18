import React, { useState, useEffect } from "react";
import Image from "next/image";
import Headeruser from "@/components/Headeruser";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { myProductCard as MyProductCard } from "@/components/ProductCard";

export default function MyProfile() {
  const router = useRouter();
  const { user } = router.query;
  const [me, setMe] = useState({});
  const [product, setproduct] = useState({});

  const data = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/api/users/${user}`);
      setMe(res.data);
      const product = await axios.get(
        `http://localhost:2000/api/products/user/${user}`
      );
      setproduct(product.data);
      console.log(res.data);
      console.log(product.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      data();
    }
  }, [user]);
  const renderProducts = () => {
    if (!product.products) {
      return null;
    }

    return <MyProductCard products={product.products} />;
  };
  return (
    <div>
      <Headeruser />
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
        <div className="hidden lg:flex flex-1 justify-end mt-4">
          <Link
            href={"/report"}
            className="border w-[100px] p-2 text-center absolute rounded-lg mr-28 bg-slate-100"
          >
            Report
          </Link>
          <Link
            href={`/editprofile/${me._id}`}
            className="border p-2 absolute rounded-lg"
          >
            Edit profile
          </Link>
        </div>
      </div>
      <div className="flex flex-row px-3 py-2 items-center">
        <div className="flex justify-start flex-1">
          <h1 className="text-3xl font-semibold">Listing </h1>
          <h1 className="ml-3 inline-flex text-3xl text-red-600 font-semibold">
            {product.countproduct}
          </h1>
        </div>
      </div>
      <div>{renderProducts()}</div>
    </div>
  );
}
