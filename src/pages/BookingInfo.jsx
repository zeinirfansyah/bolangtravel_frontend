import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { DOMAIN_URL, axiosInstance } from "../hooks/useApi";

export const BookingInfo = () => {
  const { id, date } = useParams();
  const { token, user } = useAuthStore((state) => state);
  const [product, setProduct] = useState({});

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
  }, []);

  const createBooking = async () => {
    try {
      const response = await axiosInstance.post(
        `/booking?travel_package_id=${id}`,
        {
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Booking created successfully");
        navigate(`/payment/${response.data.data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = (event) => {
    event.preventDefault();
    createBooking();
  };

  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-10 items-center px-6 min-h-screen">
        <div className="title flex flex-col justify-center items-center gap-2">
          <div className="flex flex-row gap-10 mb-4 mt-7">
            <span className="bg-gray-200 text-xl lg:text-3xl text-gray-500 rounded-xl px-4 py-1 outline outline- outline-2 outline-offset-4 transition-all duration-500">
              1
            </span>
            <span className="bg-gray-200 text-xl lg:text-3xl text-gray-500 rounded-xl px-4 py-1 transition-all duration-500 ">
              2
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-center">
            Booking Information
          </h1>
          <h2 className="text-l lg:text-xl text-center text-gray-500">
            Please fill out the information below
          </h2>
        </div>
        <div className="flex flex-col gap-10 justify-end items-center">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-end items-center">
            <div
              id="bookingInfo"
              className="flex flex-col gap-5 w-full lg:pe-20 pb-10 lg:pb-auto border-b-2 lg:border-b-0 lg:border-r-2 border-grbg-gray-200 "
            >
              <img
                src={`${DOMAIN_URL}${product?.thumbnail}`}
                alt="bali"
                className="rounded-lg lg:rounded-[30px] w-[40rem] h-[17.5rem] object-cover"
              />
              <div className="text-info flex flex-row justify-between items-center w-full">
                <div className="title-info flex flex-col">
                  <h1 className="text-xl lg:text-2xl">{product?.title}</h1>
                  <h1 className="text-l lg:text-xl text-gray-500">
                    {product?.location} - {product?.duration} Days
                  </h1>
                  <h1 className="text-l lg:text-xl text-gray-500"></h1>
                  <h1 className="text-l lg:text-xl text-gray-500">
                    Date: {date}
                  </h1>
                </div>
                <div className="price-info">
                  <h1 className="text-xl lg:text-2xl text-secondary">
                    {product?.price}
                  </h1>
                </div>
              </div>
            </div>
            <div
              id="bookingForm"
              className="flex flex-col gap-5 w-full lg:ps-20"
            >
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Full Name</label>
                <p className="outline-dashed outline-gray-300 text-gray-600 outline-2 bg-white rounded-lg p-4 w-full focus:outline-secondary focus:ring-0 focus:bg-white transition-all duration-500">
                  {user?.fullname}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <p className="outline-dashed outline-gray-300 text-gray-600 outline-2 bg-white rounded-lg p-4 w-full focus:outline-secondary focus:ring-0 focus:bg-white transition-all duration-500">
                  {user?.email}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="phone">Phone Number</label>
                <p className="outline-dashed outline-gray-300 text-gray-600 outline-2 bg-white rounded-lg p-4 w-full focus:outline-secondary focus:ring-0 focus:bg-white transition-all duration-500">
                  {user?.phone}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="address">Address</label>
                <p className="outline-dashed outline-gray-300 text-gray-600 outline-2 bg-white rounded-lg p-4 w-full focus:outline-secondary focus:ring-0 focus:bg-white transition-all duration-500">
                  {user?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 w-full lg:w-1/4 my-5">
            <Button
              onClick={(e) => handleBooking(e)}
              className="bg-secondary text-white hover:bg-primary"
            >
              Continue
            </Button>
            <Button
              onClick={() => navigate(-1)}
              className="bg-lightGray text-secondary border-2 border-secondary hover:border-red-400 hover:text-red-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
