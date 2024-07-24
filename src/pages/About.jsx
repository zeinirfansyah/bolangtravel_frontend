import React from "react";
import img_family from "../assets/images/family.webp";
import icon_whatsapp from "../assets/icons/icons8-whatsapp.svg";
import icon_instagram from "../assets/icons/icons8-instagram.svg";
import icon_googleMaps from "../assets/icons/icons8-google-maps-old.svg";

export const About = () => {
  return (
    <>
      <div className="bg-[#fff] transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen">
            <div className=" flex flex-col lg:flex-row justify-between gap-10 px-4 ">
              <div
                id="foto"
                className="lg:w-1/3 flex justify-center items-center lg:my-7"
              >
                <img
                  src={img_family}
                  alt="Zein Irfansyah"
                  className="transition duration-500 w-[320px] h-[420px] object-cover rounded-2xl lg:rounded-br-[100px] shadow outline-dashed outline-primary text-gray-400 outline-2 outline-offset-8"
                />
              </div>
              <div id="about" className="flex flex-col gap-4  lg:w-2/3">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  <span className="text-primary">Bolang</span>Travel.
                </h1>
                <p className="text-gray-400">
                  Explore the world with BolangTravel, your ultimate destination
                  for adventures like no other. Starting from relaxing beach
                  holidays to thrilling mountain expeditions, we are experts in
                  creating tailor-made tourism experiences that suit your
                  preferences. With our team of caring and detail-oriented
                  experts, every aspect of your trip is meticulously planned,
                  leaving you free to focus on having an amazing travel
                  experience.
                </p>
                <p className="text-gray-400">
                  At BolangTravel, we customize every trip to suit your unique
                  desires, offering cultural immersion, thrilling activities, or
                  a peaceful escape. Let us be your trusted partner in creating
                  an unforgettable journey that is inspiring and fun.
                </p>
                <hr className="border-[#E5E5E5] w-full md:w-1/2 my-2" />
                <div id="contact" className="flex flex-col">
                  <a
                    href="mailto:12.zeinirfansyah@gmail.com?subject=Travel App Portfolio"
                    target="_blank"
                    className="text-gray-400 hover:text-primary transition-all duration-500 flex gap-2"
                  >
                    <img src={icon_whatsapp} alt="whatsapp" />
                    +620 1234 ****
                  </a>
                  <a
                    href="mailto:12.zeinirfansyah@gmail.com?subject=Travel App Portfolio"
                    target="_blank"
                    className="text-gray-400 hover:text-primary transition-all duration-500 flex gap-2"
                  >
                    <img src={icon_instagram} alt="instagram" />
                    bolangtravel
                  </a>
                  <a
                    href="mailto:12.zeinirfansyah@gmail.com?subject=Travel App Portfolio"
                    target="_blank"
                    className="text-gray-400 hover:text-primary transition-all duration-500 flex gap-2"
                  >
                    <img src={icon_googleMaps} alt="googlemaps" />
                    Tasikmalaya, Jawa Barat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
