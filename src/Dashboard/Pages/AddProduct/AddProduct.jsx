import { useState } from "react";
import bg from "../../../../public/Login-background.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Utilities/Utilities";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    details: "",
    stock: "",
    price: "",
    brand: "",
    category: "",
    color: "",
    model: "",
    images: [], // multiple image support
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle multiple image file changes
  const handleImageChange = (e) => {
    setProduct({ ...product, images: [...e.target.files] });
  };

  const { name, details, stock, price, brand, category, color, model } =
    product;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // upload multiple images
      const uploadedImages = await Promise.all(
        product.images.map((img) => imageUpload(img))
      );

      const sendingData = {
        name,
        images: uploadedImages, // store array of image URLs
        details,
        stock,
        price,
        brand,
        category,
        color,
        model,
      };

      const res = await axios.post(
        "http://localhost:5000/add-product",
        sendingData
      );

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
        navigate("/dashboard/stock");
      }
    } catch (error) {
      console.error("Error from add product", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover bg-center min-h-screen w-full mx-auto bg-white p-6 flex rounded-lg shadow-md items-center"
    >
      <div className="w-[50%] mx-auto ">
        <h2 className="md:text-3xl text-md font-extrabold mb-6 text-center">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* details */}
          <div>
            <label className="block text-gray-700">Product Details</label>
            <textarea
              name="details"
              value={product.details}
              onChange={handleChange}
              className="w-full p-2 border resize-none border-gray-300 rounded-md"
              required
            />
          </div>

          {/* category */}
          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              
            />
          </div>

          {/* stock */}
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              
            />
          </div>

          {/* color */}
          <div>
            <label className="block text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              
            />
          </div>

          {/* brand */}
          <div>
            <label className="block text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              
            />
          </div>

          {/* model */}
          <div>
            <label className="block text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={product.model}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              
            />
          </div>

          {/* price */}
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* multiple images */}
          <div>
            <label className="block text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f57224] text-white p-2 mt-4"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
