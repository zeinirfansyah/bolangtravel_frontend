import React, { useEffect, useState } from "react";
import Toast from "../../../components/ui/Toast";
import { Input } from "../../../components/ui/Input";
import SelectOption from "../../../components/ui/SelectOption";
import { axiosInstance } from "../../../hooks/useApi";
import { Button } from "../../../components/ui/Button";
import { Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export const PackageList = () => {
  const [packageList, setPackageList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState("");
  const [set, setSet] = useState(false);
  const [error, setError] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const { token } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const getAllPackages = async () => {
    try {
      const response = await axiosInstance.get(
        `/travel-package/table/${limit}&${page}`,
        {
          params: {
            search: search,
            category: filterByCategory,
          },
        }
      );
      const result = await response?.data;
      setPackageList(result.data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPackages();
  }, [page, limit, search, filterByCategory, set]);

  /**
   * REMINDER:
   * Be the person you want to be.
   */

  const limitNumber = [10, 20, 30, 40, 50];
  const limitData = limitNumber.map((number) => ({
    value: number,
    label: number,
  }));

  const handleDelete = async (packageId) => {
    try {
      const response = await axiosInstance.delete(
        `/travel-package/${packageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSet(!set);
        confirm("Booking deleted successfully");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const category = ["Family", "Honeymoon", "Solo"];

  const categoryList = category.map((category) => ({
    value: category,
    label: category,
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
                  <div className="flex items-center justify-between w-full my-3 gap-4">
                    <div className="w-fit">
                      <Button
                        className="bg-slate-700 hover:bg-slate-500 text-white"
                        onClick={() =>
                          navigate("/admin/travel-package/add-package")
                        }
                      >
                        Add Package
                      </Button>
                    </div>
                    <div className="flex gap-4 w-1/2">
                      <div className="w-1/2">
                        <Input
                          placeholder="Search package"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                          value={search}
                          className={"border-2"}
                        />
                      </div>
                      <div className="w-1/2">
                        <SelectOption
                          options={categoryList}
                          default_value=""
                          onChange={(e) => setFilterByCategory(e.target.value)}
                          firstOption="All Category"
                          className={"border-2"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto rounded-xl ">
                    <table className="table-auto bg-white rounded-xl text-sm w-full overflow-x-scroll">
                      <thead className="border-b">
                        <tr>
                          <th className="p-4 text-start">Category</th>
                          <th className="p-4 text-start">Title</th>
                          <th className="p-4 text-start">Price</th>
                          <th className="p-4 text-start">Location</th>
                          <th className="p-4 text-start">Duration</th>
                          <th className="p-4 text-start">Availability</th>
                          <th className="p-4 text-start">Is Recommended</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packageList?.map((packageList) => (
                          <tr key={packageList?.id}>
                            <td className="p-4 text-start">
                              {packageList?.category}
                            </td>
                            <td className="p-4 text-start">
                              {packageList?.title}
                            </td>
                            <td className="p-4 text-start">
                              IDR.{packageList?.price}
                            </td>
                            <td className="p-4 text-start">
                              {packageList?.location}
                            </td>
                            <td className="p-4 text-start">
                              {packageList?.duration}
                            </td>
                            <td className="p-4 text-start">
                              {packageList?.is_available === "true" ? (
                                <p className="text-green-500">Available</p>
                              ) : (
                                <p className="text-red-500">Not Available</p>
                              )}
                            </td>
                            <td className="p-4 text-start">
                              {packageList?.is_recommended === "true" ? (
                                <p>Recommended</p>
                              ) : (
                                <p>Basic</p>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center items-center gap-2">
                                <Button
                                  onClick={() =>
                                    navigate(
                                      `/admin/travel-package/${packageList?.id}`
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
                                  onClick={() => handleDelete(packageList?.id)}
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
                        className={`px-4 py-2 border rounded-md text-white bg-slate-700 hover:bg-slate-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200`}
                      >
                        Previous
                      </button>
                      <span className="text-lg font-semibold">{page}</span>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={packageList.length < limit}
                        className={`px-4 py-2 border rounded-md text-white bg-slate-700 hover:bg-slate-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200`}
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
