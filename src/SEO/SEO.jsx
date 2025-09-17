// // src/components/SEO/SEO.jsx
// import React from "react";
// import { Helmet } from "react-helmet-async";

// const SEO = ({
//   title = "Sweet PencilBD - Your Creative Online Store",
//   description = "Sweet PencilBD offers high-quality creative products at affordable prices. Shop now for the best deals!",
//   keywords = "Sweet PencilBD, online store, creative products, art supplies, stationery",
//   image = "https://sweetpencilbd.xyz/sweetpencilbdlogo.png",
//   url = window.location.href,
//   type = "website",
// }) => {
//   return (
//     <Helmet>
//       {/* Standard metadata */}
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <meta name="keywords" content={keywords} />
//       <meta name="robots" content="index, follow" />

//       {/* OpenGraph metadata */}
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={image} />
//       <meta property="og:url" content={url} />
//       <meta property="og:type" content={type} />

//       {/* Twitter Card metadata */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={image} />

//       {/* Canonical URL */}
//       <link rel="canonical" href={url} />

//       {/* Google Analytics Script */}
//       <script
//         async
//         src={`https://www.googletagmanager.com/gtag/js?id=${process.env.VITE_GA_MEASUREMENT_ID}`}
//       ></script>
//       <script>
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${process.env.VITE_GA_MEASUREMENT_ID}');
//         `}
//       </script>
//     </Helmet>
//   );
// };

// export default SEO;
