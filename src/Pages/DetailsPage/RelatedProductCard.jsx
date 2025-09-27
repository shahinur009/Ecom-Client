import React from "react";
import { FcRating } from "react-icons/fc";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

function RelatedProductCard({ item }) {
  const firstImage =
    item?.images && item.images.length > 0
      ? item.images[0]
      : "/placeholder.png";

  return (
    <div className="shadow border-2 transform transition-transform duration-300 hover:scale-105 hover:bg-[#9be8dd] text-black rounded-md m-1 text-center">
      <Link to={`details/${item._id}`}>
        {/* Image container */}
        <div className="w-full h-52 overflow-hidden flex justify-center items-center bg-white">
          <img
            src={firstImage}
            alt={item?.name || "Product"}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-2 space-y-2">
          <h1 className="font-bold text-xl truncate">{item?.name}</h1>

          <div className="flex flex-col justify-between items-center gap-2">
            <div className="flex items-center">
              <span className="text-black font-normal text-lg flex justify-center items-center gap-1">
                Price- <TbCoinTaka /> {item?.price}
              </span>
            </div>

            <div className="flex gap-1 mb-2">
              <span className="text-black font-normal text-sm -mt-1">
                Ratings-
              </span>
              <FcRating />
              <FcRating />
              <FcRating />
              <FcRating />
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-evenly items-center">
            <button className="bg-[#74CDF5] px-3 py-1 text-xs rounded-2xl hover:bg-[#FB26AF]">
              Order Now
            </button>
          </div>
          <div className="flex justify-evenly items-center">
            <button className="bg-[#74CDF5] px-3 py-1 text-xs rounded-2xl hover:bg-[#FB26AF]">
              Add to cart
            </button>
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RelatedProductCard;
