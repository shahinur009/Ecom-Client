import axios from "axios";
import React, { useEffect, useState } from "react";
import AllProductCard from "./AllProductCard";

function AllProducts() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/show-product");
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
        <hr />
        <h3 className="text-xl font-semibold md:text-4xl flex justify-center items-center my-6">
          Best For You
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {product.map((item) => (
            <AllProductCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
