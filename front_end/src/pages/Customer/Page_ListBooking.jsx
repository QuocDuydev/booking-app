import React, { useState, useEffect } from "react";
import Navbars from "../../components/Customer/Layout/Navbar";
import Footer from "../../components/Customer/Layout/Footer";

import { useAccessToken } from "../../components/ultiti";
import { getBookingbyuserid } from "../../api/booking_API";
import { patchBooking } from "../../api/booking_API";
import ListBookings from "../../components/Customer/List_Booking";
import ListHistory from "../../components/Customer/List_History";
import ScrollToTop from "../../components/Customer/Layout/ScrollTop";

function ShowListBooking() {
	const token = useAccessToken();
	const [booking, setBookings] = useState([]);
	const [historybooking, setHistoryBookings] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [bookingData] = await Promise.all([getBookingbyuserid(token)]);
				// Filter out bookings with status === "hide"
				const visibleBookings = bookingData.filter(
					(booking) => booking.status !== "hide",
				);

				setHistoryBookings(bookingData);
				setBookings(visibleBookings);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);

	const handleDelete = async (item) => {
		const isConfirmed = window.confirm("Bạn muốn hủy đơn đặt phòng này?");
		if (isConfirmed) {
			if (item.status === "active") {
				alert("Không thể hủy đơn đặt phòng này!");
			} else {
				try {
					await patchBooking(item.booking_id, token);
					const updatedBookings = await getBookingbyuserid(token);
					setBookings(updatedBookings);
					window.location.reload();
				} catch (error) {
					console.error("Error deleting booking:", error);
				}
			}
		}
	};

	return (
		<>
			<Navbars />
			<ScrollToTop />
			<main className="content">
				<div className=" container mx-auto">
					<ListBookings booking={booking} handleDelete={handleDelete} />
					<ListHistory historybooking={historybooking} />
					<Footer />
				</div>
			</main>
		</>
	);
}
export default ShowListBooking;
