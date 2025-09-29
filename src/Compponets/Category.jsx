import React, { useEffect, useState } from "react";
import axios from "axios";
import newborn from "../../public/category/baby_boy.png";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/show-product");
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        // console.log("category", response);
        const mappedCategories = uniqueCategories.map((cat) => ({
          name: cat,
          image:
            cat === "New Born"
              ? "../../public/category/newborn.png"
              : cat === "Baby Boy"
              ? "../../public/category/baby_boy.png"
              : cat === "Baby Girl"
              ? "../../public/category/baby_girl.png"
              : cat === "Toys"
              ? "../../public/category/toys.png"
              : "/placeholder.png",
        }));

        setCategories(mappedCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container shadow-2xl mx-auto flex justify-center flex-col items-center py-3">
      <h3 className="text-xl flex justify-center items-center my-6">
        <span className="text-red-500 flex mx-auto font-bold underline cursor-pointer justify-center text-xl md:text-2xl">
          All Categories
        </span>
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-3 py-4 justify-items-center items-center">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${encodeURIComponent(category.name)}`}
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
