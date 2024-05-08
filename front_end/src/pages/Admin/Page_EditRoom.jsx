import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { Alert } from "@material-tailwind/react";
import EditRoomForm from "../../components/Admin/EditRoom_Form";
import { getAccommodation } from "../../api/acc_API";
import {
	getRoomdetail_In_Accommodation,
	putRoom,
} from "../../api/room_in_acc_API";

function EditRoom() {
	const token = useAccessToken();
	const { acc_id, room_id } = useParams();
	const [acc, setAccommodations] = useState([]);
	const [room, setRooms] = useState({
		accommodations: "",
		roomname: "",
		descriptions: "",
		roomprice: "",
		roomnumber: "",
		roomoccupancy: "",
		roomtype: "",
		createdAt: "",
		updatedAt: new Date(),
	});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [accData, roomData] = await Promise.all([
					getAccommodation(),
					getRoomdetail_In_Accommodation(acc_id, room_id),
				]);

				// Lấy ra đối tượng phòng từ mảng roomData
				const roomObject = roomData[0];
				setAccommodations(accData);
				setRooms(roomObject);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [acc_id, room_id]);

	const handleUpdate = async () => {
		try {
			const roomData = {
				accommodations: room.accommodations,
				roomname: room.roomname,
				roomimage: room.roomimage,
				descriptions: room.descriptions,
				roomprice: room.roomprice,
				roomnumber: room.roomnumber,
				roomoccupancy: room.roomoccupancy,
				roomtype: room.roomtype,
				createdAt: room.createdAt,
				updatedAt: room.updatedAt,
			};

			const response = await putRoom(room_id, token, roomData);
			console.log("Update successful:", response.data);
			setUpdateSuccess(true);
			setTimeout(() => {
				setUpdateSuccess(false);
				navigate(`/admin/${acc_id}/list-rooms/`);
			}, 1000);
		} catch (error) {
			console.error("Update failed:", error);
		}
	};
	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "roomimage" && files && files.length > 0) {
			const file = files[0];

			setRooms((prevRoom) => ({
				...prevRoom,
				[name]: file,
			}));
		} else {
			setRooms((prevRoom) => ({ ...prevRoom, [name]: value }));
		}
	};
	// const handleSelectChange = (value) => {
	// 	handleChange({ target: { name: "room_type", value } });
	// };
	const selectedAccommodations = acc.find(
		(item) => item.acc_id === room.accommodations,
	);
	return (
		<>
			<div className=" flex h-screen overflow-hidden">
				<div className="hidden lg:block">
					<Sidebar_Admin />
				</div>
				<div className="flex flex-col flex-1 w-full">
					<Header_Admin />
					{updateSuccess && (
						<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
							Update successfuly !!
						</Alert>
					)}
					<EditRoomForm
						room={room}
						handleChange={handleChange}
						handleUpdate={handleUpdate}
						selectedAccommodations={selectedAccommodations}
					/>
				</div>
			</div>
		</>
	);
}
export default EditRoom;
