import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../hooks/useApi";
import { useAuthStore } from "../../stores/authStore";
import { StatCard } from "./_components/StatCard";
import { BookCheck, User } from "lucide-react";

export const Dashboard = () => {
  const { token, user } = useAuthStore((state) => state);

  const [bookingList, setBookingList] = useState(null);
  const [totalBooking, setTotalBooking] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUser, setTotalUser] = useState(0);

  const getAllBookings = async () => {
    const response = await axiosInstance.get(
      `/booking/table/${limit}&${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = response?.data;
    setBookingList(result?.data?.rows);
    setTotalBooking(result?.data?.count);
  };

  useEffect(() => {
    getAllBookings();
  }, [limit, page]);

  const getUsers = async () => {
    const response = await axiosInstance.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = response?.data;
    setTotalUser(result?.data?.length);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="flex bg-slate-100">
        <div className="w-1/6  bg-red-300">
          <div className="min-h-screen">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            accusamus magni esse velit cum est, quas culpa deserunt dolores
            adipisci, illum ad ipsum cumque accusantium. Repellat quidem qui
            corporis corrupti accusamus exercitationem ut blanditiis. Enim, ad.
            Id quibusdam ratione mollitia perspiciatis numquam voluptatem
            tenetur, cumque aliquid non, aspernatur facilis amet repudiandae
            temporibus
          </div>
        </div>
        <div className="w-5/6 ">
          <div className="max-w-7xl  mx-auto px-10">
            <div className="min-h-screen flex justify-center mt-20">
              <div className="flex flex-grow gap-6">
                <StatCard
                  value={totalUser}
                  title="Total User"
                  className={"bg-primary text-white"}
                  icon={
                    <User size={60} className="text-secondary opacity-50" />
                  }
                />
                <StatCard
                  value={totalBooking}
                  title="Total Bookings"
                  className={"bg-green-400 text-white"}
                  icon={
                    <BookCheck
                      size={60}
                      className="text-green-400 opacity-50"
                    />
                  }
                />
                <StatCard
                  value={totalBooking}
                  title="Total Bookings"
                  className={"bg-yellow-400 text-white"}
                  icon={
                    <BookCheck
                      size={60}
                      className="text-yellow-400 opacity-50"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
