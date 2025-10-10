import React, { useEffect, useState } from "react";
import ProductCard from "../../Register/ProductCard";
import axios from "axios";
import baseUrl from "../../../Utilities/baseUrl";

function BrandProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    const res = await axios.get(`${baseUrl}/show-product`);
    // console.log(res.data)
    setProduct(res?.data);
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
    setLoading(false);
  }, []);
  return (
    <>
      <div>
        <h3 className="text-xl font-semibold md:text-4xl flex justify-center items-center my-6">
          Brand Products
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-h-screen p-5">
          {product.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BrandProduct;
