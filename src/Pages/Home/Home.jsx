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
import Category from "../../Compponets/Category";
// import SEO from "../../SEO/SEO";

function Home() {
  return (
    <> 
      <div>
        <Banner></Banner>        
        <Category></Category>
        <ProductsPage></ProductsPage>
        <Rules></Rules>
      </div>
    </>
  );
}

export default Home;
