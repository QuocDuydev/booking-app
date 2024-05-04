import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getHoteldetail, putHotel } from "../../api/acc_API";
import { Alert } from "@material-tailwind/react";
import EditHotelForm from "../../components/Admin/EditHotel_Form";
import jwt_decode from "jwt-decode";

function EditHotel() {
	const token = useAccessToken();
	const decodedToken = jwt_decode(token);
	const userId = decodedToken.user_id;
	const { acc_id } = useParams();
	const [accommodation, setAccommodations] = useState({
		acctype: "",
		user: userId,
		accname: "",
		descriptions: "",
		totalroom: "",
		roommap: "",
		location: "",
		rating: "",
		createdAt: "",
		updatedAt: "",
	});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const hotelData = await getHoteldetail(acc_id, token);
				console.log(hotelData);
				setAccommodations(hotelData);
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [acc_id, token]);
	const handleUpdate = async () => {
		try {
			const formData = new FormData();
			formData.append("acctype", accommodation.acctype);
			formData.append("user", accommodation.user);
			formData.append("accname", accommodation.accname);
			formData.append("descriptions", accommodation.descriptions);
			formData.append("totalroom", accommodation.totalroom);
			formData.append("roommap", accommodation.roommap);
			formData.append("location", accommodation.location);
			formData.append("rating", accommodation.rating);
			formData.append("createdAt", accommodation.createdAt);
			formData.append("updatedAt", new Date().toISOString().split("T")[0]);

			const response = await putHotel(token, formData, acc_id);
			console.log("Update successful:", response.data);
			setUpdateSuccess(true);
			setTimeout(() => {
				setUpdateSuccess(false);
				let navigateUrl = "/admin";

				if (accommodation.acctype === 1) {
					navigateUrl = "/admin/list-hotel";
				} else if (accommodation.acctype === 2) {
					navigateUrl = "/admin/list-homestay";
				} else if (accommodation.acctype === 3) {
					navigateUrl = "/admin/list-motel";
				}

				navigate(navigateUrl);
			}, 1000);
		} catch (error) {
			console.error("Update failed:", error);
		}
	};
	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "images" && files && files.length > 0) {
			const file = files[0];

			setAccommodations((prevHotel) => ({
				...prevHotel,
				[name]: file,
			}));
		} else {
			setAccommodations((prevHotel) => ({ ...prevHotel, [name]: value }));
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
						accommodation={accommodation}
						handleChange={handleChange}
						handleUpdate={handleUpdate}
					/>
				</div>
			</div>
		</>
	);
}
export default EditHotel;
