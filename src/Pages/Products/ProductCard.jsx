import React from "react";
import { FcRating } from "react-icons/fc";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <>
      <div className="shadow border-2 transform transition-transform duration-300 hover:scale-105 hover:bg-[#9be8dd] text-black rounded-md m-1 text-center">
        <Link to={`details/${item._id}`} className="">
          <div className="w-full h-52 object-cover">
            <img
              src={item?.image}
              alt="Product"
              className="h-full w-full flex justify-center mx-auto"
            />
          </div>
          <div className="px-4 py-2 space-y-2">
            <h1 className=" font-bold text-2xl truncate">{item?.name}</h1>
            {/* <h1 className=" truncate">{item?.details}</h1> */}
            <div className="flex flex-col justify-between items-center gap-2">
              <div className="flex items-center">
                <span className="text-black font-normal text-sm flex justify-center items-center gap-1">
                 Price- <TbCoinTaka /> {item?.price} 
                </span>
              </div>
              <div className="flex gap-1 mb-2">
                <span className="text-black font-normal text-sm -mt-1"> Ratings-</span>
                <FcRating />
                <FcRating />
                <FcRating />
                <FcRating />
              </div>
            </div>
            <div className="flex justify-evenly items-center">
              <button className="bg-[#74CDF5] px-5 py-2 rounded-2xl hover:bg-[#FB26AF]">Order Now </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
