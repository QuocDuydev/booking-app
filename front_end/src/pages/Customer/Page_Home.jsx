// export default Home;
import React from "react";
import  Navbars  from "../../components/Customer/Layout/Navbar";
import CarouselDefault from "../../components/Customer/Layout/HeroSlider";
import CardHotelHome from "../../components/Customer/Card_Hotel_Home";
import GridGallery from "../../components/Customer/Grid-Galery";
import GridLocation from "../../components/Customer/Grid-Location";
import AccordionCustomIcon from "../../components/Customer/Layout/Accordion";
import Footer from "../../components/Customer/Layout/Footer";

function Home() {
  return (
    <>
      <Navbars />
      <CarouselDefault />
      <main className="content ">
        <div className='container mx-auto relative'>
          <CardHotelHome />
          <GridGallery />
          <GridLocation />
          <AccordionCustomIcon />
          <Footer />
        </div>
      </main>
     
    </>
  );
} export default Home;

