import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import baseUrl from "../../../Utilities/baseUrl";

function AdminGallery() {
  const API_URL = import.meta.env.VITE_API_URL || " ";
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch galleries
  const getGalleries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/gallery`);
      setGalleries(response.data);
      console.log("gallery", response.data);
    } catch (error) {
      console.error("Error fetching Galleries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGalleries();
  }, []);

  // Delete Banner
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
          await axios.delete(`${baseUrl}/gallery-delete/${id}`);
          setGalleries((prevGalleries) =>
            prevGalleries.filter((gallery) => gallery._id !== id)
          );

          Swal.fire({
            position: "top",
            icon: "success",
            title: "Gallery deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Failed to delete Gallery:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete Gallery Image!",
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F8F8EC] p-4">
      <h1 className="text-xl md:text-3xl font-bold md:my-6 my-4 uppercase text-center">
        Gallery Info
      </h1>

      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <div className="flex mb-4">
          <Link
            to="create-gallery"
            className="text-white p-3 bg-green-600 rounded-t-md font-semibold"
          >
            Create Gallery
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Loading galleries...</p>
        ) : galleries.length === 0 ? (
          <p className="text-center text-gray-500">No galleries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <div
                key={gallery._id}
                className="max-w-sm rounded-lg shadow-lg bg-white h-80"
              >
                <img
                  src={gallery.image}
                  alt="Gallery"
                  className="rounded-lg cursor-pointer h-60 w-full object-cover"
                  onClick={() => setPreviewImage(gallery.image)}
                />

                <div className="p-4">
                  <div className="flex flex-col mx-auto  justify-between items-center">
                    {/* <h3 className="text-lg font-semibold">{banner.title}</h3> */}
                    <button
                      onClick={() => handleDelete(gallery._id)}
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
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
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

export default AdminGallery;
