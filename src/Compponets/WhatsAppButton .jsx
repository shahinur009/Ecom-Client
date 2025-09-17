// src/Compponets/WhatsAppButton.jsx
import React from "react";

const WhatsAppButton = () => {
  const handleClick = () => {
    const phone = "+8801623503666";
    const message = encodeURIComponent(
      "Hello, I'm interested in your products from Sweet PencilBD website!"
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12 2a10 10 0 0 1 8.17 15.79c.15.27.17.61.06.9l-1.7 5.1a1 1 0 0 1-1.24.65l-4.57-1.5a1 1 0 0 0-.7-.1A10 10 0 1 1 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.5 7.5a1 1 0 0 1 0 2h-7a1 1 0 0 1 0-2h7z" />
      </svg>
    </button>
  );
};

export default WhatsAppButton;
