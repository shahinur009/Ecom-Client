import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Compponets/Navbar";
import Footer from "../Compponets/Footer";
import ReactWhatsapp from "react-whatsapp";
import { Helmet } from "react-helmet-async";
import WhatsAppButton from "../Compponets/WhatsAppButton ";

function Main() {

  return (
    <div>
      <Helmet>
        <html lang="bn" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#36f1d5" />

        {/* Default SEO Meta Tags */}
        <title>Rab_Baby_Zone - আপনার ক্রিয়েটিভ অনলাইন স্টোর</title>
        <meta
          name="description"
          content="Rab_Baby_Zone - বাংলাদেশের সেরা ক্রিয়েটিভ পণ্যের অনলাইন স্টোর। উচ্চ মানের পণ্য সহজেই ঘরে বসে অর্ডার করুন।"
        />
        <meta
          name="keywords"
          content="Rab_Baby_Zone, অনলাইন শপ, ক্রিয়েটিভ পণ্য, আর্ট সামগ্রী, স্টেশনারি, বাংলাদেশ"
        />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rabbabyzone.com/" />
        <meta
          property="og:title"
          content="Rab_Baby_Zone - আপনার ক্রিয়েটিভ অনলাইন স্টোর"
        />
        <meta
          property="og:description"
          content="Rab_Baby_Zone - বাংলাদেশের সেরা ক্রিয়েটিভ পণ্যের অনলাইন স্টোর। উচ্চ মানের পণ্য সহজেই ঘরে বসে অর্ডার করুন।"
        />
        <meta
          property="og:image"
          content="https://rabbabyzone.com/sweetpencilbdlogo.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rabbabyzone.com/" />
        <meta
          property="twitter:title"
          content="Rab_Baby_Zone - আপনার ক্রিয়েটিভ অনলাইন স্টোর"
        />
        <meta
          property="twitter:description"
          content="Rab_Baby_Zone - বাংলাদেশের সেরা ক্রিয়েটিভ পণ্যের অনলাইন স্টোর। উচ্চ মানের পণ্য সহজেই ঘরে বসে অর্ডার করুন।"
        />
        <meta
          property="twitter:image"
          content="https://rabbabyzone.com/sweetpencilbdlogo.png"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://rabbabyzone.com/" />
      </Helmet>

      <WhatsAppButton />

      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
