import React, { useState } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import { postHotel } from "../../api/hotel_API";
import CreateHotelForm from "../../components/Admin/CreateHotel_Form";

function CreateHotel() {
	const token = useAccessToken();
	const [hotel, setHotels] = useState({
		hotelname: "",
		images: [],
		descriptions: "",
		totalroom: "",
		roommap: "",
		location: "",
		rating: "",
		dateadded: new Date().toISOString().split("T")[0],
	});
	const [images, setImages] = useState([]);
	const navigate = useNavigate();
	const [CreateSuccess, setCreateSuccess] = useState(false);

	const handleCreate = async () => {
		try {
			const formData = new FormData();

			formData.append("hotelname", hotel.hotelname);
			formData.append("descriptions", hotel.descriptions);
			formData.append("totalroom", hotel.totalroom);
			formData.append("roommap", hotel.roommap);
			formData.append("location", hotel.location);
			formData.append("rating", hotel.rating);
			formData.append("dateadded", hotel.dateadded);

			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}

			const response = await postHotel(token, formData);
			console.log("Create successful:", response.data);
			setCreateSuccess(true);
			setTimeout(() => {
				setCreateSuccess(false);
				// navigate("/admin/list-hotel");
			}, 1000);
		} catch (error) {
			console.error("Create failed:", error);
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
			setImages(files);
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
					{CreateSuccess && (
						<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
							Create successfuly !!
						</Alert>
					)}
					<CreateHotelForm
						hotel={hotel}
						handleChange={handleChange}
						handleCreate={handleCreate}
					/>
				</div>
			</div>
		</>
	);
}
export default CreateHotel;
