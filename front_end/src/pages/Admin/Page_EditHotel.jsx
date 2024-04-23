import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getHoteldetail, putHotel } from "../../api/hotel_API";
import { Alert } from "@material-tailwind/react";
import EditHotelForm from "../../components/Admin/EditHotel_Form";

function EditHotel() {
	const token = useAccessToken();
	const { hotel_id } = useParams();
	const [hotel, setHotels] = useState({
		hotelname: "",
		descriptions: "",
		totalroom: "",
		roommap: "",
		location: "",
		rating: "",
		dateadded: "",
	});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const hotelData = await getHoteldetail(hotel_id, token);
				setHotels(hotelData);
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [hotel_id, token]);
	const handleUpdate = async () => {
		try {
			const hotelData = {
				hotelname: hotel.hotelname,
				descriptions: hotel.descriptions,
				totalroom: hotel.totalroom,
				roommap: hotel.roommap,
				location: hotel.location,
				rating: hotel.rating,
				dateadded: hotel.dateadded,
			};

			const response = await putHotel(token, hotelData, hotel_id);
			console.log("Update successful:", response.data);
			setUpdateSuccess(true);
			setTimeout(() => {
				setUpdateSuccess(false);
				navigate("/admin/list-hotel");
			}, 1000);
		} catch (error) {
			console.error("Update failed:", error);
		}
	};
	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "images" && files && files.length > 0) {
			const file = files[0];

			setHotels((prevHotel) => ({
				...prevHotel,
				[name]: file,
			}));
		} else {
			setHotels((prevHotel) => ({ ...prevHotel, [name]: value }));
		}
	};

	return (
		<>
			<div className=" flex h-screen overflow-hidden">
				<Sidebar_Admin />
				<div className="flex flex-col flex-1 w-full">
					<Header_Admin />
					{updateSuccess && (
						<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
							Update successfuly !!
						</Alert>
					)}
					<EditHotelForm
						hotel={hotel}
						handleChange={handleChange}
						handleUpdate={handleUpdate}
					/>
				</div>
			</div>
		</>
	);
}
export default EditHotel;
