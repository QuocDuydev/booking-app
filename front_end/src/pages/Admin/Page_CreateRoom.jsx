import React, { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useParams, useNavigate } from "react-router-dom";
import { useAccessToken } from "../../components/ultiti";
import { Alert } from "@material-tailwind/react";
import CreateRoomForm from "../../components/Admin/CreateRoom_Form";
import { getRoom_In_Accommodation, postRoom } from "../../api/room_in_acc_API";
import { getAccommodationdetail } from "../../api/acc_API";

function CreateRoom() {
	// biome-ignore lint/style/useConst: <explanation>
	let token = useAccessToken();
	const { acc_id } = useParams();
	const [images, setImages] = useState([]);
	const [amenities, setAmenities] = useState([]);
	const [room, setRoom] = useState({
		accommodations: acc_id,
		roomname: "",
		images: [],
		amenities: [],
		descriptions: "",
		roomprice: "",
		roomnumber: "",
		roomoccupancy: "",
		roomtype: "",
		createdAt: new Date().toISOString().split("T")[0],
		updatedAt: new Date().toISOString().split("T")[0],
	});
	const navigate = useNavigate();
	const [CreateSuccess, setCreateSuccess] = useState(false);
	const [selectedAmenities, setSelectedAmenities] = useState([]);

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "images" && files && files.length > 0) {
			const file = files[0];

			setRoom((prevRoom) => ({
				...prevRoom,
				[name]: file,
			}));
			setImages(files);
			setAmenities(name);
		} else {
			setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
		}
	};
	const handleAmenitiesChange = (selectedOptions) => {
		const selectedAmenities = selectedOptions.map((option) => ({
			id: option.value,
		}));
		setSelectedAmenities(selectedAmenities);
	};
	const handleSelectChange = (value) => {
		handleChange({ target: { name: "roomtype", value } });
	};

	const handleCreate = async () => {
		try {
			const accDetail = await getAccommodationdetail(acc_id);
			const totalRoomsAllowed = accDetail.totalroom;

			const roomsInAcc = await getRoom_In_Accommodation(acc_id);
			const currentRoomsCount = roomsInAcc.length;
			console.log(currentRoomsCount);

			if (totalRoomsAllowed > currentRoomsCount) {
				const formData = new FormData();
				formData.append("accommodations", room.accommodations);
				formData.append("roomname", room.roomname);
				formData.append("descriptions", room.descriptions);
				formData.append("roomprice", room.roomprice);
				formData.append("roomnumber", room.roomnumber);
				formData.append("roomoccupancy", room.roomoccupancy);
				formData.append("roomtype", room.roomtype);
				formData.append("createdAt", room.createdAt);
				formData.append("updatedAt", room.updatedAt);

				for (let i = 0; i < images.length; i++) {
					formData.append("images", images[i]);
				}

				for (let i = 0; i < selectedAmenities.length; i++) {
					formData.append("amenities", selectedAmenities[i].id);
				}

				const response = await postRoom(token, formData);
				console.log("Create successful:", response.data);
				setCreateSuccess(true);
				setTimeout(() => {
					setCreateSuccess(false);
					navigate(`/admin/${acc_id}/list-rooms/`);
				}, 1000);
			} else {
				alert("Cannot add room. Maximum room limit reached!");

				console.log("Cannot add room. Maximum room limit reached.");
			}
		} catch (error) {
			console.error("Create failed:", error);
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
					<CreateRoomForm
						room={room}
						setRoom={setRoom}
						handleChange={handleChange}
						handleSelectChange={handleSelectChange}
						handleCreate={handleCreate}
						handleAmenitiesChange={handleAmenitiesChange}
					/>
				</div>
			</div>
		</>
	);
}
export default CreateRoom;
