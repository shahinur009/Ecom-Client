import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminBannerHome = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch Banners
  const getBanners = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/get-banner");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
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
          await axios.delete(`http://localhost:5000/banner-delete/${id}`);
          setBanners((prevBanners) =>
            prevBanners.filter((banner) => banner._id !== id)
          );

          Swal.fire({
            position: "top",
            icon: "success",
            title: "Banner deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Failed to delete banner:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete banner!",
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F8F8EC] p-4">
      <h1 className="text-xl md:text-3xl font-bold md:my-6 my-4 uppercase text-center">
        Banner Info
      </h1>

      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <div className="flex mb-4">
          <Link
            to="create-banner"
            className="text-white p-3 bg-green-600 rounded-t-md font-semibold"
          >
            Create Banner
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Loading banners...</p>
        ) : banners.length === 0 ? (
          <p className="text-center text-gray-500">No banners found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="max-w-sm rounded-lg shadow-lg bg-white h-80"
              >
                <img
                  src={banner.bannerImage}
                  alt="banner-image"
                  className="rounded-lg cursor-pointer h-60 flex flex-col mx-auto"
                  onClick={() => setPreviewImage(banner.bannerImage)}
                />
                <div className="p-4">
                  <div className="flex flex-col mx-auto  justify-between items-center">
                    {/* <h3 className="text-lg font-semibold">{banner.title}</h3> */}
                    <button
                      onClick={() => handleDelete(banner._id)}
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

      {/* 🔹 Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
          onClick={() => setPreviewImage(null)} // Close on background click
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
};

export default AdminBannerHome;
