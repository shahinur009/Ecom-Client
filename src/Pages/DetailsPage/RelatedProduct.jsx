import React, { useEffect, useState } from "react";
import RelatedProductCard from "./RelatedProductCard";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";

// Import Swiper styles for v11
import "swiper/swiper-bundle.css";

// Import Swiper React components for v11
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules for v11
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import baseUrl from "../../Utilities/baseUrl";

function RelatedProduct({ currentProductCategory = "" }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const [currentCategory, setCurrentCategory] = useState(
    category || currentProductCategory || ""
  );

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/show-product`);
      const allProducts = res.data;
      setProducts(allProducts);

      if (currentCategory) {
        const filtered = allProducts.filter(
          (product) =>
            product.category?.toLowerCase() === currentCategory.toLowerCase()
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(allProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentCategory]);

  const filterByCategory = (category) => {
    setCurrentCategory(category);
  };

  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="border-t border-gray-400 my-6 py-6">
      <h3 className="my-6">
        <span className="text-red-500 text-lg md:text-xl underline cursor-pointer">
          Related Products
        </span>
      </h3>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-red-500" />
        </div>
      ) : (
        <div className="relative px-4 md:px-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={filteredProducts.length >= 4}
            className="mySwiper"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="h-full">
                    <RelatedProductCard item={item} />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="flex justify-center items-center h-64">
                  <p className="text-center text-lg text-gray-500">
                    {currentCategory
                      ? `No products found in "${currentCategory}" category`
                      : "No products available"}
                  </p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {filteredProducts.length > 0 && (
            <>
              <div className="swiper-button-prev !text-red-500 !w-10 !h-10 after:!text-lg"></div>
              <div className="swiper-button-next !text-red-500 !w-10 !h-10 after:!text-lg"></div>
            </>
          )}

          {/* Custom Pagination */}
          {filteredProducts.length > 0 && (
            <div className="swiper-pagination mt-6 !relative"></div>
          )}
        </div>
      )}

      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          color: #ef4444;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 16px;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
}

export default RelatedProduct;
