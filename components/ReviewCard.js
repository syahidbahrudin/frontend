import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ReviewCard() {
  const router = useRouter();
  const { id } = router.query;
  const [reviews, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReview = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const productResponse = await axiosInstance.get(`/products/${id}`);
        setProduct(productResponse.data);

        const user = productResponse.data.user;
        console.log(productResponse.data);
        if (user) {
          const userResponse = await axiosInstance.get(`/reviews/${product}`);
          setUser(userResponse.data);
        }
      }
    } catch (error) {
      console.error("Error fetching product or user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReview();
    }
  }, [id]);
  const renderReview = () => {
    return reviews.map((review) => {
      <div key={review.id} className="border rounded-lg p-3">
        <h1 className="font-semibold">Comments:</h1>
        <p>{review.comment}</p>
      </div>;
    });
  };
  return (
    <div className="max-w-[500px] mx-auto my-4">
      <h1 className="text-center text-2xl font-semibold pb-4">
        Customer Review
      </h1>
      {renderReview()}
    </div>
  );
}
