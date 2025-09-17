import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import axios from "axios";

function Banner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-banner");
        setBanners(response.data);
        // console.log("Banners:", response.data);
      } catch (err) {
        setError("Failed to fetch banners");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const swiper = document.querySelector(".mySwiper")?.swiper;
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [banners]);

  return (
    <div className="relative pt-20">
      {loading && <p>Loading banners...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && banners.length === 0 && (
        <p className="text-gray-500 text-center">No banners available</p>
      )}
      {!loading && !error && banners.length > 0 && (
        <>
          <Swiper
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000, // Switch every 3000ms (3 seconds)
              disableOnInteraction: false, // Continue autoplay after interaction
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="mySwiper"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner._id}>
                <div className="w-full">
                  <img
                    className="w-full md:h-[500px] h-[300px]"
                    src={banner.bannerImage} // Ensure correct property name
                    alt="Banner"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
          >
            <FaChevronCircleLeft className="text-[#ededca]" size={30} />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 "
          >
            <FaChevronCircleRight className="text-[#ededca]" size={30} />
          </button>
        </>
      )}
    </div>
  );
}

export default Banner;
