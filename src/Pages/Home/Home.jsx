import React from "react";
import Banner from "../../Compponets/Banner";
import ProductsPage from "../Products/ProductsPage";
import FAQ from "./FAQ/FAQ";
import Gallery from "./Gallery/Gallery";
// import Videos from "./Videos/VIdeos";
import WhyChoiceUs from "./WhyChoiceUs/WhyChoiceUs";
import VideoGallery from "./VideoGallery/VideoGallery";
import Testimonial from "./Testomonial/Testomonial";
import Pricing from "./Pricsing/Pricsing";
import Rules from "./Rules/Rules";
// import SEO from "../../SEO/SEO";

function Home() {
  return (
    <>
 
      <div>
        <Banner></Banner>
        <Rules></Rules>
        {/* <Category></Category> */}
        <ProductsPage></ProductsPage>
        <Gallery />
        <WhyChoiceUs></WhyChoiceUs>
        {/*<Videos></Videos> */}
        <VideoGallery></VideoGallery>
        <Testimonial></Testimonial>
        <Pricing></Pricing>
        <FAQ></FAQ>
      </div>
    </>
  );
}

export default Home;
