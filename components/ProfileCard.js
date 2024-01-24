import { useFetchUsers } from "@/src/features/useFetch";
import Image from "next/image";

export default function ProfileCard() {
  const { data: users, isLoading } = useFetchUsers();

  const renderProfiles = () => {
    return users.map((user) => {
      return (
        <div key={user.id} className="border p-3 rounded-xl flex flex-col">
          <div className="w-full min-h-[300px] bg-white  relative">
            <Image
              src={user.profilePicture}
              className="bg-cover bg-center rounded-xl "
              alt="image"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col py-2 ">
            <h1 className="font-semibold">{user.profileName}</h1>
            <p className="text-[#64748B] text-sm">{user.userStudID}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="px-3">
      <div className="grid grid-cols-4 gap-4">
        {renderProfiles()}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
