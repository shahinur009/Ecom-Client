import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import baseUrl from "../../Utilities/baseUrl";

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "All"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/show-product`);
        const data = res.data;

        setProducts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        const mappedCategories = [
          { name: "All", image: "/logo.png" },
          ...uniqueCategories.map((cat) => ({
            name: cat,
            image: getCategoryImage(cat),
          })),
        ];
        setCategories(mappedCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    const categoryToFilter = categoryName || selectedCategory;
    if (categoryToFilter && categoryToFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryToFilter);
    }

    filtered = filtered.filter((p) => p.price <= priceRange);

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, categoryName, selectedCategory, priceRange]);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    }
  }, [categoryName]);

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

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfLast - productsPerPage,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    navigate(`/categories/${encodeURIComponent(cat)}`);
  };

  return (
    <div className="container mx-auto my-24 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white px-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-[#FB26AF]">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((cat, i) => (
              <li key={i}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    (categoryName || selectedCategory) === cat.name
                      ? "bg-[#FB26AF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={cat.image} alt={cat.name} className="w-8 h-8" />
                    <span>{cat.name}</span>
                  </div>
                  <IoIosArrowForward />
                </button>
              </li>
            ))}
          </ul>

          {/* Price Filter */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#74CDF5]">
              Filter by Price
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block mb-2 text-sm">
                Max Price: ৳{priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm mt-2 text-gray-600">৳0 - ৳{priceRange}</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {currentProducts.map((item) => (
                  <CategoryCard key={item._id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === idx + 1
                          ? "bg-[#FB26AF] text-white"
                          : "bg-gray-200 hover:bg-[#74CDF5]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-600">
                No products found
              </h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
