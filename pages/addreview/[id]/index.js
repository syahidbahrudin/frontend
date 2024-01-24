import React, { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import Headeruser from "@/components/Headeruser";
import Link from "next/link";

export default function Read() {
  const router = useRouter();
  const { id } = router.query;
  const [review, setReview] = React.useState({
    comment: "",
    product: id
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onPost = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:2000/api/reviews/${id}`,
        review
      );
      console.log("Review success", response.data);
      router.replace(`/productdetail/${id}`);
    } catch (error) {
      console.log("Review failed", error);

      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (review.comment.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [review]);
  return (
    <div className=" pb-11">
      <Headeruser />
      <div className="">
        <div className="mt-10 max-w-xl mx-auto">
          <div className=" flex justify-center items-center flex-col">
            <div className=" w-full gap-6 flex flex-col">
              <div className="w-full flex flex-row gap-5">
                <h1 className="text-center font-semibold text-4xl mb-6">
                  Review the product
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text text-[#64748B]">Comment</label>
                <textarea
                  className="outline-none border rounded-lg py-2 px-2 w-full  h-40 max-h-40 overflow-auto placeholder:text-[#CBD5E1]"
                  placeholder="Type your comment"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="w-full flex flex-row gap-5">
                <Link
                  href={`/productdetail/${id}`}
                  className="w-1/2 text-center bg-[#E11D48] py-3 text-white rounded-lg text-lg font-semibold"
                >
                  Cancel
                </Link>
                <button
                  onClick={onPost}
                  className="w-1/2 bg-[#22D3EE] py-3 text-white rounded-lg text-lg font-semibold"
                >
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
