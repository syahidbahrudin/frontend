import React, { useState, useEffect } from "react";
import Headeruser from "@/components/Headeruser";
import { useRouter } from "next/router";
import { userProductCard as UserProductCard } from "@/components/ProductCard";
import axios from "axios";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [product, setproduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/users/${id}`);
        setUser(res.data);
        const products = await axios.get(
          `http://localhost:2000/api/products/user/${id}`
        );
        console.log(res.data);
        setproduct(products.data);
        console.log(res.data);
        console.log(products.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100  h-[150px] flex justify-center items-center px-4 "></div>
      <div className="px-3 flex-row flex">
        <div className="flex justify-start">
          <div className="flex flex-row  -mt-[9.5%]">
            <div class=" w-40 h-40  border-4 border-white rounded-full overflow-hidden">
              <img
                class="object-cover object-center h-40"
                src={
                  user.profilePicture ||
                  "https://i.pinimg.com/564x/a3/e4/7c/a3e47c7483116543b6fa589269b760df.jpg"
                }
                alt="Woman looking front"
              />
            </div>
            <div className="space-y-4 ml-7 mt-[]">
              <div>
                <h1 className="text-[30px] font-semibold">{user.userName}</h1>
                <p className="text-gray-500">
                  {user.userCourse} | {user.userCollege}
                </p>
              </div>
              <div>
                <p className="text-gray-500 max-w-[60%]">{user.profileAbout}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-3 py-2 items-center">
        <div className="flex justify-start flex-1">
          <h1 className="text-3xl font-semibold">Listing</h1>
          <h1 className="ml-3 inline-flex text-3xl text-red-600 font-semibold">
            {product.countproduct}
          </h1>
        </div>
      </div>
      <div>
        <UserProductCard products={product.products} />
      </div>
    </div>
  );
}
