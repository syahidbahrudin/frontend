import React from "react";
import Product from "@/components/Product";
import Image from "next/image";
import Headeruser from "@/components/Headeruser";
import { useRouter } from "next/router";
import { useFetchUsers } from "@/src/features/useFetch";
import Link from "next/link";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  const { data: users, setLoading } = useFetchUsers();
  return (
    <div className="">
      <Headeruser />
      <div className="bg-gradient-to-r from-red-200 via-gray-300 to-cyan-100  h-[150px] flex justify-center items-center px-4 "></div>
      <div className="px-3 flex-row flex">
        <div className="flex justify-start">
          <div className="flex flex-row  -mt-[6.5%]">
            <div class=" w-40 h-40  border-4 border-white rounded-full overflow-hidden">
              <img
                class="object-cover object-center h-40"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Woman looking front"
              />
            </div>
            <div className="space-y-4 ml-7 mt-[]">
              <div>
                <h1 className="text-[30px] font-semibold">syahidbahrudin</h1>
                <p className="text-gray-500">
                  Computer Science | College of computing and informatic
                </p>
              </div>
              <div>
                <p className="text-gray-500 max-w-[60%]">
                  Sell my preloved item & bundle. Friendly & easy to make a
                  deal. Postage / Cod accept. Prefer to buy a combo with a good
                  offer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-end mt-4">
          <Link href="/profile/" className="border p-2 absolute rounded-lg">
            Edit profile
          </Link>
        </div>
      </div>
      <div className="flex flex-row px-3 py-2 items-center">
        <div className="flex justify-start flex-1">
          <h1 className="text-3xl font-semibold">Listing</h1>
        </div>
        <div className="flex justify-end flex-1">
          <div className="w-full border rounded-lg">
            <div className="flex justify-between py-2 px-3">
              <input
                className="w-full text-lg outline-none"
                placeholder="Search everything and anything"
              />
              <Link className="ml-2 text-base text-white px-4 py-1 rounded-md bg-[#22D3EE]">
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Product cardType={false} />
      </div>
    </div>
  );
}
