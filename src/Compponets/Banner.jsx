import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import axios from "axios";
import baseUrl from "../Utilities/baseUrl";

function Banner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-banner`);
        setBanners(response.data);
        console.log("Banners:", response.data);
      } catch (err) {
        setError("Failed to fetch banners");
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Swiper navigation fix
  useEffect(() => {
    const swiper = document.querySelector(".mySwiper")?.swiper;
    if (swiper && banners.length > 0) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [banners]);

  return (
    <div className="relative pt-24">
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading banners...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {!loading && !error && banners.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">No banners available</p>
        </div>
      )}

      {!loading && !error && banners.length > 0 && (
        <>
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              // Directly initialize navigation
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }, 100);
            }}
            className="mySwiper"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner._id}>
                <div className="w-full">
                  <img
                    className="w-full md:h-[400px] h-[300px] object-cover"
                    src={banner.bannerImage}
                    alt="Banner"
                    onError={(e) => {
                      e.target.src = "/placeholder-banner.jpg"; // Fallback image
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-1"
          >
            <FaChevronCircleLeft className="text-white" size={30} />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-1"
          >
            <FaChevronCircleRight className="text-white" size={30} />
          </button>
        </>
      )}
    </div>
  );
}

export default Banner;
