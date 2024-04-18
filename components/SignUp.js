import React, { useEffect, Fragment, useState } from "react";
import Image from "next/image";
import logo from "../public/assets/logo.svg";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const college = [
  { name: "Select College" },
  { name: "College of Engineering" },
  { name: "UNITEN Business School" },
  { name: "College of Computing & Informatics" }
];

const allCourses = {
  placeholder: "Select Course",
  coe: [
    "Select Course",
    "Bachelor of Civil Engineering (Hons)",
    "Bachelor of Electrical Power Engineering (Hons)",
    "Bachelor of Electrical & Electronics Engineering (Hons)",
    "Bachelor of Mechanical Engineering (Hons)",
    "Diploma in Electrical Engineering",
    "Diploma in Mechanical Engineering",
    "Foundation in Engineering"
  ],
  ubs: [
    "Select Course",
    "Bachelor of Accounting (Hons)",
    "Bachelor of Finance (Hons)",
    "Bachelor of International Business (Hons)",
    "Bachelor of Business Administration in Marketing (Hons)",
    "Bachelor of Business Administration (Hons) in Human Resource Management",
    "Bachelor of Business Administration (Hons) in Entrepreneurship & Venture Management"
  ],
  cci: [
    "Select Course",
    "Foundation in Information Technology",
    "Foundation in Computer Science",
    "Diploma in Computer Science",
    "Bachelor of Computer Science (Systems and Networking) (Hons)",
    "Bachelor of Computer Science (Software Engineering) (Hons)",
    "Bachelor of Computer Science (Cyber Security) (Hons)",
    "Bachelor of Information Technology (Information Systems) (Hons)",
    "Bachelor of Information Technology (Visual Media) (Hons)",
    "Bachelor of Information Technology (Graphics & Multimedia) (Hons)"
  ]
};

export default function SignUp() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [colleged, setColleged] = useState(college[0]);
  const [userName, setUserName] = useState("");
  const [userStudID, setUserStudID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPass, setUserPass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    switch (colleged?.name) {
      case "College of Engineering":
        setCourseOptions(allCourses.coe);
        setSelectedCourse("");
        break;
      case "UNITEN Business School":
        setCourseOptions(allCourses.ubs);
        setSelectedCourse("");
        break;
      case "College of Computing & Informatics":
        setCourseOptions(allCourses.cci);
        setSelectedCourse("");
        break;
      default:
        setCourseOptions([]);
        setSelectedCourse("");
        break;
    }
  }, [colleged]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onSignup = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setSelectedCollege(colleged);

      // Validate form fields
      if (
        !userName ||
        !validateEmail(userEmail) ||
        !userStudID ||
        !colleged ||
        !selectedCourse ||
        selectedCourse === "Select Course" ||
        !userPhoneNumber ||
        !userPass
      ) {
        toast.error("Please fill in all the required fields correctly.");
      } else {
        const user = {
          userName,
          userEmail,
          userPass,
          userStudID,
          userCollege: colleged?.name,
          userCourse: selectedCourse,
          userPhoneNumber
        };

        const response = await axios.post(
          "http://localhost:2000/api/users/signup",
          user
        );

        router.push("/");
        toast.success("Registration Successful");
        console.log("Signup success", response.data);
      }
    } catch (error) {
      console.log("Signup failed", error);
      toast.error("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white border w-[450px] rounded-3xl px-8 py-5 max-w-[600px] mx-auto my-5">
      <div className="flex flex-col gap-6 w-full ">
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="logo"
            height={150}
            width={150}
            className="w-auto h-auto"
          />
        </div>
        <div>
          <h1 className="text-center text-3xl font-semibold text-[#64748B]">
            {loading ? "Processing" : "Sign Up Now"}
          </h1>
          <p className="text-center text-sm text-[#64748B]">
            Please fill up your detail below
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <form onSubmit={onSignup} className="space-y-3">
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">Username</label>
              <input
                type="text"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="Enter user name"
                id="userNamee"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">Email</label>
              <input
                type="email"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="Enter email address"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">Student ID</label>
              <input
                type="text"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="Enter student ID"
                id="userStudID"
                value={userStudID}
                onChange={(e) => setUserStudID(e.target.value)}
              />
            </div>
            <div className="">
              <label className="text-[#64748B] text-sm">Student College</label>
              <Listbox value={colleged} onChange={setColleged}>
                <div className=" mt-1 w-full">
                  <Listbox.Button className=" relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-gray-400 text-lg">
                      {colleged.name}
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
                    <Listbox.Options className="absolute z-30  mt-[-3px] ml-[2px]  max-h-60 w-[379px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {college.map((collegeOption, collegeId) => (
                        <Listbox.Option
                          key={collegeId}
                          className={({ active }) =>
                            `cursor-default select-none py-2 pl-10 pr-4 text-base ${
                              active
                                ? "bg-gray-100 font-medium"
                                : "text-gray-500"
                            }`
                          }
                          value={collegeOption}
                        >
                          {({ selected }) => (
                            <>
                              <div className="flex flex-row">
                                <div
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {collegeOption.name}
                                </div>
                                {selected ? (
                                  <div className="inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
            <div className="">
              <label className="text-[#64748B] text-sm">Student Course</label>
              <Listbox value={selectedCourse} onChange={setSelectedCourse}>
                <div className="mt-1 w-full">
                  <Listbox.Button className="z-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span
                      className={`block truncate ${
                        selectedCourse === "" ||
                        selectedCourse === allCourses.placeholder
                          ? "text-gray-500"
                          : "text-gray-400"
                      } text-lg`}
                    >
                      {selectedCourse === "" ||
                      selectedCourse === allCourses.placeholder
                        ? allCourses.placeholder
                        : selectedCourse}
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
                    <Listbox.Options className="absolute mt-[-3px] ml-[2px]  max-h-60 w-[379px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {courseOptions !== allCourses.placeholder &&
                        courseOptions.map((courseOption, courseId) => (
                          <Listbox.Option
                            key={courseId}
                            className={({ active }) =>
                              `cursor-default select-none py-2 pl-10 pr-4 text-base ${
                                active
                                  ? "bg-gray-100 font-medium"
                                  : "text-gray-500"
                              }`
                            }
                            value={courseOption}
                          >
                            {({ selected }) => (
                              <>
                                <div className="flex flex-row">
                                  <div
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {courseOption}
                                  </div>
                                  {selected ? (
                                    <div className="inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">Phone Number</label>
              <input
                type="tel"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="Enter phone number"
                id="userPhoneNumber"
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
              />
            </div>
            <div className="text-start flex flex-col gap-2">
              <label className="text-[#64748B] text-sm">Password</label>
              <input
                type="password"
                className="outline-none border rounded-md px-3 py-2 text-lg"
                placeholder="Enter password"
                id="userPass"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="border  text-base py-3 rounded-md w-full bg-[#22D3EE] text-white"
            >
              Register
            </button>
          </form>
        </div>
        <span className="text-center text-[#64748B]">
          Already have an account?
          <Link className="text-center text-[#22D3EE]" href="/">
            Login now
          </Link>
        </span>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
