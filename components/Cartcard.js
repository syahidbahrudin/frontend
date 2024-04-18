import React, { useState, useEffect } from "react";
import Image from "next/image";
import love from "../public/icon/love.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Cartcard() {
  const router = useRouter();
  const { id } = router.query;
  const [res, setRes] = useState([]);

  const liked = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2000/api/products/userlike/${id}`
      );
      setRes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    liked();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-4 pt-6 px-3">
        <div className="border p-3 rounded-xl flex flex-col">
          {res.length > 0 ? (
            res.map((product, index) => (
              <div
                key={index}
                className="w-full min-h-[300px] bg-white relative"
              >
                <a href={`/productdetail/${product._id}`}>
                  <Image
                    src={product.productImage[0].url} // assuming imageUrl is the property for image URL
                    className="bg-cover bg-center rounded-xl"
                    width={600}
                    height={600}
                    alt="pic"
                  />
                </a>
                <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-[80px] left-2">
                  RM {product.productPrice}
                </h1>
                <div className="flex flex-row items-center py-2">
                  <div className="flex justify-start flex-1 flex-col">
                    <h1 className="text-lg font-semibold">
                      {product.productName}
                    </h1>
                    <h2 className="text-[#64748B] text-sm">
                      {product.productCond}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
