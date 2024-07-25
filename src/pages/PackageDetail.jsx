import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DOMAIN_URL, axiosInstance } from "../hooks/useApi";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import DestinationCard from "../components/DestinationCard";
import Toast from "../components/ui/Toast";

export const PackageDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(`/travel-package/${id}`);

      const result = response?.data?.data;
      setProduct(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleBooking = () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }
    navigate(`/booking/${product?.id}/${selectedDate}`);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 min-h-screen">
        <div className="flex flex-col lg:gap-6 my-4">
          <div className="flex flex-col gap-3 max-w-5xl mx-auto py-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-center">
              {product?.title}
            </h1>
            <h1 className="text-l lg:text-xl text-center text-textGray">
              {product?.description}
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            {product && product?.destinations && (
              <img
                src={`${DOMAIN_URL}/${product?.destinations[0]?.thumbnail}`}
                alt={product?.destinations[0]?.thumbnail}
                data-size="auto"
                className="lazyload lazyloaded rounded-xl object-cover w-2/3 max-h-[560px]"
              />
            )}
            <div className="flex flex-col items-center justify-center gap-4 max-h-[560px]">
              {product && product?.destinations && (
                <img
                  src={`${DOMAIN_URL}/${product?.destinations[1]?.thumbnail}`}
                  data-size="auto"
                  alt={product?.destinations[1]?.thumbnail}
                  className="lazyload lazyloaded rounded-xl object-cover max-h-[260px]"
                />
              )}

              {product && product?.destinations && (
                <img
                  src={`${DOMAIN_URL}/${product?.destinations[2]?.thumbnail}`}
                  data-size="auto"
                  alt={product?.destinations[2]?.thumbnail}
                  className="lazyload lazyloaded rounded-xl object-cover max-h-[260px]"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row gap-7 justify-between py-7">
              {product && product?.destinations && (
                <div className="flex flex-col-reverse gap-6 lg:w-1/2">
                  {product?.rundowns.map((rundown) => (
                    <div key={rundown.id} className="space-y-1">
                      <h1 className="text-l lg:text-xl font-semibold">
                        {rundown?.title}
                      </h1>
                      <p className="text-sm lg:text-l text-textGray">
                        {rundown?.agenda}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-4 lg:w-1/3">
                <div className=" flex flex-col gap-2 w-full  lg:w-[24rem] shadow-md p-12 border rounded-2xl bg-white aos-init aos-animate">
                  <h2 className="font-semibold text-xl lg:text-2xl">
                    Start Booking
                  </h2>
                  <h1 className="font-semibold text-xl text-secondary">
                    {product?.price}
                  </h1>
                  <div className="w-full mt-4 grid gap-2">
                    <Input
                      type="date"
                      required
                      className="border-2 border-navy shadow p-3 rounded-xl"
                      placeholder="Select date"
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <Button
                      onClick={() => handleBooking()}
                      className="bg-secondary hover:bg-primary text-white"
                    >
                      Book
                    </Button>
                    <div id="error">
                      {error && (
                        <Toast text={error} backgroundColor="bg-red-200" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-4 py-7">
              <h1 className="text-xl font-semibold">Popular Destinations</h1>
              {product && product?.destinations && (
                <div className={`grid lg:grid-cols-4 gap-4`}>
                  {product?.destinations.slice(0, 4).map((destination) => (
                    <div key={destination?.id}>
                      <DestinationCard destination={destination} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
