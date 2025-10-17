import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import baseUrl from "../../Utilities/baseUrl";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
// import SEO from "../../SEO/SEO";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/show-product`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="border-t border-gray-400 my-6">
        <div
          className="my-6 flex justify-center items-center gap-4"
        >
          <h3 className="text-red-500 flex mx-auto font-bold underline cursor-pointer text-xl md:text-2xl">
            All products
          </h3>
          <Link to={`/categories/:category`} className="text-red-500 hover:text-black hover:bg-gray-200 text-sm font-semibold flex justify-center items-center gap-2 border rounded-xl px-4 py-2">
            <span>View All</span>
            <FaArrowAltCircleRight />
          </Link>
        </div>
        {loading ? (
          <p className="text-center text-lg">
            <AiOutlineLoading3Quarters />
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-2">
            {products.length > 0 ? (
              products.map((item) => <ProductCard item={item} key={item._id} />)
            ) : (
              <div className="flex justify-center items-center w-full col-span-3">
                <p className="text-center text-lg">No product found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
