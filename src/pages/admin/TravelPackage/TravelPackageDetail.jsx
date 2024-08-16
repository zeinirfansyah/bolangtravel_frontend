import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { DOMAIN_URL, axiosInstance } from "../../../hooks/useApi";
import dayjs from "dayjs";
import DestinationCard from "../../../components/DestinationCard";

export const TravelPackageDetail = () => {
  const [packageDetail, setPackageDetail] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const getPackageById = async () => {
    try {
      const response = await axiosInstance.get(`/travel-package/${id}`);

      const result = response?.data?.data;
      setPackageDetail(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackageById();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 min-h-screen">
        <div className="flex flex-col lg:gap-2 my-4">
          <div className="flex gap-2 bg-white border-b-2 p-4 mb-4">
            <Link
              to="/admin/travel-package"
              className="text-gray-700 hover:text-slate-400"
            >
              <p>Travel Package</p>
            </Link>
            <p>/</p>
            <p className="text-slate-700 font-bold">{packageDetail?.title}</p>
          </div>
          <div className="flex mx-4 justify-end w-fit">
            <Button
              className="bg-slate-700 hover:bg-slate-500 text-white"
              onClick={() =>
                navigate(`/admin/travel-package/edit-package/${id}`)
              }
            >
              Edit Package
            </Button>
          </div>
          <div className="flex ">
            <div className="flex w-full gap-8 shadow rounded-xl min-h-[300px] p-4 m-4 border">
              <div className="w-1/2">
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  {packageDetail?.title}
                </h1>
                <hr className="my-4" />
                <table className="w-full">
                  <tbody className="border">
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Title
                      </td>
                      <td className="p-4 border">{packageDetail?.title}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Category
                      </td>
                      <td className="px-4 py-2 border">
                        {packageDetail?.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Location
                      </td>
                      <td className="px-4 py-2 border">
                        {packageDetail?.location}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Duration
                      </td>
                      <td className="px-4 py-2 border">
                        {packageDetail?.duration} days
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Availability
                      </td>
                      <td className="px-4 py-2 border">
                        {packageDetail?.is_available === "true" ? (
                          <span className="text-green-500">Available</span>
                        ) : (
                          <span className="text-red-500">Unavailable</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Is Recomended
                      </td>
                      <td className="px-4 py-2 border">
                        {packageDetail?.is_recomended === "true" ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 font-semibold px-4 py-2 border">
                        Ticket Price
                      </td>
                      <td className="px-4 py-2 border">
                        IDR. {packageDetail?.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-1/2">
                <div className="space-y-2 my-4">
                  <img
                    src={`${DOMAIN_URL}/${packageDetail?.thumbnail}`}
                    alt={packageDetail?.title}
                    className="rounded-xl w-full max-h-[280px] object-cover"
                  />
                  <hr className="my-4" />
                  <h1>Description</h1>
                  <p>{packageDetail?.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full gap-4 shadow rounded-xl min-h-[300px] p-4 m-4 border">
              <h1 className="text-2xl font-semibold">Rundowns</h1>
              <hr />
              {packageDetail && packageDetail?.destinations && (
                <div className="flex flex-col-reverse gap-6">
                  {packageDetail?.rundowns.map((rundown) => (
                    <div key={rundown.id} className="space-y-1">
                      <h1 className="text-l lg:text-xl">{rundown?.title}</h1>
                      <p className="text-sm lg:text-l text-textGray">
                        {rundown?.agenda}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-4 shadow rounded-xl min-h-[300px] p-4 m-4 border">
              <h1 className="text-2xl font-semibold">
                Destinations
              </h1>
              <hr />
              {packageDetail && packageDetail?.destinations && (
                <div className={`grid grid-cols-3 gap-4`}>
                  {packageDetail?.destinations.map((destination) => (
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
