import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const fetchUsers = async () => {
    setIsloading(true);
    try {
      setTimeout(async () => {
        const usersResponse = await axiosInstance.get("/users/all");
        setUsers(usersResponse.data);
        setIsloading(false);
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    data: users,
    isLoading: isLoading
  };
};

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const fetchProducts = async () => {
    setIsloading(true);
    try {
      setTimeout(async () => {
        const productsResponse = await axiosInstance.get("/products/");
        setProducts(productsResponse.data);
        setIsloading(false);
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    data: products,
    isLoading: isLoading
  };
};

const useFetchCarts = () => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const fetchCarts = async () => {
    setIsloading(true);
    try {
      setTimeout(async () => {
        const cartsResponse = await axiosInstance.get("/carts");
        setCarts(cartsResponse.data);
        setIsloading(false);
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return {
    data: carts,
    isLoading: isLoading
  };
};

const useFetchReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const fetchreviews = async () => {
    setIsloading(true);
    try {
      setTimeout(async () => {
        const cartsreviewsponse = await axiosInstance.get("/reviews");
        setReviews(cartsreviewsponse.data);
        setIsloading(false);
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchreviews();
  }, []);

  return {
    data: reviews,
    isLoading: isLoading
  };
};

module.exports = {
  useFetchUsers,
  useFetchProducts,
  useFetchReviews,
  useFetchCarts
};
