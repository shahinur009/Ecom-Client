import React from "react";
import bg from "../../public/Login-background.jpg";
import { FaAdjust, FaBriefcase, FaHeadphones } from "react-icons/fa";
import { FaPaintbrush } from "react-icons/fa6";

const categories = [
  { name: "Maca Gold", icon: <FaBriefcase size={32} /> },
  { name: "Prime Test", icon: <FaPaintbrush size={32} /> },
  { name: "Female Products", icon: <FaBriefcase size={32} /> },
  { name: "Male Products", icon: <FaAdjust size={32} /> },
];

function Category() {
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
