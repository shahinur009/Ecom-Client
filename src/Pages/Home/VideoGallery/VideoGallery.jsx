import React from "react";

function VideoGallery() {
  return (
    <section className="py-4 px-4 bg-[#f8f8ec] text-center">
      <h2 className="text-red-500 text-xl md:text-4xl font-bold mb-6">
        ভিডিও গ্যালারি
      </h2>
      <div className="flex justify-center flex-wrap gap-4">
        <iframe
          className="w-full sm:w-[350px] h-[200px] md:w-[560px] md:h-[315px] rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/6E3y3BS9N6M"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <a
        href="tel:+8801622604352"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block px-6 py-3 bg-yellow-500 text-white font-bold text-sm md:text-lg rounded-md hover:bg-yellow-600 transition"
      >
        অর্ডার করতে: +880 1623-503666
      </a>
    </section>
  );
}

export default VideoGallery;
