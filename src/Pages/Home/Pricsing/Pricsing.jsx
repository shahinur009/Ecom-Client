import React from "react";

function Pricing() {
  return (
    <section className="py-4 text-center bg-[#f8f8ec]">
      <h2 className="text-red-500 flex mx-auto justify-center text-2xl md:text-5xl mb-5">
        রমজান উপলক্ষ্যে বিশাল মূল্য ছাড় !!!
      </h2>
      <div className="max-w-lg mx-auto p-6 bg-[#36f1d5] text-white shadow-lg rounded-lg">
        <p className="text-xl font-bold text-blue-600">সকল পণ্যে-</p>
        <p className=" text-red-600 font-bold text-2xl ">ডিসকাউন্ট-: ৩৫%</p>
        <ul className="mt-4 text-gray-700 space-y-2">
          <li>✅ ২৪/৭ সাপোর্ট</li>
          <li>✅ ডাক্টারের সাথে পরামর্শের সুযোগ </li>
          <li>✅ ফ্রি দ্রুত ডেলিভারি</li>
        </ul>
        <a
          href="tel:+8801622604352"
          target="_blank"
          rel="noopener noreferrer"
          className="my-1 md:my-3 flex mx-auto justify-center items-center md:w-96 w-full btn btn-warning md:font-bold md:text-xl text-sm "
        >
          অর্ডার করতে: +880 1623503666
        </a>
      </div>
    </section>
  );
}

export default Pricing;
