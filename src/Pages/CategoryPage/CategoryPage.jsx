import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "All"
  );
  const [priceRange, setPriceRange] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/show-product");
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];

        const mappedCategories = uniqueCategories.map((cat) => ({
          name: cat,
          image: getCategoryImage(cat),
          isActive: true,
        }));

        setCategories([
          { name: "All", image: "/logo.png", isActive: true },
          ...mappedCategories,
        ]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/show-product");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based selected category and price
  useEffect(() => {
    let filtered = products;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    filtered = filtered.filter((product) => product.price <= priceRange);

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, products]);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName]);

  // Get category image
  const getCategoryImage = (category) => {
    switch (category) {
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
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <div className="container mx-auto my-24 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 bg-white px-6 rounded-lg shadow-lg">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-[#FB26AF]">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "bg-[#FB26AF] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } ${
                      !category.isActive ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!category.isActive}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <IoIosArrowForward
                      className={`transition-transform ${
                        selectedCategory === category.name
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-[#74CDF5]">
              Filter by Price
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: ৳{priceRange}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>৳0</span>
                  <span>৳10000</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Selected range:</span>
                <span className="font-bold text-[#FB26AF]">
                  ৳0 - ৳{priceRange}
                </span>
              </div>
            </div>
          </div>

          {/* Products Count */}
          <div className="bg-[#74CDF5] text-white p-4 rounded-lg text-center">
            <h4 className="font-bold text-lg">Available Products</h4>
            <p className="text-2xl font-bold mt-2">{filteredProducts.length}</p>
          </div>
        </div>

        {/* Right Side - Products Grid */}
        <div className="w-full lg:w-3/4">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <CategoryCard key={product._id} item={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#74CDF5] hover:bg-[#FB26AF] text-white"
                    }`}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === pageNumber
                              ? "bg-[#FB26AF] text-white"
                              : "bg-gray-200 hover:bg-[#74CDF5] hover:text-white"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span key={pageNumber} className="px-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#74CDF5] hover:bg-[#FB26AF] text-white"
                    }`}
                  >
                    Next
                  </button>
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
