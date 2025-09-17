import { useState } from "react";
import bg from "../../../../public/Login-background.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../Utilities/Utilities";

const AddGallery = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload image to IMGBB
      const image_url = await imageUpload(image);
      console.log(image_url);
      if (!image_url) throw new Error("Image upload failed!");

      // Send to backend with correct key 'bannerImage'
      const res = await axios.post(
        "http://localhost:5000/create-gallery",
        { bannerImage: image_url }, // Use 'bannerImage' instead of 'image'
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      if (res && res.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Image added to Gallery!",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
        navigate("/dashboard/gallery");
      }
    } catch (error) {
      console.error("Error from AddGallery", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover bg-center min-h-screen w-full mx-auto bg-white p-6 flex rounded-lg shadow-md items-center"
    >
      <div className="w-[50%] mx-auto">
        <h2 className="md:text-3xl text-md font-extrabold mb-6 text-center">
          Add New Gallery Image
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="''">
            <label className="block text-gray-700">Select Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f57224] text-white p-2 mt-4"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add to Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGallery;
