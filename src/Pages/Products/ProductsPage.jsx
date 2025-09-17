import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
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
          <span className="text-red-500 flex mx-auto justify-center text-2xl md:text-5xl">
            ভাইরাল প্রডাক্ট
          </span>
        </h3>
        {loading ? (
          <p className="text-center text-lg">লোড হচ্ছে...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2">
            {products.length > 0 ? (
              products.map((item) => <ProductCard item={item} key={item._id} />)
            ) : (
              <p className="text-center text-lg">কোনো প্রোডাক্ট নেই</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
