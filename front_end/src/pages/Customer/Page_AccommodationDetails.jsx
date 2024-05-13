import Navbars from "../../components/Customer/Layout/Navbar";
import Footer from "../../components/Customer/Layout/Footer";
import { DefaultTimeline } from "../../components/Customer/Layout/Timeline";
import ShowRecomment from "../../components/Customer/Recomment";
import AccommodationDetails from "../../components/Customer/Accommodation_Details";
import RoominAccommodation from "../../components/Customer/Room_in_Accommodation";
import MapAcc from "../../components/Customer/Map";
export default function ShowAccomodationDetails() {
	return (
		<>
			<Navbars />
			<main className="content ">
				<div className="container mx-auto">
					<AccommodationDetails />
					<MapAcc />
					<RoominAccommodation />
					<DefaultTimeline />
					<ShowRecomment />
					<Footer />
				</div>
			</main>
		</>
	);
}
