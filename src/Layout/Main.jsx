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
        <title>
          Rab_Baby_Zone - শিশুদের পোশাক, খেলনা ও বেবি কেয়ার অনলাইন শপ
        </title>
        <meta
          name="description"
          content="Rab_Baby_Zone - বাংলাদেশের বিশ্বস্ত অনলাইন শপ শিশুদের পোশাক, খেলনা, বেবি কেয়ার এবং প্রয়োজনীয় সব পণ্যের জন্য। ঘরে বসেই কিনুন নিরাপদ ও মানসম্মত প্রোডাক্ট।"
        />
        <meta
          name="keywords"
          content="Rab_Baby_Zone, baby shop, kids fashion, baby toys, baby care, শিশুদের পোশাক, খেলনা, অনলাইন বেবি শপ বাংলাদেশ"
        />
        <meta name="author" content="Rab_Baby_Zone" />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rabbabyzone.com/" />
        <meta
          property="og:title"
          content="Rab_Baby_Zone - শিশুদের পোশাক, খেলনা ও বেবি কেয়ার অনলাইন শপ"
        />
        <meta
          property="og:description"
          content="Rab_Baby_Zone এ পাওয়া যায় শিশুদের জন্য মানসম্মত পোশাক, খেলনা ও বেবি কেয়ার পণ্য। আপনার সন্তানের জন্য নিরাপদ ও সেরা জিনিস কিনুন ঘরে বসেই।"
        />
        <meta
          property="og:image"
          content="https://rabbabyzone.com/rabsbabyzones-logo.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rabbabyzone.com/" />
        <meta
          property="twitter:title"
          content="Rab_Baby_Zone - শিশুদের পোশাক, খেলনা ও বেবি কেয়ার অনলাইন শপ"
        />
        <meta
          property="twitter:description"
          content="Rab_Baby_Zone - শিশুদের জন্য মানসম্মত ও নিরাপদ প্রোডাক্ট অনলাইন শপ। পোশাক, খেলনা, বেবি কেয়ার সবকিছু একসাথে।"
        />
        <meta
          property="twitter:image"
          content="https://rabbabyzone.com/rabsbabyzones-logo.png"
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
