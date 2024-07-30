import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import icon_emptyImage from "../../../assets/icons/empty_image.jpeg";
import { Input } from "../../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../../../components/ui/SelectOption";
import { axiosInstance } from "../../../hooks/useApi";
import { useAuthStore } from "../../../stores/authStore";

export const CreateDestination = () => {
  const { token } = useAuthStore((state) => state);
  const [thumbnailUrl, setThumbnailUrl] = useState("Thumbnail");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [destinationContact, setDestinationContact] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [openHour, setOpenHour] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fileUpload = async (event) => {
    const file = event.target.files[0];
    setThumbnailUrl(URL.createObjectURL(file));
    setThumbnail(file);
  };

  const handleCreate =  async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ticket_price", ticketPrice);
      formData.append("location", location);
      formData.append("destination_contact", destinationContact);
      formData.append("expiry_date", expiryDate);
      formData.append("is_available", isAvailable);
      formData.append("open_hour", openHour);

      const response = await axiosInstance.post("/destination", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response.status);

      if (response.status === 201 || response.status === 200) {
        alert("Destination created successfully");
        navigate("/admin/destination");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    }
  };

  const availability = ["true", "false"];

  const availabilityOption = availability.map((availability) => ({
    value: availability,
    label: availability === "true" ? "Available" : "Unavailable",
  }));

  return (
    <>
      <div className="px-4">
        <div className="flex flex-col gap-5 min-h-[90vh] py-8">
          <div className="flex gap-2 bg-white border-b-2 p-4 mb-4">
            <Link
              to="/admin/destination"
              className="text-gray-400 hover:text-secondary"
            >
              <p>Destination</p>
            </Link>
            <p>/</p>
            <p className="text-secondary">Create</p>
          </div>
          <form
            action=""
            className="flex flex-col justify-center items-center gap-5 "
          >
            <div
              className="flex flex-col lg:flex-row gap-10
              justify-center"
            >
              <div className="flex flex-col gap-5 min-w-[20rem]">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="title">Destination Name</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Destination Name"
                    id="title"
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="contact">Contact</label>
                  <Input
                    value={destinationContact}
                    onChange={(e) => setDestinationContact(e.target.value)}
                    placeholder="Contact"
                    id="contact"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="location">Location</label>
                  <textarea
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    name="location"
                    id="location"
                    cols="10"
                    rows="3"
                    placeholder="Location"
                    className="border bg-white rounded-lg p-4 w-full focus:outline-secondary transition-all duration-500"
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col gap-5 min-w-[20rem]">
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ticket_price">Ticket Price</label>
                    <Input
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      placeholder="Ticket Price"
                      id="ticket_price"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="open-hour">Open Hour</label>
                    <Input
                      value={openHour}
                      onChange={(e) => setOpenHour(e.target.value)}
                      placeholder="Open Hour"
                      id="open-hour"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="expire">Expiry Date</label>
                    <Input
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      type="date"
                      placeholder="Expiry Date"
                      id="expire"
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
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="thumbnail"
                    className="flex items-center justify-center w-full outline-dashed outline-2 outline-primary p-5 rounded-lg text-center cursor-pointer hover:bg-slate-100 h-[130px]"
                  >
                    {thumbnailUrl && (
                      <img src={thumbnailUrl} alt="thumbnail" className="w-full h-full object-cover"/>
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
            <div className="flex flex-col justify-center items-center gap-3 w-full lg:w-1/4 my-5">
              <Button
                onClick={(e) => handleCreate(e)}
                className="bg-secondary text-white hover:bg-primary"
              >
                Continue
              </Button>
              <Button
                onClick={() => navigate("/admin/destination")}
                className="bg-lightGray text-secondary border-2 border-secondary hover:border-red-400 hover:text-red-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
