import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DOMAIN_URL, axiosInstance } from "../../../hooks/useApi";
import dayjs from "dayjs";
import { Button } from "../../../components/ui/Button";

export const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  const navigate = useNavigate();

  const getDestination = async () => {
    try {
      const response = await axiosInstance.get(`/destination/${id}`);

      const result = response?.data?.data;
      setDestination(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDestination();
  }, [id]);
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 min-h-screen">
        <div className="flex flex-col lg:gap-2 my-4">
          <div className="flex gap-2 bg-white border-b-2 p-4 mb-4">
            <Link
              to="/admin/destination"
              className="text-gray-700 hover:text-slate-400"
            >
              <p>Destination</p>
            </Link>
            <p>/</p>
            <p className="text-slate-700 font-bold">{destination?.title}</p>
          </div>
          <div className="flex mx-4 justify-end w-fit">
            <Button
              className="bg-slate-700 hover:bg-slate-500 text-white"
              onClick={() => navigate("/admin/destination/edit-destination")}
            >
              Edit Destination
            </Button>
          </div>
          <div className="flex">
            <div className="flex  gap-8 shadow rounded-xl min-h-[300px] p-4 m-4 border">
              <div className="w-1/2">
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  {destination?.title}
                </h1>
                <hr className="my-4" />
                <table className="w-full">
                  <tbody className="border">
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Title
                      </td>
                      <td className="p-4 border">{destination?.title}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Location
                      </td>
                      <td className="px-4 py-2 border">
                        {destination?.location}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Ticket Price
                      </td>
                      <td className="px-4 py-2 border">
                        IDR. {destination?.ticket_price}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Open Hour
                      </td>
                      <td className="px-4 py-2 border">
                        {destination?.open_hour}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Contact
                      </td>
                      <td className="px-4 py-2 border">
                        {destination?.destination_contact}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Availability
                      </td>
                      <td className="px-4 py-2 border">
                        {destination?.is_available === "true" ? (
                          <span className="text-green-500">Available</span>
                        ) : (
                          <span className="text-red-500">Unavailable</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Expiry Date
                      </td>
                      <td className="px-4 py-2 border">
                        {dayjs(destination?.expiry_date).format("DD MMM YYYY")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-1/2">
                <div className="space-y-2 my-4">
                  <img
                    src={`${DOMAIN_URL}/${destination?.thumbnail}`}
                    alt={destination?.title}
                    className="rounded-xl w-full max-h-[280px] object-cover"
                  />
                  <hr className="my-4" />
                  <h1>Description</h1>
                  <p>{destination?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
