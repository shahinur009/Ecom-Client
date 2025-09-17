import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddVideo() {
  const [formData, setFormData] = useState({
    video: null,
  });
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.video) {
      console.error("No video selected!");
      return;
    }

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formDataVideo = new FormData();
    formDataVideo.append("video", formData.video);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataVideo
      );

      const videoUrl = response.data.data.url;
      setImageURL(videoUrl);
      const formResponse = await axios.post(
        "http://localhost:5000/create-video",
        { bannerImage: videoUrl }
      );
      Swal.fire({
        title: "Success!",
        text: "video uploaded successfully!",
        icon: "success",
      });
      navigate("/dashboard/video");
    } catch (error) {
      console.error("Error uploading the video", error);
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Failed to upload gallery video.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  return (
    <div className="bg-[#F8F8EC] h-[82vh] justify-center flex items-center flex-col">
      <div className="md:w-[40%] w-full shadow-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Upload Gallery Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Video</label>
            <input
              type="file"
              name="video"
              onChange={handleVideoChange}
              className="mt-1 block w-full text-sm text-gray-900 border rounded-md"
              required
            />
          </div>
          <div className="py-5 flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 w-[80%] text-center text-white p-4 bg-red-400 font-bold rounded-md"
            >
              Video Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVideo;
