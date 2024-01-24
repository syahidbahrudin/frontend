import Headeruser from "@/components/Headeruser";
import React from "react";
import { Fragment, useState, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
  PhotoIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import index from "../profileuser/[id]";

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
export default function SellProduct() {
  const [productName, setproductName] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [meetup, setmeetup] = useState("");
  const [productDesc, setproductDesc] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [selectedCategory, setCategory] = useState(category[0]);
  const [selectedCondition, setCondition] = useState(condition[0]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = event.dataTransfer.files;
    handleImageFiles(droppedFiles);
  };

  const onfileSelected = (event) => {
    event.preventDefault();
    const files = event.target.files;

    if (!files) {
      console.error("No files selected");
      return;
    }

    handleImageFiles(files);
  };
  const handleImageFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (!images.some((e) => e.name === files[i].name)) {
        convertToBase64(files[i], (base64Data) => {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
              file: files[i]
            }
          ]);

          setBase64Images((prevBase64Images) => [
            ...prevBase64Images,
            { name: files[i].name, data: base64Data }
          ]);
        });
      }
    }
  };
  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      callback(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  function deleteImage(index) {
    setImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
    });
  }
  const submit = async (event) => {
    event.preventDefault();
    console.log("Image", base64Images);
    if (
      !base64Images ||
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

    const formData = new FormData();
    for (let i = 0; i < base64Images.length; i++) {
      formData.append(`productImage${i + 1}`, base64Images[i]);
    }
    formData.append("user", id);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCat", selectedCategory.name);
    formData.append("productCond", selectedCondition.name);
    formData.append("meetup", meetup);
    formData.append("productDesc", productDesc);
    try {
      await axios.post(`http://localhost:2000/api/products/`, formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.progress * 100);
        },
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Create product success!");
      console.log("sent FormData", FormData);
      console.log("Before router.push");
      router.push(`/home`);
      console.log("After router.push");
    } catch (error) {
      toast.error("Failed to create", error.message);
      console.error("Error submitting data:", error);
    }
  };

  const discard = () => {
    router.push("/home");
  };
  return (
    <div className=" pb-11">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[3%] pb-[7%] px-4 ">
        <h1 className="text-center font-semibold text-4xl mb-6">New Listing</h1>
      </div>
      <form onSubmit={submit}>
        <div className="mt-[-6%]">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-gray-200 p-10 bg-white w-full text-center gap-">
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className="border border-dashed rounded-md h-48 bg-gray-50 flex flex-col justify-center items-center"
              >
                {isDragging ? (
                  <span>Drop images here </span>
                ) : (
                  <>
                    Drag & drop image here or{" "}
                    <span
                      role="button"
                      onClick={() => fileInputRef.current.click()}
                      className="text-[#22D3EE] hover:underline"
                    >
                      Browse
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="files"
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={onfileSelected}
                />
              </div>
              <div className="grid grid-cols-5 gap-3 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative rounded-xl">
                    <span
                      onClick={() => deleteImage(index)}
                      className="absolute top-2 right-2 cursor-pointer text-red-500"
                    >
                      &times;
                    </span>
                    <img
                      src={image.url}
                      alt={image.name}
                      className="rounded-xl w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-xl mx-auto">
            <div className=" flex justify-center items-center flex-col">
              <div className=" w-full gap-6 flex flex-col">
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Title</label>
                  <input
                    onChange={(e) => setproductName(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#a5aab1]">Price</label>
                  <input
                    onChange={(e) => setproductPrice(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Price"
                  />
                </div>

                <div className="w-full flex flex-row gap-5">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-start text-[#64748B]">
                      Category
                    </label>
                    <Listbox value={selectedCategory} onChange={setCategory}>
                      <div className=" mt-1">
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
                          <Listbox.Options className="absolute mt-[-3px] ml-[2px]  max-h-60 w-[274px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                  <>
                                    <div className="flex flex-row justify-between">
                                      <div
                                        className={`block truncate text-sm ${
                                          active ? "font-medium" : "font-normal"
                                        }`}
                                      >
                                        {categoryOption.name}
                                      </div>
                                      {active ? (
                                        <div className="inset-y-0 left-0 flex items-center  text-gray-500">
                                          <CheckIcon
                                            className="h-5 w-5 inline-block"
                                            aria-hidden="true"
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                  </>
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
                    <Listbox value={selectedCondition} onChange={setCondition}>
                      <div className=" mt-1">
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
                          <Listbox.Options className="absolute mt-[-3px] ml-[2px]  max-h-60 w-[274px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                  <>
                                    <div className="flex flex-row justify-between">
                                      <div
                                        className={`block truncate text-sm ${
                                          active ? "font-medium" : "font-normal"
                                        }`}
                                      >
                                        {conditionOption.name}
                                      </div>
                                      {active ? (
                                        <div className="inset-y-0 left-0 flex items-center  text-gray-500">
                                          <CheckIcon
                                            className="h-5 w-5 inline-block"
                                            aria-hidden="true"
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                  </>
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
                    onChange={(e) => setmeetup(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Location"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text text-[#64748B]">Description</label>
                  <textarea
                    onChange={(e) => setproductDesc(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full  h-40 max-h-40 overflow-auto placeholder:text-[#CBD5E1]"
                    placeholder="Type your description"
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
