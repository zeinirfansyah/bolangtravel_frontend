import React, { useEffect, useState } from "react";
import { ListStart } from "lucide-react";
import img_family from "../assets/images/family.webp";
import img_glassesroom from "../assets/images/glassesroom.webp";
import { Button } from "../components/ui/Button";
import FeaturedProductCard from "../components/FeaturedProductCard";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../hooks/useApi";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const getAllProducts = async () => {
    try {
      const response = await axiosInstance.get(
        `/travel-package/table/${limit}&${page}`,
        {
          params: {
            search: search,
            category: selectedCategory,
          },
        }
      );

      const result = response?.data?.data?.rows;

      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [search, selectedCategory, page, limit]);

  const navigate = useNavigate();
  return (
    <>
      <div
        id="home"
        className="overflow-hidden min-h-screen bg-cover bg-center bg-no-repeat text-center"
        style={{ backgroundImage: `url(${img_glassesroom})` }}
      >
        <div className="overflow-hidden h-screen bg-[#000] bg-opacity-70 ">
          <div className="max-w-7xl mx-auto px-4 h-screen p-4 flex items-center justify-center">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h1 className="text-2xl lg:text-4xl mt-10 font-bold text-center text-white">
                Discover the Wonders of Indonesia, Explore the Most Beautiful
                Homeland!
              </h1>
              <h4 className="text-xl font-light text-white">
                Unleash Your Inner Explorer: Dive into Indonesia&apos;s Untamed
                Beauty, from Rainforest Canopy Walks to Volcano Summit Treks
              </h4>
              <Button
                onClick={() => {
                  navigate("paket-wisata");
                }}
                title="Book Now"
                style="bg-secondary hover:bg-primary text-white max-w-[240px] mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Recommended</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {products
                ?.slice(0, 6)
                .filter((product) => product?.is_recommended === "true")
                .map((product) => (
                  <FeaturedProductCard key={product?.id} product={product} />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Featured Package</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products?.slice(0, 9).map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-14 items-center py-14">
            <div className="lg:w-1/4">
              <img
                src={img_family}
                alt="image14"
                className="outline-dashed outline-2 outline-darkGray outline-offset-8 lg:rounded-br-[150px] rounded-lg max-h-[480px]"
              />
            </div>
            <div className="flex flex-col gap-7 lg:w-1/2">
              <div>
                <h1 className="text-2xl font-semibold">Happy Family</h1>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <ListStart />
                </div>
                <h1 className="text-4xl">
                  What a great trip with my family and I should try again next
                  time soon ...
                </h1>
                <h1 className="text-2xl text-darkGray">
                  Rick Atsley, Musician
                </h1>
              </div>
              <Button
                onClick={() => {
                  navigate("tentang-kami");
                }}
                title="About Us"
                style="bg-secondary hover:bg-primary text-white max-w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
