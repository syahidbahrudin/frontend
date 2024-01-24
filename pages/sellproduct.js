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
  const router = useRouter();
  const { id } = router.query;
  const [selectedCategory, setCategory] = useState(category[0]);
  const [selectedCondition, setCondition] = useState(condition[0]);
  const [files, setFiles] = useState([]);
  const dropRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropRef.current.style.backgroundColor = "lightblue"; // Visual feedback
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropRef.current.style.backgroundColor = "white"; // Reset background
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropRef.current.style.backgroundColor = "white"; // Reset background

    const droppedFiles = event.dataTransfer.files;
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    console.log(files);
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };

  const send = async () => {
    try {
      axios.post(``);
    } catch (error) {
      console.log("hi", error);
    }
  };
  return (
    <div className=" pb-11">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[3%] pb-[7%] px-4 ">
        <h1 className="text-center font-semibold text-4xl mb-6">New Listing</h1>
      </div>
      <div className="mt-[-6%]">
        <div className="max-w-3xl mx-auto">
          <div className=" rounded-xl border border-gray-200 p-10 bg-white w-full text-center gap-">
            <div
              ref={dropRef}
              className="dropzone  border border-dashed rounded-md h-[200px] bg-gray-50 flex flex-col justify-center items-center"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <PhotoIcon height={50} width={50} className="text-gray-400" />
              <label htmlFor="" className="text-gray-500">
                Drag and drop an image up to 10 images
              </label>
            </div>
            <div className="mt-7">
              {files.length > 0 && (
                <ul className="grid grid-cols-5 gap-3">
                  {files.map((file) => (
                    <div key={file.name} className="relative rounded-xl">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="pic"
                        width={115}
                        height={115}
                        className=" rounded-xl min-w-[115px] min-h-[115px] max-h-[115px]"
                      />
                      <button
                        className="absolute top-2 right-5"
                        onClick={() => handleDeleteFile(file)}
                      >
                        <XMarkIcon
                          width={20}
                          height={20}
                          className="bg-gray-50/40 rounded-full p-1 hover:bg-gray-50"
                        />
                      </button>
                    </div>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-7">
              <label className="text-[#64748B] ">Click </label>
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white  text-[#22D3EE]  hover:underline"
              >
                <span>Browse</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  onChange={(e) =>
                    setFiles((prevFiles) => [...prevFiles, ...e.target.files])
                  }
                  className="sr-only"
                />
              </label>
              <label className="text-[#64748B] ">
                {" "}
                to search your file.Minimum 1600px width recommended.
              </label>
            </div>
          </div>
        </div>
        <div className="mt-10 max-w-xl mx-auto">
          <div className=" flex justify-center items-center flex-col">
            <div className=" w-full gap-6 flex flex-col">
              <div className="flex flex-col gap-2">
                <label className="text-start text-[#64748B]">Title</label>
                <input
                  className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                  placeholder="Enter Title"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-start text-[#a5aab1]">Price</label>
                <input
                  className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                  placeholder="Enter Price"
                />
              </div>

              <div className="w-full flex flex-row gap-5">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Category</label>
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
                  <label className="text-start text-[#64748B]">Condition</label>
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
                  className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                  placeholder="Enter Location"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text text-[#64748B]">Description</label>
                <textarea
                  className="outline-none border rounded-lg py-2 px-2 w-full  h-40 max-h-40 overflow-auto placeholder:text-[#CBD5E1]"
                  placeholder="Type your description"
                ></textarea>
              </div>
              <div className="w-full flex flex-row gap-5">
                <button className="w-1/2 bg-[#E11D48] py-3 text-white rounded-lg text-lg font-semibold">
                  Discard
                </button>
                <button className="w-1/2 bg-[#22D3EE] py-3 text-white rounded-lg text-lg font-semibold">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
