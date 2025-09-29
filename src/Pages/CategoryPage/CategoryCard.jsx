import React, { useContext } from "react";
import { FcRating } from "react-icons/fc";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../Utilities/cartContext";

function CategoryCard({ item }) {
  const { cart, setCart } = useContext(CartContext);

  const firstImage =
    item?.images && item.images.length > 0
      ? item.images[0]
      : "/placeholder.png";

  const addToCart = () => {
    const exist = cart.find((p) => p.id === item._id);

    if (exist) {
      toast.info("Already add to cart this product", {
        position: "top-right",
      });
      return;
    }

    const updatedCart = [
      ...cart,
      {
        id: item._id,
        name: item.name,
        price: item.price,
        image: firstImage,
        qty: 1,
      },
    ];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("successfully add to cart", {
      position: "top-right",
    });
  };

  return (
    <div className="shadow border-2 transform transition-transform duration-300 hover:scale-105 hover:bg-[#9be8dd] text-black rounded-md m-1 text-center">
      <Link to={`details/${item._id}`}>
        <div className="w-full h-52 overflow-hidden flex justify-center items-center bg-white">
          <img
            src={firstImage}
            alt={item?.name || "Product"}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="px-4 py-2 space-y-2">
        <h1 className="font-bold text-sm truncate">{item?.name}</h1>

        <div className="flex flex-col justify-between items-center gap-2">
          <span className="text-black font-normal text-sm flex justify-center items-center gap-1">
            Price- <TbCoinTaka /> {item?.price}
          </span>
          <div className="flex gap-1 mb-2">
            <span className="text-black font-normal text-sm -mt-1">
              Ratings-
            </span>
            <FcRating />
            <FcRating />
            <FcRating />
            <FcRating />
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link
            to={`details/${item._id}`}
            className="bg-[#74CDF5] px-3 py-1 text-xs rounded-2xl hover:bg-[#FB26AF]"
          >
            Order Now
          </Link>
          <button
            onClick={addToCart}
            className="bg-[#74CDF5] px-3 py-1 text-xs rounded-2xl hover:bg-[#FB26AF]"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
