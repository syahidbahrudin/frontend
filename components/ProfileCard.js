import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProfileCard({ users }) {
  return (
    <div className="px-3">
      <div className="grid grid-cols-4 gap-4">
        {users &&
          users.map((user) => (
            <Link key={user.id} href={`adminprofile/${user._id}`}>
              <div className="border p-3 rounded-xl flex flex-col">
                <div className="-z-10 w-full min-h-[300px] bg-white relative">
                  <Image
                    src={
                      user.profilePicture ||
                      "https://i.pinimg.com/564x/a3/e4/7c/a3e47c7483116543b6fa589269b760df.jpg"
                    }
                    className=" bg-cover bg-center rounded-xl "
                    alt="image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex flex-col py-2 ">
                  <h1 className="font-semibold">{user.userName} </h1>
                  <p className="text-[#64748B] text-sm">
                    {user.userStudID}
                  </p>{" "}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
