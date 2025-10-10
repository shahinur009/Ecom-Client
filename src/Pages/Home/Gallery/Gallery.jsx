import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import baseUrl from "../../../Utilities/baseUrl";

function Gallery() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [galleries, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${baseUrl}/gallery`);
        setGallery(response.data);
        console.log("galleries:", response.data);
      } catch (err) {
        setError("Failed to fetch gallery");
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
  }, [galleries]);
  return (
    <section className="bg-[#f8f8ec]">
      <h1 className="text-red-500 flex mx-auto justify-center text-2xl md:text-5xl text-center py-4">
        ---আমাদের সম্মানিত গ্রাহকের ভালবাসা---
      </h1>
      <div className="relative md:mt-10">
        {loading && <p>Loading Gallery Images...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && galleries.length === 0 && (
          <p className="text-gray-500 text-center">No Gallery available</p>
        )}
        {!loading && !error && galleries.length > 0 && (
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
              className="mySwiper"
            >
              {galleries.map((gallery) => (
                <SwiperSlide key={gallery._id}>
                  <div className="flex justify-center items-center mx-auto">
                    <img
                      className="md:w-[50%] w-full md:h-[500px] h-[300px]"
                      src={gallery.image}
                      alt="Banner"
                    />
                  </div>
                  <a
                    href="tel:+8801622604352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="my-1 md:my-3 flex mx-auto justify-center items-center md:w-96 w-full btn btn-warning md:font-bold md:text-xl text-sm "
                  >
                    অর্ডার করতে চাইঃ +880 1623503666
                  </a>
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
    </section>
  );
}

export default Gallery;
