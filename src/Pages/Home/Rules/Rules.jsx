import React from "react";
import bg from "../../../../public/bg-6.jpg";

function Rules() {
  return (
    <section
      className="container mx-auto py-5 flex justify-center items-center gap-4"
      
    >
      <div className="bg-[#F139EF]/70 py-12 px-6 mt-4 rounded-lg shadow-lg max-w-xl mx-auto backdrop-blur-sm">
        <h2 className="text-xl font-bold text-black text-center mb-4">
          📌 অর্ডার করার নিয়ম
        </h2>
        <ul className="list-none space-y-3 text-black md:text-lg text-sm">
          <li>✅ আপনার সিলেক্ট করা প্রোডাক্টে ক্লিক করে বিস্তারিত পড়ুন।</li>
          <li>
            ✅ পছন্দ হলে নিচে থাকা <b>অর্ডার ফর্ম</b> পূরণ করুন।
          </li>
          <li>
            ✅ সঠিক তথ্য দিয়ে <b>নাম, মোবাইল নম্বর, ঠিকানা</b> লিখুন।
          </li>
          <li>
            ✅ <b>প্রোডাক্ট ক্যাশ অন ডেলিভারি দেওয়া হয়।</b>
          </li>
          <li>
            ✅ কুরিয়ার ফি অগ্রিম প্রদান করুন। নির্ধারিত নাম্বারে বিকাশ, নগদ,
            রকেট যেকোন একাউন্ট থেকে।
          </li>
          <li>
            ✅ ঢাকার ভিতরে ২৪-৪৮ ঘণ্টা এবং ঢাকার বাহিরে ২৪-৭২ ঘণ্টার মধ্যে
            ডেলিভারি পাবেন।
          </li>
        </ul>
      </div>

      <div className="bg-[#F139EF]/70 py-8 px-6 mt-4 rounded-lg shadow-lg max-w-xl mx-auto backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-black text-center mb-4">
          📌 Order Rules
        </h2>
        <ul className="list-none space-y-3 text-black md:text-xl text-sm">
          <li>✅ Click on your selected product and read the details.</li>
          <li>✅ If you like it, fill out the order form below.</li>
          <li>✅ Enter your correct name, mobile number, and address.</li>
          <li>✅ Products are delivered via Cash on Delivery.</li>
          <li>
            ✅ Pay the courier fee in advance through bKash, Nagad, or Rocket to
            the specified number.
          </li>
          <li>
            ✅ Delivery within 24-48 hours inside Dhaka and 24-72 hours outside
            Dhaka.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Rules;
