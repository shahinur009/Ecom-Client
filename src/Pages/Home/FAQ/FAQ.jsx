import React from "react";

function FAQ() {
  return (
    <div className="container w-[90%] mx-auto flex flex-col justify-center items-center">
      <h1 className="text-red-500 text-xl md:text-4xl font-bold mb-6 flex mx-auto">
        আপনার সকল প্রশ্নের উত্তর{" "}
      </h1>
      <div className="join join-vertical w-full bg-[#F8F8EC] flex justify-center items-center mb-5">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-sm md:text-xl font-medium">
            প্রশ্নঃ মেডিসিনটা ব্যবহার করে কি কোন সাইড ইফেক্ট হবে ?
          </div>
          <div className="collapse-content bg-white pt-3">
            <p>
              উত্তরঃ এটা সম্পূর্ণ আয়ুর্বেদিক এবং গাছ গাছড়ার মিশ্রণসমৃদ্ধ একটা
              মেডিসিন যা ব্যবহারে কোন ধরনেরপার্শ্ব প্রতিক্রিয়া বা সাইড ইফেক্ট
              হবেনা ।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <a
                href="tel:+8801622604352"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-2 py-2 font-semibold text-white rounded bg-yellow-500 hover:bg-yellow-600  text-center"
              >
                Call: +880 1623503666
              </a>
              <a
                href="https://wa.me/+8801622604352"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-2 py-2 font-semibold text-white rounded bg-[#dc590d] hover:bg-[#8a3706] text-center"
              >
                WhatsApp: +880 1623503666
              </a>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-sm md:text-xl font-medium">
            প্রশ্নঃ মেডিসিনটা ব্যবহার করে কতক্ষণ সময় পাবো ?
          </div>
          <div className="collapse-content bg-white pt-3">
            <p>
              উত্তরঃ মেডিসিনটা ব্যবহার করে আপনি একের অধিক বার পর্যন্ত যৌন মিলন
              করতে পারবেন প্রতিবারের ৩০/৩৫ মিনিট সময় পাবেন ?
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-sm md:text-xl font-medium">
            প্রশ্নঃ আমার পেনিস টা তো অনেক ছোট ?
          </div>
          <div className="collapse-content bg-white pt-3">
            <p>
              উত্তরঃ আমাদের মেডিসিনের ফুল কোর্স টা ব্যবহারে আপনার লিঙ্গটাকে ৬
              থেকে ৮ ইঞ্চি পরিমাণে লম্বা করতে পারবে।
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-sm md:text-xl font-medium">
            প্রশ্নঃ এটা কি ওয়ান টাইম মেডিসিন ?
          </div>
          <div className="collapse-content bg-white pt-3">
            <p>
              উত্তরঃ আমাদের ফুল কোর্স মেডিসিন টা ব্যবহার আপনি পাচ্ছেন
              পরিপূর্ণ স্থায়ী সমাধান
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
