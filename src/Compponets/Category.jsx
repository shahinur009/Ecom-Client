import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import baseUrl from "../Utilities/baseUrl";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/show-product`);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        const mapped = uniqueCategories.map((cat) => ({
          name: cat,
          image: getCategoryImage(cat),
        }));

        setCategories(mapped);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryImage = (cat) => {
    switch (cat) {
      case "New Born":
        return "/category/newborn.png";
      case "Baby Boy":
        return "/category/baby_boy.png";
      case "Baby Girl":
        return "/category/baby_girl.png";
      case "Toys":
        return "/category/toys.png";
      default:
        return "/placeholder.png";
    }
  };

  return (
    <div className="container shadow-2xl mx-auto flex flex-col items-center py-6">
      <h3 className="text-xl md:text-2xl font-bold underline text-red-500 my-6">
        All Categories
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-3 py-4 justify-items-center">
        {categories.map((cat, i) => (
          <Link
            key={i}
            to={`/categories/${encodeURIComponent(cat.name)}`}
            className="flex flex-col items-center justify-center p-4 bg-[#FB26AF] 
                       border-2 rounded-full shadow-sm hover:shadow-md 
                       transition-all h-40 w-40 hover:bg-[#74CDF5]"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="mb-2 w-20 h-20 object-contain"
            />
            <span className="text-lg font-medium text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
