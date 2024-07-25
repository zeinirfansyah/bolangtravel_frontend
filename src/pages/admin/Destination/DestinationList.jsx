import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Toast from "../../../components/ui/Toast";
import { Input } from "../../../components/ui/Input";
import SelectOption from "../../../components/ui/SelectOption";
import { DOMAIN_URL, axiosInstance } from "../../../hooks/useApi";
import { Button } from "../../../components/ui/Button";
import { Edit, Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export const DestinationList = () => {
  const [destinationList, setDestinationList] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState("");
  const [set, setSet] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const getAllDestinations = async () => {
    try {
      const response = await axiosInstance.get(
        `/destination/table/${limit}&${page}`,
        {
          params: {
            search: search,
          },
        }
      );
      const result = await response?.data;
      setDestinationList(result.data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDestinations();
  }, [page, limit, search, set]);

  /**
   * TODO:
   * keep smiling,
   * every rejection in life is just a protection from Allah.
   */

  const limitNumber = [10, 20, 30, 40, 50];
  const limitData = limitNumber.map((number) => ({
    value: number,
    label: number,
  }));

  const handleDelete = async (destinationId) => {
    try {
      const response = await axiosInstance.delete(`/destination/${destinationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSet(!set);
        confirm("Booking deleted successfully");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

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
                        placeholder="Search destination"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        value={search}
                        className={"border-2"}
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto rounded-xl ">
                    <table className="table-auto bg-white rounded-xl text-sm w-full overflow-x-scroll">
                      <thead className="border-b">
                        <tr>
                          <th className="p-4 text-start">Title</th>
                          <th className="p-4 text-start">Location</th>
                          <th className="p-4 text-start">Ticket Price</th>
                          <th className="p-4 text-start">Open Hour</th>
                          <th className="p-4 text-start">Contact</th>
                          <th className="p-4 text-start">Availability</th>
                          <th className="p-4 text-start">Expiry Date</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {destinationList?.map((destination) => (
                          <tr key={destination?.id}>
                            <td className="p-4 text-start">
                              {destination?.title}
                            </td>
                            <td className="p-4 text-start">
                              {destination?.location}
                            </td>
                            <td className="p-4 text-start">
                              IDR.{destination?.ticket_price}
                            </td>
                            <td className="p-4 text-start">
                              {destination?.open_hour}
                            </td>
                            <td className="p-4 text-start">
                              {destination?.destination_contact}
                            </td>
                            <td className="p-4 text-start">
                              {destination?.is_available === "true" ? (
                                <p className="text-green-500">Available</p>
                              ) : (
                                <p className="text-red-500">Not Available</p>
                              )}
                            </td>
                            <td className="p-4 text-start">
                              {dayjs(destination?.expiryDate).format(
                                "DD MMM YYYY"
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center items-center gap-2">
                                <Button
                                  onClick={() =>
                                    navigate(
                                      `/admin/destination/${destination?.id}`
                                    )
                                  }
                                  className="w-auto"
                                >
                                  <Eye
                                    size={20}
                                    className="text-gray-500 mx-auto"
                                  />
                                </Button>
                                <Button
                                  onClick={() => handleDelete(destination?.id)}
                                  className="w-auto"
                                >
                                  <Trash
                                    size={20}
                                    className="text-red-500  mx-auto"
                                  />
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
                        disabled={destinationList.length < limit}
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
