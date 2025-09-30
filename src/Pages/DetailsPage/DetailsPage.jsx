import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaArrowLeft,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { toast } from "react-toastify";
import { TbCoinTaka } from "react-icons/tb";
import axios from "axios";
import useGoogleAnalytics from "../../Hooks/useGoogleAnalytics";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CartContext } from "../Utilities/cartContext";

function DetailsPage() {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { trackEvent } = useGoogleAnalytics();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useContext(CartContext);

  const imageRef = useRef(null);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // Get product by ID
  const getProductById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/show-product/${id}`);
      if (res.status === 200) {
        setProduct(res.data);
        // Track product view in GA
        trackEvent("view_item", "products", res.data.name, res.data.price);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
    }
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    if (!product) return;
    const exist = cart.find((item) => item.id === product._id);

    if (exist) {
      toast.info("Already added this product to cart!", {
        position: "top-right",
      });
      return;
    }

    const updatedCart = [
      ...cart,
      {
        id: product._id,
        name: product.name,
        price: product.price,
        qty: quantity,
        image: selectedImage || (product.images && product.images[0]),
      },
    ];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`successfully added to cart!`, {
      position: "top-right",
    });
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "pop",
      "width=600,height=500"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=Check%20out%20this%20product:&url=${encodeURIComponent(
        window.location.href
      )}`,
      "pop",
      "width=600,height=500"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        window.location.href
      )}&title=${encodeURIComponent(product?.name || "Product")}`,
      "pop",
      "width=600,height=500"
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeleton height={400} className="rounded-xl" />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton width={300} height={30} />
            <Skeleton width={200} height={25} />
            <Skeleton width={100} height={20} />
            <Skeleton count={4} />
            <Skeleton width={150} height={50} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <h2 className="text-xs font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-xs">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-[#FB26AF] text-white px-6 py-3 rounded-lg hover:bg-[#74CDF5] transition-colors duration-300 mx-auto text-xs font-bold"
          >
            <FaArrowLeft /> Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="pt-24 md:pt-32 pb-8 md:pb-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#FB26AF] hover:text-[#74CDF5] mb-6 transition-colors duration-200 text-xs font-bold border p-2 rounded-md shadow-md"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Product Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center relative">
              {selectedImage && (
                <div className="w-full max-w-md mx-auto">
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-auto object-contain max-h-96"
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto py-2">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition 
                      ${
                        selectedImage === img
                          ? "border-[#FB26AF]"
                          : "border-gray-300"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-2 md:space-y-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-start items-center gap-2">
                  <h3 className="font-semibold text-xl text-gray-900 mb-1 md:mb-2">
                    Price
                  </h3>
                  <p className="text-xl font-bold text-[#FB26AF] flex items-center">
                    <TbCoinTaka className="inline mr-1" />
                    {product.price}
                  </p>
                </div>

                {product.details && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                      Details
                    </h3>
                    <p className="text-gray-700">
                      {showFullDetails
                        ? product.details
                        : product.details.length > 150
                        ? product.details.substring(0, 150) + "..."
                        : product.details}
                      {product.details.length > 150 && (
                        <span
                          onClick={() => setShowFullDetails(!showFullDetails)}
                          className="text-[#74CDF5] ml-1 cursor-pointer text-sm hover:underline mt-1 transition-all duration-300"
                        >
                          {showFullDetails ? "See Less" : "See More"}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {product.category && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                      Category
                    </h3>
                    <p className="text-gray-700">{product.category}</p>
                  </div>
                )}

                {product.brand && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                      Brand
                    </h3>
                    <p className="text-gray-700">{product.brand}</p>
                  </div>
                )}

                {product.stock && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                      Stock
                    </h3>
                    <p className="text-gray-700">{product.stock}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 md:gap-4">
                  <h3 className="font-semibold text-gray-900">Quantity:</h3>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-3 md:px-4 py-1 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-[#74CDF5] bg-opacity-20 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Total Price
                  </h3>
                  <p className="text-lg font-bold text-[#FB26AF] flex items-center">
                    <TbCoinTaka className="inline mr-1" />
                    {product.price * quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-[#74CDF5] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#FB26AF] transition-colors duration-300 font-medium flex-1"
                >
                  <FiCreditCard /> Add to Cart
                </button>
              </div>

              {/* Social Share */}
              <div className="relative mt-4">
                <div className="flex gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-gray-700 font-medium self-center">
                    Share:
                  </span>
                  <button
                    onClick={shareOnFacebook}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook size={20} />
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={20} />
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
