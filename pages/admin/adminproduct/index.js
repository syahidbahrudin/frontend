import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { adminProductCard as AdminProductCard } from "@/components/ProductCard";
import Headeradmin from "@/components/Headeradmin";

export default function Home() {
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
      return null; // or return a loading indicator or an empty state message
    }

    return <AdminProductCard products={obj.products} />;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Headeradmin />
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
