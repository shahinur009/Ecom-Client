import React from "react";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  // console.log(item.image);
  return (
    <>
      <div className="shadow border-2 transform transition-transform duration-300 hover:scale-105 bg-[#36f1d5] hover:bg-[#9be8dd] text-black py-4 rounded-md m-1 text-center">
        <Link to={`details/${item._id}`} className="">
          <div className="w-full h-52 object-cover">
            <img
              src={item?.image}
              alt="Product"
              className="h-full flex justify-center mx-auto"
            />
          </div>
          <div className="px-4 py-2 space-y-2">
            <h1 className=" font-bold text-2xl truncate">{item?.name}</h1>
            {/* <h1 className=" truncate">{item?.details}</h1> */}
            <div className="flex flex-col justify-between items-center gap-2">
              <div className="flex items-center">
                <span className="text-red-500 font-bold text-lg">
                  দাম - ৳{item?.price} টাকা মাত্র।
                </span>
              </div>
              <div className="flex gap-1 mb-2">
                <span className="text-red-500 font-bold"> কাস্টমার রেটিং-</span>
                <FcRating />
                <FcRating />
                <FcRating />
                <FcRating />
              </div>
            </div>
            <div className="flex justify-evenly items-center">
              <button className="btn btn-warning">অর্ডার করুন </button>
              <button className="btn btn-secondary"> বিস্তারিত দেখুন </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
