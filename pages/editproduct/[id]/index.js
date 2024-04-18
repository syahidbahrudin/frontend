import Headeruser from "@/components/Headeruser";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const category = [
  { name: "Select Category" },
  { name: "Service" },
  { name: "Electronic" },
  { name: "Fashion" },
  { name: "Service" },
  { name: "Sport" },
  { name: "Furniture" },
  { name: "Food" }
];
const condition = [
  { name: "Select Condition" },
  { name: "Brand new" },
  { name: "Like new" },
  { name: "Lightly used" },
  { name: "Well used" },
  { name: "Heavily used" }
];

export default function EditProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [meetup, setMeetup] = useState("");
  const [user, setUser] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [selectedCondition, setSelectedCondition] = useState(condition[0]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/products/${productId}`
      );
      const productData = response.data;
      setUser(productData.user);
      setProductName(productData.productName);
      setProductPrice(productData.productPrice);
      setMeetup(productData.meetup);
      setProductDesc(productData.productDesc);
      setSelectedCategory(
        category.find((cat) => cat.name === productData.productCat)
      );
      setSelectedCondition(
        condition.find((cond) => cond.name === productData.productCond)
      );
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    if (
      !productName ||
      !productPrice ||
      !selectedCategory ||
      !selectedCondition ||
      !meetup ||
      !productDesc
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const requestData = {
      user: user,
      productName: productName,
      productPrice: productPrice,
      productCat: selectedCategory.name,
      productCond: selectedCondition.name,
      meetup: meetup,
      productDesc: productDesc
    };

    try {
      const response = await axios.put(
        `http://localhost:2000/api/products/${id}`,
        requestData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      toast.success("Edit product success!");
      router.push(`/myproductdetail/${id}`);
    } catch (error) {
      toast.error("Failed to edit product", error.message);
      console.log("Error submitting data:", error);
    }
  };

  const discard = () => {
    router.push(`/myproductdetail/${id}`);
  };

  return (
    <div className="pb-11">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[3%] pb-[7%] px-4 ">
        <h1 className="text-center font-semibold text-4xl mb-6">
          Edit Listing
        </h1>
      </div>
      <form onSubmit={submit}>
        <div className="mt-[-6%] px-3 ">
          <div className="mt-10 max-w-xl mx-auto bg-white p-5 rounded-xl">
            <div className="flex justify-center items-center flex-col">
              <div className="w-full gap-6 flex flex-col">
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Title</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Title"
                    value={productName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#a5aab1]">Price</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Price"
                    value={productPrice}
                  />
                </div>
                <div className="w-full flex flex-row gap-5">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-start text-[#64748B]">
                      Category
                    </label>
                    <Listbox
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                    >
                      <div className="mt-1">
                        <Listbox.Button className="z-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-gray-400 text-sm">
                            {selectedCategory.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-[-3px] ml-[2px] max-h-60 w-[274px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {category.map((categoryOption, categoryId) => (
                              <Listbox.Option
                                key={categoryId}
                                className={({ active }) =>
                                  `cursor-default select-none py-2 pl-10 pr-4 text-base ${
                                    active
                                      ? "bg-gray-100 font-medium"
                                      : "text-gray-500"
                                  }`
                                }
                                value={categoryOption}
                              >
                                {({ active }) => (
                                  <div className="flex flex-row justify-between">
                                    <div
                                      className={`block truncate text-sm ${
                                        active ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {categoryOption.name}
                                    </div>
                                    {active && (
                                      <div className="inset-y-0 left-0 flex items-center text-gray-500">
                                        <CheckIcon
                                          className="h-5 w-5 inline-block"
                                          aria-hidden="true"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-start text-[#64748B]">
                      Condition
                    </label>
                    <Listbox
                      value={selectedCondition}
                      onChange={setSelectedCondition}
                    >
                      <div className="mt-1">
                        <Listbox.Button className="z-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate text-gray-400 text-sm">
                            {selectedCondition.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-[-3px] ml-[2px] max-h-60 w-[274px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {condition.map((conditionOption, conditionId) => (
                              <Listbox.Option
                                key={conditionId}
                                className={({ active }) =>
                                  `cursor-default select-none py-2 pl-10 pr-4 text-base ${
                                    active
                                      ? "bg-gray-100 font-medium"
                                      : "text-gray-500"
                                  }`
                                }
                                value={conditionOption}
                              >
                                {({ active }) => (
                                  <div className="flex flex-row justify-between">
                                    <div
                                      className={`block truncate text-sm ${
                                        active ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {conditionOption.name}
                                    </div>
                                    {active && (
                                      <div className="inset-y-0 left-0 flex items-center text-gray-500">
                                        <CheckIcon
                                          className="h-5 w-5 inline-block"
                                          aria-hidden="true"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">
                    Meet-up Location
                  </label>
                  <input
                    onChange={(e) => setMeetup(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Location"
                    value={meetup}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text text-[#64748B]">Description</label>
                  <textarea
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full h-40 max-h-40 overflow-auto placeholder:text-[#CBD5E1]"
                    placeholder="Type your description"
                    value={productDesc}
                  ></textarea>
                </div>
                <div className="w-full flex flex-row gap-5">
                  <button
                    onClick={discard}
                    className="w-1/2 bg-[#E11D48] py-3 text-white rounded-lg text-lg font-semibold"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#22D3EE] py-3 text-white rounded-lg text-lg font-semibold"
                  >
                    Post
                  </button>
                </div>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
