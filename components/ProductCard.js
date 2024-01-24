import React from "react";
import Image from "next/image";
import { useFetchProducts } from "../src/features/useFetch";
import love from "../public/icon/love.svg";
import Link from "next/link";

const myProductCard = ({ products, me }) => {
  if (!products) {
    // Handle the case where products is undefined or null
    return null;
  }
  return products.map((product) => {
    return (
      <a key={product._id} href={`/productdetail/${product._id}`}>
        <div className="border p-3 rounded-xl flex flex-col">
          <div className="w-full min-h-[300px] bg-white  relative">
            <Image
              src={product.productImage[0].url}
              className="bg-cover bg-center rounded-xl"
              width={600}
              height={600}
              alt="pic"
            />
            <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2">
              RM {product.productPrice}
            </h1>
          </div>
          <div className="flex flex-row items-center py-2">
            <div className="flex justify-start flex-1 flex-col">
              <h1 className="text-lg font-semibold">{product.productName}</h1>
              <h2 className="text-[#64748B] text-sm">{product.productCond}</h2>
            </div>
            <div className="flex justify-end flex-1">
              <Image
                src={love}
                alt="love"
                width={30}
                height={30}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </a>
    );
  });
};

const allProductCard = ({ products }) => {
  return (
    <div className="px-3 pb-3">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <a key={product._id} href={`/productdetail/${product._id}`}>
              <div className="border p-3 rounded-xl flex flex-col">
                <div className="w-full min-h-[300px] bg-white  relative">
                  <Image
                    src={product.productImage[0].url}
                    className="bg-cover bg-center rounded-xl"
                    width={600}
                    height={600}
                    alt="pic"
                  />
                  <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2">
                    RM {product.productPrice}
                  </h1>
                </div>
                <div className="flex flex-row items-center py-2">
                  <div className="flex justify-start flex-1 flex-col">
                    <h1 className="text-lg font-semibold">
                      {product.productName}
                    </h1>
                    <h2 className="text-[#64748B] text-sm">
                      {product.productCond}
                    </h2>
                  </div>
                  <div className="flex justify-end flex-1">
                    <Image
                      src={love}
                      alt="love"
                      width={30}
                      height={30}
                      className="h-auto w-auto"
                    />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
module.exports = {
  myProductCard,
  allProductCard
};
