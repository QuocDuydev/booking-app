// export default Home;
import React from "react";
import Navbars from "../../components/Customer/Layout/Navbar";
import GridGallery from "../../components/Customer/Grid-Galery";
import AccordionCustomIcon from "../../components/Customer/Layout/Accordion";
import Footer from "../../components/Customer/Layout/Footer";
import ListCardHotel from "../../components/Customer/List_Card_Hotel";
import ListCardHomeStay from "../../components/Customer/List_Card_HomeStay";
import ListCardMotel from "../../components/Customer/List_Card_Motel";
import SlideBar from "../../components/Customer/Layout/HeroSlider";
import ScrollToTop from "../../components/Customer/Layout/ScrollTop";

function Home() {
	return (
		<>
			<Navbars />
			<div className="hidden 2lx:block lg:block md:block">
				<SlideBar />
			</div>
			<ScrollToTop />
			<main className="content ">
				<div className="container mx-auto relative">
					<ListCardHotel />
					<ListCardHomeStay />
					<ListCardMotel />
					<GridGallery />
					<AccordionCustomIcon />
					<Footer />
				</div>
			</main>
		</>
	);
}
export default Home;
