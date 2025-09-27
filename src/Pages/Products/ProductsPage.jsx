import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import SEO from "../../SEO/SEO";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/show-product");
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
        <h3 className="text-xl flex justify-center items-center my-6">
          <span className="text-red-500 flex mx-auto font-bold underline cursor-pointer justify-center text-xl md:text-2xl">
            All products
          </span>
        </h3>
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
