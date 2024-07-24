import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/Input";
import SelectOption from "../components/ui/SelectOption";
import ProductCard from "../components/ProductCard";
import { axiosInstance } from "../hooks/useApi";

export const PackageCatalog = () => {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const getAllProducts = async () => {
    try {
      const response = await axiosInstance.get(
        `/travel-package/table/${limit}&${page}`,
        {
          params: {
            search: search,
            category: filterByCategory,
          },
        }
      );

      const result = response?.data?.data?.rows;

      setProductList(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [search, filterByCategory, page, limit]);

  const categories = ["Family", "Honeymoon", "Solo"];

  const filterOptions = categories.map((category) => {
    return {
      value: category,
      label: category,
    };
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="title flex flex-col justify-center text-center items-center gap-2 py-7">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Choose Your Favorite Adventure!
            </h1>
            <h1 className="text-xl text-gray-400">
              Make your holiday more memorable
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-3 px-4 py-7 ">
            <div className="lg:w-3/4">
              <Input
                placeholder="Search your favorite adventure..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                className={"border-2"}
              />
            </div>
            <div className="lg:w-1/4">
              <SelectOption
                options={filterOptions}
                default_value=""
                onChange={(e) => setFilterByCategory(e.target.value)}
                firstOption="All Status"
                className={"border-2"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {productList?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex items-center space-x-4 my-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={productList.length < limit}
            className={`px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
