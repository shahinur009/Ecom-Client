import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function Videos() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/videos");
        setVideos(response.data);
        console.log("videos:", response.data);
      } catch (err) {
        setError("Failed to fetch videos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const swiper = document.querySelector(".mySwiper")?.swiper;
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [videos]);

  return (
    <section className="px-4 py-8 md:py-12">
      <h1 className="text-red-500 text-center text-xl md:text-4xl font-bold">
        --- ভিডিও ---
      </h1>
      <div className="relative pt-10">
        {loading && <p className="text-center">লোড হচ্ছে ভিডিও ...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && videos.length === 0 && (
          <p className="text-gray-500 text-center">কোন ভিডিও পাওয়া যায়নি</p>
        )}
        {!loading && !error && videos.length > 0 && (
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
              {videos.map((video) => (
                <SwiperSlide
                  key={video._id}
                  className="flex flex-col items-center"
                >
                  <img
                    className="w-full max-w-[90%] md:max-w-[70%] h-[200px] md:h-[400px] rounded-lg shadow-lg"
                    src={video.videos}
                    alt="videos"
                  />
                  <a
                    href="tel:+8801622604352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:px-4 px-1 py-2 bg-yellow-500 text-white font-bold text-sm md:text-lg rounded-md hover:bg-yellow-600 transition"
                  >
                    অর্ডার করতে কল করুন: +880 1623-503666
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button
              ref={prevRef}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 text-red-600"
            >
              <FaChevronCircleLeft size={40} />
            </button>

            <button
              ref={nextRef}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-red-600"
            >
              <FaChevronCircleRight size={40} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Videos;
