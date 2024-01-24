import Headeruser from "@/components/Headeruser";
import React from "react";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";

const college = [
  { name: "Select College" },
  { name: "College of Engineering" },
  { name: "UNITEN Business School" },
  { name: "College of Computing & Informatics" }
];

const allCourses = {
  placeholder: "Select Course",
  coe: [
    "Bachelor of Civil Engineering (Hons)",
    "Bachelor of Electrical Power Engineering (Hons)",
    "Bachelor of Electrical & Electronics Engineering (Hons)",
    "Bachelor of Mechanical Engineering (Hons)",
    "Diploma in Electrical Engineering",
    "Diploma in Mechanical Engineering",
    "Foundation in Engineering"
  ],
  ubs: [
    "Bachelor of Accounting (Hons)",
    "Bachelor of Finance (Hons)",
    "Bachelor of International Business (Hons)",
    "Bachelor of Business Administration in Marketing (Hons)",
    "Bachelor of Business Administration (Hons) in Human Resource Management",
    "Bachelor of Business Administration (Hons) in Entrepreneurship & Venture Management"
  ],
  cci: [
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

export default function EditProfile() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [colleged, setColleged] = useState(college[0]);
  const [userName, setUserName] = useState("");
  const [profilePicture, setprofilePicture] = useState();
  const [userStudID, setuserStudID] = useState();
  const [userEmail, setuserEmail] = useState("");
  const [profileAbout, setprofileAbout] = useState("");
  const [userCourse, setuserCourse] = useState("");
  const [userCollege, setuserCollege] = useState("");
  const [userPhoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`http://localhost:2000/api/users/${id}`).then((res) => {
      setUserName(res.data.userName);
      setprofilePicture(res.data.profilePicture);
      setuserEmail(res.data.userEmail);
      setuserCourse(res.data.userCourse),
        setuserCollege(res.data.userCollege),
        setprofileAbout(res.data.profileAbout);
      setPhoneNumber(res.data.userPhoneNumber);
      setuserStudID(res.data.userStudID);
      console.log(userName);
    });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if selectedFile is not null or undefined
    if (selectedFile) {
      setprofilePicture(URL.createObjectURL(selectedFile));
    } else {
      // Handle the case when selectedFile is null (e.g., set a default URL)
      setprofilePicture("default-profile-url.jpg");
    }
  };

  const fileRemoved = () => {
    setprofilePicture(null);
    toast.success("Picture Removed");
  };
  const submit = async (event) => {
    event.preventDefault();
    if (
      !userName ||
      !userStudID ||
      !userEmail ||
      !profileAbout ||
      !userPhoneNumber
    ) {
      toast.error("You need to complete the form");
    } else {
      setuserCourse(selectedCourse);
      setuserCollege(colleged.name);
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      formData.append("userCollege", userCollege);
      formData.append("userCourse", userCourse);
      formData.append("userPhoneNumber", userPhoneNumber);
      formData.append("userStudID", userStudID);
      formData.append("profileAbout", profileAbout);
      formData.append("userName", userName);
      await axios.put(`http://localhost:2000/api/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      router.replace(`/myprofile/${id}`);
    }
  };

  const cancel = () => {
    console.log("Cancel button clicked");
    router.replace(`/myprofile/${id}`);
  };
  useEffect(() => {
    switch (colleged?.name) {
      case "College of Engineering":
        setCourseOptions(allCourses.coe);
        setSelectedCourse(""); // Reset selected course when college changes
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
  return (
    <div className=" pb-11">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100 pt-[3%] pb-[7%] px-4 ">
        <h1 className="text-center font-semibold text-4xl mb-6">
          Edit your profile
        </h1>
      </div>
      <div className="mt-[-6%]">
        <form onSubmit={submit}>
          <div className="max-w-[40rem] mx-auto ">
            <div className="flex flex-row items-center rounded-xl border border-gray-200 p-10 bg-white w-full ">
              <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden ">
                <img
                  className="object-cover object-center h-32 w-full "
                  src={
                    profilePicture
                      ? profilePicture instanceof File
                        ? URL.createObjectURL(profilePicture)
                        : `http://localhost:2000/uploads/${profilePicture}`
                      : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  alt="Profile"
                />
              </div>
              <div className="space-y-1 ml-6">
                <h1 className="text-xl text-[#64748B]">Profile Photo</h1>
                <p className="text-sm text-[#94A3B8]">Recommended 300x300</p>
                <div className="space-x-3">
                  <button
                    onClick={fileRemoved}
                    className="border px-3 py-2 rounded-md text-gray-400"
                  >
                    Remove
                  </button>
                  <label className="border px-3 py-2 rounded-md text-gray-400 cursor-pointer">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-xl mx-auto">
            <div className=" flex justify-center items-center flex-col">
              <div className=" w-full gap-6 flex flex-col">
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Username</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter username"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">
                    Student ID
                  </label>
                  <input
                    value={userStudID}
                    onChange={(e) => setuserStudID(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter student ID"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">Email</label>
                  <input
                    value={userEmail}
                    onChange={(e) => setuserEmail(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-start text-[#64748B]">
                    Phone Number
                  </label>
                  <input
                    value={userPhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full placeholder:text-[#CBD5E1]"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="">
                  <label className="text-[#64748B] text-sm">
                    Student College
                  </label>
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
                        <Listbox.Options className="absolute z-30  mt-[-1px] ml-[2px]  max-h-60 w-[568px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                  <label className="text-[#64748B] text-sm">
                    Student Course
                  </label>
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
                        <Listbox.Options className="absolute mt-[-3px] ml-[2px]  max-h-60 w-[568px] overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
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

                <div className="flex flex-col gap-2">
                  <label className="text text-[#64748B]">Bio</label>
                  <textarea
                    value={profileAbout}
                    onChange={(e) => setprofileAbout(e.target.value)}
                    className="outline-none border rounded-lg py-2 px-2 w-full  h-40 max-h-40 overflow-auto placeholder:text-[#CBD5E1]"
                  ></textarea>
                </div>
                <div className="w-full flex flex-row gap-5">
                  <button
                    onClick={cancel}
                    type="button"
                    className="w-1/2 bg-[#E11D48] py-3 text-center text-white rounded-lg text-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#22D3EE] py-3 text-white rounded-lg text-lg font-semibold"
                  >
                    Done
                  </button>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
