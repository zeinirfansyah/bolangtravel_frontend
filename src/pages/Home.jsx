import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import img_family from "../assets/images/family.webp";
import img_beach from "../assets/images/beach.jpg";
import img_beach2 from "../assets/images/beach2.jpg";
import img_beach3 from "../assets/images/beach3.jpg";
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
      <div className="max-w-7xl mx-auto px-4 relative -lg:top-12">
        <div className="min-h-[80vh] flex flex-col lg:flex-row justify-center items-center gap-8">
          <div className="flex flex-col gap-6 justify-center items-center lg:items-start w-full lg:w-1/2">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl text-center font-semibold lg:font-normal lg:text-start">
                Discover the Wonders of Indonesia.
              </h1>
              <h1 className="hidden lg:block lg:text-5xl font-semibold text-center lg:text-start">
                Explore the Most Beautiful Homeland!
              </h1>
            </div>
            <p className="text-gray-600 text-center lg:text-start lg:text-xl ">
              Unleash Your Inner Explorer: Dive into Indonesia's Untamed Beauty,
              from Rainforest Canopy Walks to Volcano Summit Treks
            </p>
            <Button onClick={() => navigate("/travel-package")} className="w-[200px] py-3 bg-primary text-white">Get Started</Button>
          </div>
          <div className="w-full lg:w-1/2 justify-center items-center flex flex-col gap-4 order-first lg:order-last">
            <div className="w-full grid grid-cols-3 justify-center  items-center  gap-5">
              <img
                src={img_beach}
                alt="img_glassesroom"
                className="w-[420px] h-[300px] lg:w-[520px] lg:h-[400px] object-cover outline-dashed outline-2 outline-gray-400 rounded-es-[120px] rounded-se-[120px] outline-offset-4"
              />
              <img
                src={img_beach2}
                alt="img_glassesroom"
                className="w-[420px] h-[300px] lg:w-[520px] lg:h-[480px] object-cover outline-dashed outline-2 outline-gray-400 rounded-[120px] outline-offset-4"
              />
              <img
                src={img_beach3}
                alt="img_glassesroom"
                className="w-[420px] h-[300px] lg:w-[520px] lg:h-[400px] object-cover outline-dashed outline-2 outline-gray-400 rounded-ss-[120px] rounded-ee-[120px] outline-offset-4"
              />
            </div>
          </div>
        </div>
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
                className="outline-dashed outline-2 outline-gray-400 outline-offset-8 lg:rounded-br-[150px] rounded-lg max-h-[480px]"
              />
            </div>
            <div className="flex flex-col gap-7 lg:w-1/2">
              <div>
                <h1 className="text-2xl font-semibold">Happy Family</h1>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <Star fill="#FFC107" className="text-yellow-400" />
                  <Star fill="#FFC107" className="text-yellow-400" />
                  <Star fill="#FFC107" className="text-yellow-400" />
                  <Star fill="#FFC107" className="text-yellow-400" />
                  <Star fill="#FFC107" className="text-yellow-400" />
                </div>
                <h1 className="text-4xl">
                  "What a great trip with my family and I should try again next
                  time soon."
                </h1>
                <h1 className="text-2xl text-gray-400">
                  Rick Atsley, Musician
                </h1>
              </div>
              <Button onClick={() => navigate("/about")} className="w-[200px] py-3 bg-primary text-white">About Us</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
