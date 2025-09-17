import { useEffect, useState } from "react";
import bg from "../../../../public/Login-background.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ProductsStock = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Electronics", "Clothing", "Furniture"];

  // get products from the database based on current page and category
  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/stock`, {
        params: {
          category: selectedCategory === "All" ? "" : selectedCategory,
          page: currentPage,
          limit: productsPerPage,
        },
      });
      setProducts(res.data.products);
      setTotalProducts(res.data.totalCount); // Assuming your API returns total product count
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, selectedCategory]);

  // Calculate total pages based on total products
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/delete/${id}`);
          // Remove the deleted product from the local state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Product deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getProducts(); // Fetch products again after deletion
        } catch (error) {
          // console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete product!",
          });
        }
      }
    });
  };

  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="px-4 mx-auto bg-cover bg-center min-h-screen w-full bg-white"
    >
      <div className="flex flex-col mb-6">
        {/* Filter by Category */}
        <h1 className="text-md md:text-3xl font-extrabold mx-auto uppercase p-5">
          All Stock Summary
        </h1>
        <div className="mb-4">
          <label className="mr-2 font-medium text-gray-700">
            Filter by Category:
          </label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Serial
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Product Name
                    </th>
                    {/* <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Category
                    </th> */}
                    <th></th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Stock
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {product.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {product.stock}
                        </td>
                        <div className="flex justify-center gap-4 items-center">
                          <Link
                            to={`/dashboard/update/${product._id}`}
                            className="btn btn-secondary"
                          >
                            Update
                          </Link>
                          <button
                            type="button"
                            className="btn btn-error"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            className={`px-4 py-2 text-sm font-medium text-gray-700 capitalize bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={`px-4 py-2 text-sm font-medium text-gray-700 capitalize bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsStock;
