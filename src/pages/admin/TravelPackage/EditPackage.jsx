import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import { useAuthStore } from "../../../stores/authStore";
import { axiosInstance } from "../../../hooks/useApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/ui/Input";
import SelectOption from "../../../components/ui/SelectOption";
import { Minus, Plus, Trash } from "lucide-react";

const EditPackage = () => {
  const { id } = useParams();
  const { token } = useAuthStore((state) => state);
  const [packageCategory, setPackageCategory] = useState("");
  const [packageTitle, setPackageTitle] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageLocation, setPackageLocation] = useState("");
  const [packageDuration, setPackageDuration] = useState("");
  const [packageRundowns, setPackageRundowns] = useState([
    {
      title: "",
      agenda: "",
    },
  ]);
  const [rundownCount, setRundownCount] = useState(1);
  const [packageDestinations, setPackageDestinations] = useState([""]);
  const [destinationCount, setDestinationCount] = useState(1);
  const [thumbnailUrl, setThumbnailUrl] = useState("Thumbnail");
  const [packageThumbnail, setPackageThumbnail] = useState(null);
  const [isAvailable, setIsAvailable] = useState("true");
  const [isRecommended, setIsRecommended] = useState("false");
  const [error, setError] = useState("");
  const [destinationList, setDestinationList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllDestinations();
    fetchPackageDetails(); // Fetch details of the package to edit
  }, []);

  const getAllDestinations = async () => {
    try {
      const response = await axiosInstance.get(`/destination/`);
      const result = await response?.data;
      setDestinationList(result.data?.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPackageDetails = async () => {
    try {
      const response = await axiosInstance.get(`/travel-package/${id}`);
      const packageData = response.data.data;

      setPackageCategory(packageData.category);
      setPackageTitle(packageData.title);
      setPackageDescription(packageData.description);
      setPackagePrice(packageData.price);
      setPackageLocation(packageData.location);
      setPackageDuration(packageData.duration);
      setPackageRundowns(packageData.rundowns || [{ title: "", agenda: "" }]);
      setRundownCount(packageData.rundowns ? packageData.rundowns.length : 1);
      setPackageDestinations(packageData.destinations || [""]);
      setDestinationCount(
        packageData.destinations ? packageData.destinations.length : 1
      );
      setIsAvailable(packageData.is_available.toString());
      setIsRecommended(packageData.is_recommended.toString());
      setThumbnailUrl(packageData.thumbnail_url || "Thumbnail");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch package details.");
    }
  };

  const handleAddDestination = () => {
    setPackageDestinations([...packageDestinations, ""]);
    setDestinationCount(destinationCount + 1);
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...packageDestinations];
    newDestinations[index] = value;
    setPackageDestinations(newDestinations);
  };

  const handleDeleteDestinationForm = (indexToRemove) => {
    const newDestinations = [...packageDestinations];
    newDestinations.splice(indexToRemove, 1);
    setPackageDestinations(newDestinations);
    setDestinationCount(destinationCount - 1);
  };

  const handleAddRundown = () => {
    setPackageRundowns([...packageRundowns, { title: "", agenda: "" }]);
    setRundownCount(rundownCount + 1);
  };

  const handleDeleteRundownForm = (indexToRemove) => {
    const newRundowns = [...packageRundowns];
    newRundowns.splice(indexToRemove, 1);
    setPackageRundowns(newRundowns);
    setRundownCount(rundownCount - 1);
  };

  const handleRundownChange = (index, key, value) => {
    const newRundowns = [...packageRundowns];
    newRundowns[index][key] = value;
    setPackageRundowns(newRundowns);
  };

  const fileUpload = async (event) => {
    const file = event.target.files[0];
    setThumbnailUrl(URL.createObjectURL(file));
    setPackageThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", packageTitle);
      formData.append("description", packageDescription);
      formData.append("price", packagePrice);
      formData.append("category", packageCategory);
      formData.append("location", packageLocation);
      formData.append("duration", packageDuration);
      formData.append("destinations", JSON.stringify(packageDestinations));
      formData.append("rundowns", JSON.stringify(packageRundowns));
      if (packageThumbnail) {
        formData.append("thumbnail", packageThumbnail);
      }
      formData.append("is_recommended", isRecommended);
      formData.append("is_available", isAvailable);

      const response = await axiosInstance.patch(
        `/travel-package/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Package updated successfully");
        navigate("/admin/travel-package");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const categories = ["Family", "Honeymoon", "Solo"];
  const filterOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const availability = ["true", "false"];
  const availabilityOption = availability.map((availability) => ({
    value: availability,
    label: availability === "true" ? "Available" : "Unavailable",
  }));

  const destinationOption = destinationList?.map((destination) => ({
    value: destination.id,
    label: destination.title,
  }));

  return (
    <>
      <div className="px-4">
        <div className="flex flex-col gap-5 min-h-[90vh] py-4">
          <div className="flex gap-2 bg-white border-b-2 p-4 mb-4">
            <Link
              to="/admin/travel-package"
              className="text-gray-700 hover:text-slate-400"
            >
              <p>Travel Package</p>
            </Link>
            <p>/</p>
            <p className="text-slate-700 font-bold">Create Package</p>
          </div>
          <form
            className="flex flex-col justify-center items-center gap-5 "
          >
            <div
              className="flex flex-col lg:flex-row gap-10
            justify-center w-full px-12"
            >
              <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="title">Package Name</label>
                  <Input
                    value={packageTitle}
                    onChange={(e) => setPackageTitle(e.target.value)}
                    placeholder="Package Name"
                    id="title"
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="category">Category</label>
                  <SelectOption
                    options={filterOptions}
                    default_value=""
                    onChange={(e) => setPackageCategory(e.target.value)}
                    firstOption="All"
                    className={"border-2"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="location">Location</label>
                  <Input
                    value={packageLocation}
                    onChange={(e) => setPackageLocation(e.target.value)}
                    name="location"
                    id="location"
                    placeholder="Location"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location">Description</label>
                  <textarea
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                    name="description"
                    id="description"
                    placeholder="description"
                    rows={2}
                    cols={30}
                    className="border-2 rounded-lg p-4"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="ticket_price">Package Price</label>
                  <Input
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(e.target.value)}
                    placeholder="Ticket Price"
                    id="ticket_price"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="open-hour">Duration</label>
                  <Input
                    value={packageDuration}
                    onChange={(e) => setPackageDuration(e.target.value)}
                    placeholder="Open Hour"
                    id="open-hour"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="availability">Availability</label>
                  <SelectOption
                    id="availability"
                    placeholder={"Availability"}
                    options={availabilityOption}
                    firstOption={"Select Availability"}
                    disabled={true}
                    default_value={"unavailable"}
                    onChange={(e) => {
                      setIsAvailable(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="thumbnail"
                    className="flex items-center justify-center w-full outline-dashed outline-2 outline-slate-700 p-5 rounded-lg text-center cursor-pointer hover:bg-slate-100 h-[120px]"
                  >
                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </label>
                  <Input
                    onChange={fileUpload}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    id="thumbnail"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <hr className="w-full my-6" />
            <div className=" w-full px-12">
              <div className="flex flex-col lg:flex-row gap-10 justify-center border p-6 rounded-xl">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex gap-2 justify-end">
                    <div>
                      <Button
                        type="button"
                        onClick={handleDeleteDestinationForm}
                        className="w-fit disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={destinationCount === 0}
                      >
                        {destinationCount > 1 ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Trash className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center border rounded">
                      <p className="text-navy font-semibold  mx-4">
                        {destinationCount} Destination
                      </p>
                    </div>
                    <div>
                      <Button
                        type="button"
                        onClick={handleAddDestination}
                        className="w-fit"
                        disabled={destinationCount === 8}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 w-full">
                    <label htmlFor="destination">Package Destination</label>
                    {packageDestinations.map((destination, index) => (
                      <div key={index}>
                        <SelectOption
                          id={`destination ${index}`}
                          placeholder={"Destination"}
                          options={destinationOption}
                          firstOption={"Select Destination"}
                          disabled={true}
                          onChange={(e) =>
                            handleDestinationChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex gap-2 justify-end">
                    <div>
                      <Button
                        type="button"
                        onClick={handleDeleteRundownForm}
                        className="w-fit disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={rundownCount === 0}
                      >
                        {rundownCount > 1 ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Trash className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center border rounded">
                      <p className="text-navy font-semibold  mx-4">
                        {rundownCount} Agenda
                      </p>
                    </div>
                    <div>
                      <Button
                        type="button"
                        onClick={handleAddRundown}
                        className="w-fit"
                        disabled={rundownCount === 8}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 w-full">
                    <label htmlFor="rundown">Package Agenda</label>
                    {packageRundowns.map((rundown, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 border p-6"
                      >
                        <Input
                          type="text"
                          placeholder="Rundown Title"
                          value={rundown.title}
                          onChange={(e) =>
                            handleRundownChange(index, "title", e.target.value)
                          }
                        />
                        <Input
                          type="text"
                          placeholder="Rundown Agenda"
                          value={rundown.agenda}
                          onChange={(e) =>
                            handleRundownChange(index, "agenda", e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full lg:w-1/4 my-5">
              <Button
                onClick={() => navigate("/admin/destination")}
                className="bg-lightGray text-slate-400 border-2 border-slate-400 hover:border-red-400 hover:text-red-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-slate-700 text-white hover:bg-slate-600"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
            {error && (
              <Toast
                text={error}
                backgroundColor="bg-red-200"
                textColor="text-red-700"
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPackage;
