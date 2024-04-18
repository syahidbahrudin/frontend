import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";
import Headeruser from "@/components/Headeruser";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxDotFilled } from "react-icons/rx";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const [products, setProduct] = useState([]);
  const [user, setUser] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const productResponse = await axiosInstance.get(`/products/${id}`);
        setProduct(productResponse.data);

        const user = productResponse.data.user;
        console.log(productResponse.data);
        if (user) {
          const userResponse = await axiosInstance.get(`/users/${user}`);
          setUser(userResponse.data);
        }
      }
    } catch (error) {
      console.error("Error fetching product or user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      const deleting = axios.delete(`http://localhost:2000/api/products/${id}`);
      console.log("Delete Success");
      toast.success("Delete Success");
      router.push(`/myprofile/${user._id}`);
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${seconds} seconds ago`;

    return formattedDate;
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? products.productImage.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === products.productImage.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const renderProduct = () => {
    return (
      <>
        <Headeruser />
        <div className="mt-3 flex py-5 px-10 space-x-10">
          <div className="flex flex-1">
            <div className="w-full">
              <div className="w-full aspect-[5/4] mx-auto  group relative">
                {products.productImage && products.productImage.length > 0 && (
                  <div
                    style={{
                      backgroundImage: `url(${products.productImage[currentIndex].url})`
                    }}
                    className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                  ></div>
                )}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl  cursor-pointer ">
                  <div className="bg-black/20 text-white rounded-full w-10 h-10 flex items-center justify-center ">
                    <FiChevronLeft
                      onClick={prevSlide}
                      className="w-8 h-8 mr-1"
                    />
                  </div>
                </div>
                <div className="hidden group-hover:block  absolute top-[50%] -translate-x-0 translate-y-[-50%] right-4  text-2xl  cursor-pointer  ">
                  <div className="bg-black/20 text-white rounded-full w-10 h-10 flex items-center justify-center ">
                    <FiChevronRight
                      onClick={nextSlide}
                      className="w-8 h-8 ml-1"
                    />
                  </div>
                </div>
                <div className="flex justify-center py-2 absolute inset-x-0 bottom-0">
                  {products.productImage &&
                    products.productImage.length > 0 &&
                    products.productImage.map((slide, slideIndex) => (
                      <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer ${
                          slideIndex === currentIndex
                            ? "text-[#E11D48]"
                            : "text-[#64748B]"
                        }`}
                      >
                        <RxDotFilled />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex flex-1">
              <div className="flex flex-col w-full">
                <div className="flex flex-grow flex-1 flex-col gap-5">
                  <div className="flex flex-row">
                    <div className="flex justify-start flex-1 text-[#64748B] items-center">
                      {products.productCat}
                    </div>
                    <div className="flex justify-end gap-4 flex-1 items-start">
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 px-4 py-1 border rounded-lg bg-red-500 text-white"
                      >
                        <TrashIcon height={15} width={15} />
                        Delete
                      </button>
                      <a
                        href={`/editproduct/${products._id}`}
                        className="flex items-center gap-1 px-4 py-1 border rounded-lg"
                      >
                        <PencilIcon height={15} width={15} />
                        Edit
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-3xl font-semibold">
                      {products.productName}
                    </h2>
                    <h1 className="text-4xl font-semibold text-[#E11D48]">
                      RM {products.productPrice}
                    </h1>
                    <p className="text-sm">
                      Listed {formatDate(products.createdAt)} |{" "}
                      {user && (
                        <a
                          href={`/profileuser/${products.user}`}
                          className="text-[#22D3EE]"
                        >
                          {user.userName}
                        </a>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div>
                      <h1 className="font-semibold">Condition</h1>
                      <p>{products.productCond}</p>
                    </div>
                    <div>
                      <h1 className="font-semibold">Meet-up Location</h1>
                      <p>{products.meetup}</p>
                    </div>
                  </div>
                  <div className="max-w-[90%]">
                    <h1 className="font-semibold">Description</h1>
                    <p>{products.productDesc}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-1">
                    <a
                      href={`tel:${user.userPhoneNumber}`}
                      className="bg-[#E11D48] text-white  p-4 text-center w-full rounded-lg text-xl font-medium"
                    >
                      Call Seller
                    </a>
                  </div>
                  <div className="flex flex-1">
                    <a
                      href={`https://wa.me/${user.PhoneNumber}`}
                      className="bg-[#22D3EE] text-white  p-4 text-center w-full rounded-lg text-xl font-medium"
                    >
                      Chat with Seller
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div>{renderProduct()}</div>
    </div>
  );
}
