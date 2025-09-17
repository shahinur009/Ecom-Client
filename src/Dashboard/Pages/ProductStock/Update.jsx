import { useEffect, useState } from "react";
import bg from "../../../../public/Login-background.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { imageUpload } from "../../../Utilities/Utilities";

const Update = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    details: "",
    stock: "",
    price: "",
    brand: "",
    image: "",
  });

  // Fetch the product data based on ID from the URL
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/singleProduct/${id}`
        );
        console.log("update", response);
        if (response.data) {
          setProduct({
            ...response.data,
            image: response.data.image || "",
          });
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
        toast.error("Failed to fetch product data");
      }
    };

    fetchProductData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let image_url = product.image;

      // Upload new image if changed
      if (product.image instanceof File) {
        image_url = await imageUpload(product.image);
      }

      const updatedProduct = {
        ...product,
        image: image_url, // Keep existing image if no new image is uploaded
      };

      await axios.put(
        `http://localhost:5000/updateProduct/${id}`,
        updatedProduct,
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoading(false);
      navigate("/dashboard/stock");
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Product update failed!");
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
          Update Product
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Product Details", name: "details", type: "textarea" },
            { label: "Stock", name: "stock", type: "number" },
            { label: "Brand", name: "brand", type: "text" },
            { label: "Price", name: "price", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={product[name]}
                  onChange={handleChange}
                  className="w-full p-2 border resize-none border-gray-300 rounded-md"
                  required
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={product[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {product.image && !(product.image instanceof File) && (
              <img
                src={product.image}
                alt="Product"
                className="mt-2 w-32 h-32 object-cover border rounded-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#f57224] text-white p-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
