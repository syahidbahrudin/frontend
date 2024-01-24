import Headeruser from "@/components/Headeruser";
import React from "react";

export default function EditListing() {
  return (
    <div className=" pb-11">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[3%] pb-[7%] px-4 ">
        <h1 className="text-center font-semibold text-4xl mb-6">
          Edit Listing
        </h1>
      </div>
      <div className="mt-[-6%]">
        <div className="max-w-3xl mx-auto">
          <div className=" rounded-xl border border-gray-200 p-10 bg-white w-full">
            <div className="">
              <div className="grid grid-cols-5 gap-4">
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg ">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
                {/* Box 1 */}
                <div className="bg-gray-100 border border-dashed border-gray-200 aspect-square rounded-lg">
                  {/* Your box content goes here */}
                </div>
              </div>

              <div className="mt-4 flex leading-6 text-[#64748B] justify-center">
                <span className="text-sm">
                  Drag and drop an image up to 10 images, or{" "}
                </span>
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-normal text-[#22D3EE]  hover:underline hover:underline-[#22D3EE]"
                >
                  <span className="ml-1.5 text-sm flex items-start">
                    Browse
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>

              <p className="text-sm leading-5 text-center text-[#64748B]">
                Minimum 1600px width recommended. Max 10MB each (20MB for
                videos)
              </p>
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
                <label className="text-start text-[#64748B]">Price</label>
                <input
                  className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                  placeholder="Enter Price"
                />
              </div>
              <div className="w-full flex flex-row gap-5">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Category</label>
                  <input
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter Category"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Condition</label>
                  <input
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Select Condition"
                  />
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
                  Cancel
                </button>
                <button className="w-1/2 bg-[#22D3EE] py-3 text-white rounded-lg text-lg font-semibold">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
