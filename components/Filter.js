import React from "react";
import Image from "next/image";
import all from "../public/icon/select-all.png";
import cat1 from "../public/icon/service.png";
import cat2 from "../public/icon/electronics.png";
import cat3 from "../public/icon/fashion.png";
import cat4 from "../public/icon/furniture.png";
import cat5 from "../public/icon/sports.png";
import cat6 from "../public/icon/fast-food.png";
import { useState } from "react";

const category = [
  {
    image: all,
    text: "All"
  },
  {
    image: cat1,
    text: "Service"
  },
  {
    image: cat2,
    text: "Electronic"
  },
  {
    image: cat3,
    text: "Fashion"
  },
  {
    image: cat4,
    text: "Furniture"
  },
  {
    image: cat5,
    text: "Sport"
  },
  {
    image: cat6,
    text: "Food"
  }
];

export default function Filter({ setfilterCat, sort, setSort }) {
  const [displayedText, setDisplayedText] = useState("All");
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };
  const onChange = (event) => {
    const clickedValue = event.currentTarget.value;

    // Only set filterCat to the newly clicked value, ensuring single selection
    setfilterCat(clickedValue);
    setDisplayedText(clickedValue);
    // Optional: Visually unselect other buttons (adapt selectors as needed)
    const buttons = document.querySelectorAll(".category-button"); // Assuming a class for category buttons
    buttons.forEach((button) => {
      button.classList.remove("selected"); // Remove any visual "selected" styling
      if (button.value === clickedValue) {
        button.classList.add("selected"); // Apply "selected" styling to the clicked button
      }
    });
  };
  return (
    <div className="">
      <div className="hidden lg:flex flex-row items-end  py-4 px-4">
        <div className="flex justify-start flex-1">
          <p className="bg-[#64748B] px-4 py-2 text-white rounded-lg font-normal">
            {displayedText}
          </p>
        </div>
        <div className="flex justify-center items-center flex-1 gap-5">
          {category.map((item) => (
            <button
              key={item.text}
              className="category-button border shadow-sm w-[50px] md:w-[75px] lg:w-[100px] p-3 rounded-lg flex flex-col justify-center items-center"
              value={item.text}
              onClick={onChange}
            >
              <Image src={item.image} height={50} width={50} alt="pic" />
              <span className="font-medium text-sm text-center">
                {item.text}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden lg:flex justify-end flex-1 px-4 py-2 ">
          <div className="flex flex-row items-center gap-3">
            <select
              onChange={onSelectChange}
              className="border py-2 px-3  rounded-lg "
              defaultValue={sort.sort}
            >
              <option className="py-2 px-3" value="productName">
                A - Z
              </option>
              <option className="py-2 px-3" value="productName,desc">
                Z - A
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
