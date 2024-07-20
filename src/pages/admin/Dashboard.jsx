import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../hooks/useApi";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import SelectOption from "../../components/ui/SelectOption";

import dayjs from "dayjs";

export const Dashboard = () => {
  const { token } = useAuthStore((state) => state);

  const [bookingList, setBookingList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");

  const getAllBookings = async () => {
    try {
      const response = await axiosInstance.get(
        `/booking/table/${limit}&${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: search,
            status: filterByStatus,
          },
        }
      );

      console.log(response);

      const result = response?.data;
      setBookingList(result?.data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [limit, page, search, filterByStatus]);

  console.log(limit);

  const status = ["unpaid", "pending", "paid", "failed"];

  const uniqueStatus = status.map((status) => ({
    value: status,
    label: status,
  }));

  const limitNumber = [10, 20, 30, 40, 50];

  const limitData = limitNumber.map((number) => ({
    value: number,
    label: number,
  }));

  return (
    <>
      <div className="flex bg-slate-100">
        <div className="w-full pt-8">
          <div className="max-w-7xl mx-auto px-10">
            <div className="min-h-[90vh] flex flex-col space-y-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center max-h-[85vh]">
                  <div className="flex w-full my-3 gap-4">
                    <div className="w-full">
                      <Input
                        placeholder="Search booking data by customer"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        value={search}
                        className={"border-2"}
                      />
                    </div>
                    <div className="w-1/3">
                      <SelectOption
                        options={uniqueStatus}
                        default_value=""
                        onChange={(e) => setFilterByStatus(e.target.value)}
                        firstOption="All Status"
                        className={"border-2"}
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="table-auto bg-white rounded-xl text-center text-sm w-full overflow-x-scroll">
                      <thead className="border-b">
                        <tr>
                          <th className="p-4">Date</th>
                          <th className="p-4">User</th>
                          <th className="p-4">Package</th>
                          <th className="p-4">Total</th>
                          <th className="p-4">Transfer Receipt</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingList?.map((booking) => (
                          <tr key={booking?.id}>
                            <td className="p-4">
                              {dayjs(booking?.date).format("DD MMM YYYY")}
                            </td>
                            <td className="p-4">{booking?.users?.username}</td>
                            <td className="p-4">
                              {booking?.travel_packages?.title}
                            </td>
                            <td className="p-4">
                              {`IDR.${
                                booking?.travel_packages?.price +
                                booking?.travel_packages?.price * 0.11
                              }`}
                            </td>
                            {booking?.transfer_receipt ? (
                              <td className="p-4 min-w-[200px]">
                                {booking?.transfer_receipt}
                              </td>
                            ) : (
                              <td className="p-4 text-gray-400 min-w-[200px]">
                                No receipt yet
                              </td>
                            )}
                            <td className="p-4 min-w-[200px]">
                              {booking?.status}
                            </td>
                            <td className="flex gap-2 p-4 min-w-[200px]">
                              <Button className="">Edit</Button>
                              <Button className="bg-red-500 text-white">
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-grow gap-4 items-center">
                      <p>Show</p>
                      <div className="max-w-[120px]">
                        <SelectOption
                          options={limitData}
                          default_value={5}
                          onChange={(e) => setLimit(e.target.value)}
                          firstOption="5"
                          className={"border-2 rounded-lg py-2"}
                        />
                      </div>
                      <p>Entries</p>
                    </div>
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
                        disabled={bookingList.length < limit}
                        className={`px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200`}
                      >
                        Next
                      </button>
                    </div>
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
