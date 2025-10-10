import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import baseUrl from "../../../Utilities/baseUrl";

const CreateBanner = () => {
  const [formData, setFormData] = useState({
    image: null,
  });
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      console.error("No image selected!");
      return;
    }

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formDataImage = new FormData();
    formDataImage.append("image", formData.image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataImage
      );

      const imageUrl = response.data.data.url;
      setImageURL(imageUrl);
      const formResponse = await axios.post(`${baseUrl}/create-banner`, {
        bannerImage: imageUrl,
      });
      Swal.fire({
        title: "Success!",
        text: "Banner uploaded successfully!",
        icon: "success",
      });
      navigate("/dashboard/banner");
    } catch (error) {
      console.error("Error uploading the image", error);
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Failed to upload banner image.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="bg-[#F8F8EC] h-[82vh] justify-center flex items-center flex-col">
      <div className="md:w-[40%] w-full shadow-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Upload Banner Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-900 border rounded-md"
              required
            />
          </div>
          <div className="py-5 flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 w-[80%] text-center text-white p-4 bg-red-400 font-bold rounded-md"
            >
              Banner Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBanner;
