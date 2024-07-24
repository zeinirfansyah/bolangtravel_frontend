import React, { useEffect, useState } from "react";
import img_pagoda from "../assets/images/pagoda.jpg";
import dayjs from "dayjs";
import { useAuthStore } from "../stores/authStore";
import { Button } from "../components/ui/Button";
import { axiosInstance } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

export const Profile = () => {
  const [historyData, setHistoryData] = useState([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState(1);
  const { user, token } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const getHistory = async () => {
    try {
      const response = await axiosInstance.get("/booking/booking-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response?.data?.data;

      setHistoryData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const detailHistory = historyData?.filter(
    (history) => history?.id === selectedHistoryId
  );

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 min-h-screen">
        <div className="flex flex-col lg:gap-6 my-4">
          <div className="flex flex-col justify-center items-center lg:flex-row gap-12 mt-12">
            <div className="w-full lg:w-1/3 px-4">
              <div className="flex flex-col gap-4 bg-white shadow border rounded-3xl p-4 outline-dashed outline-primary outline-2 outline-offset-8">
                <img
                  src={img_pagoda}
                  alt="pagoda"
                  className="w-[400px] h-[180px] object-cover rounded-3xl"
                />
                <h1 className="text-center text-xl font-semibold">
                  Total Transaction :{" "}
                  {historyData?.filter((history) => history?.status === "paid")
                    .length || 0}
                </h1>
              </div>
            </div>
            <div className="space-y-6 w-full lg:w-2/3 px-4">
              <div className="flex flex-col lg:flex-row gap-5 w-full">
                <div className="flex flex-col gap-5 w-full lg:w-1/2">
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
                </div>
                <div className="flex flex-col gap-5 w-full lg:w-1/2">
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
              <div className="my-2 lg:flex justify-end">
                <Button className="bg-secondary text-white hover:bg-primary lg:w-[200px] flex justify-center items-center gap-2 ">
                  <Edit size={20} className="text-white" /> Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <div>
            <div className="flex flex-col gap-6  px-4 ">
              <h1 className="text-xl lg:text-2xl font-semibold ">
                Booking History
              </h1>
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="max-h-[60vh] border p-4 rounded-3xl overflow-auto flex flex-col gap-4 lg:w-1/2">
                    {historyData?.map((history) => (
                      <div
                        key={history?.id}
                        onClick={() => setSelectedHistoryId(history?.id)}
                        className="border-2 rounded-3xl 2 p-4 cursor-pointer hover:shadow-lg"
                      >
                        <div className="flex justify-end">
                          <p className="text-sm text-gray-500">
                            {dayjs(history?.created_at).format("DD MMM YYYY")}
                          </p>
                        </div>
                        <ul>
                          <li>{history?.travel_packages?.title}</li>
                          <li>{dayjs(history?.date).format("DD MMM YYYY")}</li>
                          <div className="flex justify-between">
                            <li>{history?.travel_packages?.price}</li>
                            <li
                              className={`capitalize ${
                                history?.status === "unpaid"
                                  ? "text-yellow-500"
                                  : history?.status.toLowerCase() === "paid"
                                  ? "text-green-500"
                                  : history?.status.toLowerCase() === "pending"
                                  ? "text-cyan-500"
                                  : "text-red-500"
                              }`}
                            >
                              {history?.status}
                            </li>
                          </div>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="order-first lg:order-last lg:w-1/2">
                    {detailHistory?.map((history) => (
                      <div
                        key={history?.id}
                        className="border-b-2 lg:border-none px-4 py-4 lg:py-0"
                      >
                        <div className="flex justify-center my-8 outline-dashed outline-2 outline-primary outline-offset-8">
                          <img
                            src={`http://localhost:3000/${history?.travel_packages?.thumbnail}`}
                            alt={history?.travel_packages?.title}
                            className="w-full h-[120px] object-cover "
                          />
                        </div>
                        <ul className="space-y-2">
                          <li>
                            <h3 className="text-lg font-bold">
                              {history?.travel_packages?.title}
                            </h3>
                          </li>
                          <li className="font-semibold">
                            IDR {history?.travel_packages?.price}
                          </li>
                          <li className="flex justify-between">
                            <h3>
                              {dayjs(history?.date).format("DD MMM YYYY")}
                            </h3>
                            <h3>{history?.travel_packages?.location}</h3>
                          </li>
                        </ul>
                        <div className="my-7">
                          {history?.status === "unpaid" ? (
                            <Button
                              title={"Pay Now"}
                              onClick={() =>
                                navigate(`/payment/${history?.id}`)
                              }
                              className="bg-secondary hover:bg-primary text-white"
                            >
                              Pay Now
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className={`capitalize cursor-default ${
                                history?.status.toLowerCase() === "paid"
                                  ? "text-green-500 outline-dashed outline-2 outline-green-500 outline-offset-4"
                                  : history?.status.toLowerCase() === "pending"
                                  ? "text-cyan-500 outline-dashed outline-2 outline-cyan-500 outline-offset-4"
                                  : "text-red-500 outline-dashed outline-2 outline-red-500 outline-offset-4"
                              }`}
                            >
                              {history?.status}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
