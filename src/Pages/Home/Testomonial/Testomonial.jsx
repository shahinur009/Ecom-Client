import React from "react";

function Testimonial() {
  return (
    <section className="py-4 px-4 bg-gray-100 text-center">
      <h1 className="text-red-500 text-xl md:text-4xl font-bold mb-6">
        গ্রাহকদের মতামত
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { text: "“চমৎকার সেবা! আমি খুবই সন্তুষ্ট।”", name: "রাজিব হাসান" },
          {
            text: "“এক কথায় অসাধারণ! আমি আবারও ব্যবহার করব।”",
            name: "সুমন আহমেদ",
          },
          {
            text: "“গুণগত মান খুব ভালো, দারুণ অভিজ্ঞতা।”",
            name: "তানভীর ইসলাম",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="max-w-xs p-6 bg-[#36f1d5] shadow-lg rounded-lg text-center"
          >
            <p className="text-gray-700 italic"> {testimonial.text} </p>
            <strong className="block mt-4 text-gray-900">
              - {testimonial.name}
            </strong>
          </div>
        ))}
      </div>
      <a
        href="tel:+8801622604352"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md text-sm md:text-lg"
      >
        অর্ডার করতে:+880 1623503666
      </a>
    </section>
  );
}

export default Testimonial;
