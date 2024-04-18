import React from "react";
import Image from "next/image";
import love from "../public/icon/love.svg";

const myProductCard = ({ products }) => {
  if (!products) {
    return null;
  }
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1 sm:gap-2 lg:gap-4 px-3 pb-3">
      {products.map((product) => (
        <div
          className="border p-2 xl:p-3 rounded-xl flex flex-col "
          key={product._id}
        >
          <div className=" xl:max-h-[300px] lg:min-h-[200px] md:min-h-[100px] min-h-[50px] bg-white  relative">
            <a href={`/myproductdetail/${product._id}`}>
              <Image
                src={product.productImage[0].url}
                className="bg-cover h-full bg-center rounded-xl"
                width={600}
                height={600}
                alt="pic"
              />
            </a>
            <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2 text-xs md:text-sm xl:text-base">
              RM {product.productPrice}
            </h1>
          </div>
          <div className="flex flex-row items-center py-1">
            <div className="flex justify-start flex-1 flex-col">
              <h1 className="xl:text-lg md:text-base text-sm font-semibold">
                {product.productName}
              </h1>
              <h2 className="text-[#64748B] lg:text-sm text-xs">
                {product.productCond}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const allProductCard = ({ products }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1 sm:gap-2 lg:gap-4 px-3 pb-3">
      {products.map((product) => (
        <div
          className="border p-2 xl:p-3 rounded-xl flex flex-col "
          key={product._id}
        >
          <div className=" xl:max-h-[300px] lg:min-h-[200px] md:min-h-[100px] min-h-[50px] bg-white  relative">
            <a href={`/productdetail/${product._id}`}>
              <Image
                src={product.productImage[0].url}
                className="bg-cover h-full bg-center rounded-xl"
                width={600}
                height={600}
                alt="pic"
              />
            </a>
            <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2 text-xs md:text-sm xl:text-base">
              RM {product.productPrice}
            </h1>
          </div>
          <div className="flex flex-row items-center py-1">
            <div className="flex justify-start flex-1 flex-col">
              <h1 className="xl:text-lg md:text-base text-sm font-semibold">
                {product.productName}
              </h1>
              <h2 className="text-[#64748B] lg:text-sm text-xs">
                {product.productCond}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const adminProductCard = ({ products }) => {
  return (
    <div className="px-3 pb-3">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <div className="border p-3 rounded-xl flex flex-col">
              <div className=" xl:max-h-[300px] lg:min-h-[200px] md:min-h-[100px] min-h-[50px] bg-white  relative">
                <a href={`/admin/adminproduct/${product._id}`}>
                  <Image
                    src={product.productImage[0].url}
                    className="bg-cover h-full bg-center rounded-xl"
                    width={600}
                    height={600}
                    alt="pic"
                  />
                </a>
                <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2 text-xs md:text-sm xl:text-base">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const userProductCard = ({ products }) => {
  if (!products) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1 sm:gap-2 lg:gap-4 px-3 pb-3">
      {products.map((product) => (
        <div
          className="border p-2 xl:p-3 rounded-xl flex flex-col "
          key={product._id}
        >
          <div className=" xl:max-h-[300px] lg:min-h-[200px] md:min-h-[100px] min-h-[50px] bg-white  relative">
            <a href={`/productdetail/${product._id}`}>
              <Image
                src={product.productImage[0].url}
                className="bg-cover h-full bg-center rounded-xl"
                width={600}
                height={600}
                alt="pic"
              />
            </a>
            <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2 text-xs md:text-sm xl:text-base">
              RM {product.productPrice}
            </h1>
          </div>
          <div className="flex flex-row items-center py-1">
            <div className="flex justify-start flex-1 flex-col">
              <h1 className="xl:text-lg md:text-base text-sm font-semibold">
                {product.productName}
              </h1>
              <h2 className="text-[#64748B] lg:text-sm text-xs">
                {product.productCond}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const useradminProductCard = ({ products }) => {
  if (!products) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1 sm:gap-2 lg:gap-4 px-3 pb-3">
      {products.map((product) => (
        <div
          className="border p-2 xl:p-3 rounded-xl flex flex-col "
          key={product._id}
        >
          <div className=" xl:max-h-[300px] lg:min-h-[200px] md:min-h-[100px] min-h-[50px] bg-white  relative">
            <a href={`/admin/adminproduct/${product._id}`}>
              <Image
                src={product.productImage[0].url}
                className="bg-cover h-full bg-center rounded-xl"
                width={600}
                height={600}
                alt="pic"
              />
            </a>
            <h1 className="text-white px-3 py-1 bg-[#E11D48] font-semibold rounded-lg absolute bottom-3 left-2 text-xs md:text-sm xl:text-base">
              RM {product.productPrice}
            </h1>
          </div>
          <div className="flex flex-row items-center py-1">
            <div className="flex justify-start flex-1 flex-col">
              <h1 className="xl:text-lg md:text-base text-sm font-semibold">
                {product.productName}
              </h1>
              <h2 className="text-[#64748B] lg:text-sm text-xs">
                {product.productCond}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
module.exports = {
  myProductCard,
  adminProductCard,
  allProductCard,
  userProductCard,
  useradminProductCard
};
