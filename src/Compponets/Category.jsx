import React from "react";
import bg from "../../public/Login-background.jpg";
import newBornImg from "../../public/category/newborn.png";
import babyBoyImg from "../../public/category/baby_boy.png";
import babyGirlImg from "../../public/category/baby_girl.png";
import toysImg from "../../public/category/toys.png";

const categories = [
  { name: "New Born", image: newBornImg },
  { name: "Baby Boy", image: babyBoyImg },
  { name: "Baby Girl", image: babyGirlImg },
  { name: "Toys", image: toysImg },
];

function Category() {
  return (
    <>
      <div className="container shadow-2xl mx-auto flex justify-center flex-col items-center py-3">
        <h3 className="text-xl flex justify-center items-center my-6">
          <span className="text-red-500 flex mx-auto justify-center text-2xl md:text-5xl">
            Categories
          </span>
        </h3>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-3 py-4 
                  justify-items-center items-center"
        >
          {categories.map((category, index) => (
            <a
              href="#"
              key={index}
              className="flex flex-col items-center justify-center 
                   p-4 bg-[#FB26AF] border-2 rounded-full shadow-sm 
                   hover:shadow-md transition-shadow h-40 w-40 hover:bg-[#74CDF5]"
            >
              <img
                className="mb-2 w-20 h-20 object-contain"
                src={category.image}
                alt={category.name}
              />
              <span className="text-center text-lg font-medium">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
