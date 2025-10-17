import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../Utilities/baseUrl";

function AddVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      Swal.fire("Invalid File", "Please upload a valid video file.", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile)
      return Swal.fire("No file", "Please select a video", "warning");

    const storageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
      },
      (error) => {
        console.error(error);
        Swal.fire("Error", "Video upload failed!", "error");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await axios.post(`${baseUrl}/create-video`, { videos: downloadURL });
        Swal.fire("Success", "Video uploaded successfully!", "success");
        navigate("/dashboard/video");
      }
    );
  };

  return (
    <div className="bg-[#F8F8EC] h-[82vh] flex items-center justify-center">
      <div className="md:w-[40%] w-full shadow-xl mx-auto p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Upload Gallery Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="block w-full border rounded-md p-2"
            required
          />

          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-400 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 w-full text-white bg-red-400 font-bold rounded-md"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVideo;
