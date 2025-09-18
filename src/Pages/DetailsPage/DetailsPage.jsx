import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import axios from "axios";
import useGoogleAnalytics from "../../Hooks/useGoogleAnalytics";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DetailsPage() {
  const { trackEvent } = useGoogleAnalytics();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    courierFee: "All Bangladesh Courier Fee Free",
    totalCost: 0,
  });

  // Get product by ID
  const getProductById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/show-product/${id}`);
      if (res.status === 200) {
        setProducts(res.data);
        setFormData((prev) => ({
          ...prev,
          totalCost: res.data.price || 0,
        }));

        // Track product view in GA
        trackEvent("view_item", "products", res.data.name, res.data.price);
      } else {
        setProducts(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProducts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const incrementQuantity = () => {
    const newQuantity = Math.min(quantity + 1, 99);
    setQuantity(newQuantity);
    updateTotalCost(newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    updateTotalCost(newQuantity);
  };

  const updateTotalCost = (qty) => {
    if (products) {
      setFormData((prev) => ({
        ...prev,
        totalCost: qty * (products.price || 0),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      productName: products?.name,
      productPrice: products?.price,
      quantity: quantity,
      courierFee: formData.courierFee,
      totalCost: formData.totalCost,
      orderDate: new Date(),
      status: "Pending",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/place-order",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Track conversion in GA
        trackEvent("purchase", "ecommerce", products.name, formData.totalCost);

        Swal.fire({
          title: "Success!",
          text: "Order submitted! We will contact you shortly.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const message = `I'm interested in this product: ${products.name}\nPrice: ${products.price} BDT\n\n${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
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
      )}&title=${encodeURIComponent(products.name)}`,
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

  if (!products) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium mx-auto"
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
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Product Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={products?.image}
                alt={products.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-xl"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x600?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {products.name}
                </h1>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                  <span className="text-gray-500 text-sm ml-1">
                    (4 reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                    Price
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-indigo-600">
                    {products.price} BDT
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                    Details
                  </h3>
                  <p className="text-gray-700">{products.details}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                    Brand
                  </h3>
                  <p className="text-gray-700">{products.brand || "Unknown"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">
                    Stock
                  </h3>
                  <p className="text-gray-700">{products.stock}</p>
                </div>

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
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-3 md:pt-4">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#128C7E] transition-colors duration-300 font-medium"
                >
                  <FaWhatsapp size={20} /> Contact via WhatsApp
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium flex-1"
                >
                  <FiCreditCard /> Order Now
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

        {/* Customer Form */}
        <div className="mt-8 md:mt-12 bg-[#FB26AF] container mx-auto rounded-xl max-w-md shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-center">
            For Order Fill the Form
          </h2>
          <form onSubmit={handleSubmit} className="gap-2">
            <div className="mb-2">
              <label className="block text-lg font-medium mb-2">Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Mobile</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-lg font-medium mb-2">District</label>
              <input
                name="district"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your district"
                required
                rows="3"
              ></input>
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-lg font-medium mb-2">Upzila</label>
              <input
                name="upzila"
                value={formData.upzila}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your upzila"
                required
                rows="3"
              ></input>
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-lg font-medium mb-2">Village</label>
              <input
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your village"
                required
                rows="3"
              ></input>
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-lg font-medium mb-2">House No</label>
              <input
                name="house"
                value={formData.house}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your House No"
                required
                rows="3"
              ></input>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Total Amount
              </label>
              <input
                type="text"
                value={`${formData.totalCost} BDT`}
                className="w-full border rounded p-2 text-black bg-gray-100"
                readOnly
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="bg-[#dc590d] px-6 py-3 hover:bg-[#703a1b] w-full text-xl text-white font-semibold rounded uppercase"
              >
                Order Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
