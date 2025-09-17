import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bg from "../../../public/Login-background.jpg";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
// import SEO from "../../SEO/SEO";
import useGoogleAnalytics from "../../Hooks/useGoogleAnalytics";

function DetailsPage() {
  const { trackEvent } = useGoogleAnalytics();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    courierFee: "All Bangladesh Courier Fee Free",
    quantity: 1,
    totalCost: 0,
  });

  // Get product by ID
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let updatedValue = value;

      // Update the quantity and total cost
      if (name === "quantity") {
        updatedValue = Math.max(1, parseInt(value) || 1);
      }

      return {
        ...prev,
        [name]: updatedValue,
        totalCost:
          name === "quantity"
            ? updatedValue * (products?.price || 0) +
              (parseFloat(formData.courierFee) || 0)
            : name === "courierFee"
            ? parseFloat(updatedValue || 0) +
              prev.quantity * (products?.price || 0)
            : prev.totalCost,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      productName: products?.name,
      productPrice: products?.price,
      quantity: formData.quantity,
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

  if (loading) {
    return (
      <>
        {/* <SEO title="Loading..." /> */}
        <p>Loading...</p>
      </>
    );
  }

  if (!products) {
    return (
      <>
        {/* <SEO title="Product Not Found - Sweet PencilBD" /> */}
        <p>Product not found.</p>
      </>
    );
  }

  return (
    <>
      {/* <SEO
        title={`${products.name} - Sweet PencilBD`}
        description={
          products.details ||
          `Buy ${products.name} from Sweet PencilBD at best price`
        }
        keywords={`${products.name}, ${products.category}, Sweet PencilBD`}
        image={products.image}
      /> */}
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover bg-center flex flex-col md:flex-row justify-between p-8 mx-auto pt-32"
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={products?.image}
            alt={products.name}
            className="w-3/4 md:h-96 h-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-4 md:pl-20">
          <h1 className="text-lg md:text-2xl font-semibold mb-2">
            পণ্যের নামঃ {products.name}
          </h1>
          <div className="text-sm mb-4 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
          <div className="text-md md:text-lg mb-2">
            <p>
              <strong>বিস্তারিতঃ </strong> {products.details}
            </p>
            <p>
              <strong>কোম্পানি নামঃ</strong> {products.brand || "Unknown"}
            </p>
            <p>
              <strong>দামঃ</strong> {products.price}
            </p>
            <p>
              <strong>মজুদ আছেঃ </strong> {products.stock}
            </p>
          </div>

          {/* Customer Form */}
          <form onSubmit={handleSubmit} className="mt-4 p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">আপনার তথ্য দিন ! </h2>
            <div className="mb-4 ">
              <label className="block text-lg font-medium mb-2">
                আপনার নাম
              </label>
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
              <label className="block text-lg font-medium mb-2">
                আপনার মোবাইল নাম্বার
              </label>
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
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                আপনার ঠিকানা
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                placeholder="Enter your address"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">পরিমাণ </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full border rounded p-2 text-black"
                min="1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Courier Fee
              </label>
              <input
                type="number"
                name="courierFee"
                disabled
                value={formData.courierFee}
                onChange={handleInputChange}
                className="w-full border rounded p-2 bg-white"
                placeholder="সারাদেশে কুরিয়ার সার্ভিস ফ্রি !!! "
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                মোট টাকা{" "}
              </label>
              <input
                type="text"
                value={`${formData.totalCost}`}
                className="w-full border rounded p-2 text-black bg-gray-100"
                readOnly
              />
            </div>
            <button
              type="submit"
              className="bg-[#dc590d] px-3 py-2 hover:bg-[#703a1b] w-full text-xl text-white font-semibold rounded"
            >
              অর্ডার করুন
            </button>
          </form>
        </div>
        <a href="/" className="btn btn-warning">
          Back To Home
        </a>
      </div>
    </>
  );
}

export default DetailsPage;
