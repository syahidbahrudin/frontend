import Filter from "@/components/Filter";
import Headeruser from "@/components/Headeruser";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { allProductCard as AllProductCard } from "@/components/ProductCard";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [search, setSearch] = useState("");
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterCat, setfilterCat] = useState("");
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const url = `http://localhost:2000/api/products?sort=${sort.sort},${sort.order}&productCat=${filterCat}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data.products);
      } catch (err) {
        console.log(err);
      }
    };

    getAllProduct();
  }, [sort, filterCat, search]);

  const renderProducts = () => {
    if (!obj.products) {
      return null;
    }

    return (
      <div className="pt-2 lg:pt-0">
        <AllProductCard products={obj.products} user={id} />
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Headeruser />
        <SearchBar setSearch={(search) => setSearch(search)} />
        <Filter
          notfilter={true}
          sort={sort}
          setSort={(sort) => setSort(sort)}
          filterCat={filterCat}
          productCat={obj.productCat ? obj.productCat : []}
          setfilterCat={(filterCat) => setfilterCat(filterCat)}
        />
        {renderProducts()}
      </div>
    </div>
  );
}
