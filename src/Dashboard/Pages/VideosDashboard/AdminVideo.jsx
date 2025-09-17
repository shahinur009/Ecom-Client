import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AdminVideo() {
  const API_URL = import.meta.env.VITE_API_URL || " ";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);

  // Fetch galleries
  const getVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/videos`);
      setVideos(response.data);
      console.log("video", response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/video-delete/${id}`);
          setVideos((previewVideo) =>
            previewVideo.filter((video) => video._id !== id)
          );

          Swal.fire({
            position: "top",
            icon: "success",
            title: "video deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Failed to delete video:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete video!",
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F8F8EC] p-4">
      <h1 className="text-xl md:text-3xl font-bold md:my-6 my-4 uppercase text-center">
        Videos Info
      </h1>

      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <div className="flex mb-4">
          <Link
            to="create-video"
            className="text-white p-3 bg-green-600 rounded-t-md font-semibold"
          >
            Create Video Gallery
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Loading Videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500">No Videos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="max-w-sm rounded-lg shadow-lg bg-white h-80"
              >
                <img
                  src={video.videos}
                  alt="videos"
                  className="rounded-lg cursor-pointer h-60 w-full object-cover"
                  onClick={() => setPreviewVideo(video.videos)}
                />

                <div className="p-4">
                  <div className="flex flex-col mx-auto  justify-between items-center">
                    {/* <h3 className="text-lg font-semibold">{banner.title}</h3> */}
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="text-white p-2 bg-red-400 rounded-md font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {previewVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
          onClick={() => setPreviewVideo(null)}
        >
          <div className="relative">
            <img
              src={previewVideo}
              alt="Preview"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminVideo;
