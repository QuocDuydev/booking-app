import { useState } from "react";
import Navbars from "../../components/Customer/Layout/Navbar";
import Footer from "../../components/Customer/Layout/Footer";
import HotelDetails from "../../components/Customer/HotelDetails";
import RoominHotel from "../../components/Customer/Room_in_Hotel";
import { DefaultTimeline } from "../../components/Customer/Layout/Timeline";
import ShowRecomment from "../../components/Customer/Recomment";
function ShowHotelDetails() {
	return (
		<>
			<Navbars />
			<main className="content ">
				<div className="container mx-auto">
					<HotelDetails />
					<RoominHotel />
					<DefaultTimeline />
					<ShowRecomment />
					<Footer />
				</div>
			</main>
		</>
	);
}
export default ShowHotelDetails;
