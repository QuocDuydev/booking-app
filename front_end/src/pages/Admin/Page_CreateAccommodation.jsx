import React, { useState } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import { postAccommodation } from "../../api/acc_API";
import jwt_decode from "jwt-decode";
import CreateAccommodationForm from "../../components/Admin/CreateAccomodation_Form";

export default function CreateAccomodation() {
	const token = useAccessToken();
	const decodedToken = jwt_decode(token);
	const userId = decodedToken.user_id;
	const [accommodation, setAccommodations] = useState({
		acctype: "",
		user: userId,
		accname: "",
		images: [],
		descriptions: "",
		totalroom: "",
		roommap: "",
		location: "",
		rating: "",
		createdAt: new Date().toISOString().split("T")[0],
		updatedAt: new Date().toISOString().split("T")[0],
	});
	const [images, setImages] = useState([]);
	const navigate = useNavigate();
	const [CreateSuccess, setCreateSuccess] = useState(false);

	const handleCreate = async () => {
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
			formData.append("updatedAt", accommodation.updatedAt);

			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}

			const response = await postAccommodation(token, formData);
			console.log("Create successful:", response.data);
			setCreateSuccess(true);
			setTimeout(() => {
				setCreateSuccess(false);
				if (accommodation.acctype === "1") {
					navigate("/admin/list-hotel");
				} else if (accommodation.acctype === "2") {
					navigate("/admin/list-homestay");
				} else if (accommodation.acctype === "3") {
					navigate("/admin/list-motel");
				} else {
					navigate("/admin");
				}
			}, 1000);
		} catch (error) {
			console.error("Create failed:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "images" && files && files.length > 0) {
			const file = files[0];

			setAccommodations((prevAccommodation) => ({
				...prevAccommodation,
				[name]: file,
			}));
			setImages(files);
		} else {
			setAccommodations((prevAccommodation) => ({ ...prevAccommodation, [name]: value }));
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
					<CreateAccommodationForm
						accommodation={accommodation}
						handleChange={handleChange}
						handleCreate={handleCreate}
						setAccommodations={setAccommodations}
					/>
				</div>
			</div>
		</>
	);
}
