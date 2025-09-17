import React from "react";
import bg from "../../public/Login-background.jpg";
import {
  FaBaby,
  FaBox,
  FaBriefcase,
  FaCar,
  FaCouch,
  FaDumbbell,
  FaGem,
  FaGifts,
  FaHeadphones,
  FaHome,
  FaLeaf,
  FaShoePrints,
  FaTshirt,
  FaWarehouse,
} from "react-icons/fa";

const categories = [
  { name: "Business Services", icon: <FaBriefcase size={32} /> },
  { name: "Consumer Electronics", icon: <FaHeadphones size={32} /> },
  { name: "Home & Garden", icon: <FaHome size={32} /> },
  { name: "Beauty", icon: <FaGifts size={32} /> },
];

function Brand() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover bg-center flex items-center justify-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-4  gap-4 sm:gap-6 w-full mx-auto px-3 py-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white border-2 rounded-full shadow-sm hover:shadow-md transition-shadow h-32 w-32"
            >
              <div className="mb-4 text-gray-700">{category.icon}</div>
              <span className="text-center text-sm font-medium">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
