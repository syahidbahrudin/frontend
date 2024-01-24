import React, { useState } from "react";
import {
  allProductCard as AllProductCard,
  myProductCard as MyProductCard
} from "../components/ProductCard";

export default function Product({ cardType, products }) {
  return (
    <div>
      {cardType ? (
        <AllProductCard products={products} />
      ) : (
        <MyProductCard products={products} />
      )}
    </div>
  );
}
