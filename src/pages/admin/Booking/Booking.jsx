import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DOMAIN_URL, axiosInstance } from "../../../hooks/useApi";
import Toast from "../../../components/ui/Toast";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import SelectOption from "../../../components/ui/SelectOption";
import { Edit, Trash } from "lucide-react";
import { useAuthStore } from "../../../stores/authStore";

export const Booking = () => {
  const { token } = useAuthStore((state) => state);

  const [bookingList, setBookingList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [set, setSet] = useState(false);
  const [error, setError] = useState("");

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
  }, [limit, page, search, filterByStatus, set]);

  const handleApprove = async (bookingId) => {
    try {
      const response = await axiosInstance.patch(
        `/booking/${bookingId}`,
        {
          status: "paid",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSet(!set);
        alert("Status updated successfully");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      const response = await axiosInstance.patch(
        `/booking/${bookingId}`,
        {
          status: "failed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSet(!set);
        alert("Status updated successfully");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const response = await axiosInstance.delete(`/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSet(!set);
        alert("Booking deleted successfully");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

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
                  <div id="error">
                    {error && (
                      <Toast text={error} backgroundColor="bg-red-200" />
                    )}
                  </div>
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
                    <table className="table-auto bg-white rounded-xl text-sm w-full overflow-x-scroll">
                      <thead className="border-b">
                        <tr>
                          <th className="p-4 text-start">Date</th>
                          <th className="p-4 text-start">User</th>
                          <th className="p-4 text-start">Package</th>
                          <th className="p-4 text-start">Total</th>
                          <th className="p-4 text-center">Transfer Receipt</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingList?.map((booking) => (
                          <tr key={booking?.id}>
                            <td className="p-4 text-start">
                              {dayjs(booking?.date).format("DD MMM YYYY")}
                            </td>
                            <td className="p-4 text-start">{booking?.users?.username}</td>
                            <td className="p-4 text-start">
                              {booking?.travel_packages?.title}
                            </td>
                            <td className="p-4 text-start">
                              {`IDR.${
                                booking?.travel_packages?.price +
                                booking?.travel_packages?.price * 0.11
                              }`}
                            </td>
                            {booking?.transfer_receipt ? (
                              <td className="p-4 text-center flex justify-center">
                                <img
                                  src={`${DOMAIN_URL}/${booking?.transfer_receipt}`}
                                  alt="transfer_receipt"
                                  className="w-20 h-20 object-cover"
                                />
                              </td>
                            ) : (
                              <td className="p-4 text-center text-gray-400 min-w-[200px]">
                                No receipt yet
                              </td>
                            )}
                            <td className="p-4 text-center">
                              {booking?.status === "pending" ? (
                                <div className="flex justify-center items-center gap-2 p-4 min-w-[100px]">
                                  <Button
                                    onClick={() => handleApprove(booking?.id)}
                                    className="text-white bg-primary"
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    onClick={() => handleDecline(booking?.id)}
                                    className="text-white bg-red-500"
                                  >
                                    Decline
                                  </Button>
                                </div>
                              ) : booking?.status === "paid" ? (
                                <div className="flex items-center justify-center gap-2 capitalize">
                                  <p className="text-green-500 text-center">
                                    {booking?.status}
                                  </p>
                                </div>
                              ) : booking?.status === "unpaid" ? (
                                <div className="flex items-center justify-center gap-2 capitalize">
                                  <p className="text-gray-600 text-center">
                                    {booking?.status}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2 capitalize">
                                  <p className="text-red-500 text-center">
                                    {booking?.status}
                                  </p>
                                </div>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center items-center gap-2 p-4">
                                <Button className="w-auto bg-gray-300 cursor-not-allowed">
                                  <Edit size={20} className="text-white" />
                                </Button>
                                <Button
                                  onClick={() => handleDelete(booking?.id)}
                                  className="w-auto"
                                >
                                  <Trash size={20} className="text-red-500" />
                                </Button>
                              </div>
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
                          default_value={8}
                          onChange={(e) => setLimit(e.target.value)}
                          firstOption="8"
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
