// export default Home;
import React from "react";
import Navbars from "../../components/Customer/Layout/Navbar";
import CarouselDefault from "../../components/Customer/Layout/HeroSlider";
import GridGallery from "../../components/Customer/Grid-Galery";
import GridLocation from "../../components/Customer/Grid-Location";
import AccordionCustomIcon from "../../components/Customer/Layout/Accordion";
import Footer from "../../components/Customer/Layout/Footer";
import ListCardHotel from "../../components/Customer/List_Card_Hotel";
import ListCardHomeStay from "../../components/Customer/List_Card_HomeStay";
import ListCardMotel from "../../components/Customer/List_Card_Motel";

function Home() {
	return (
		<>
			<Navbars />
			<CarouselDefault />
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
