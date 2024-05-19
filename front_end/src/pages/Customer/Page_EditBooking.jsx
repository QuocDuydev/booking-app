import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccessToken } from "../../components/ultiti";
import { Alert } from "@material-tailwind/react";
import Navbars from "../../components/Customer/Layout/Navbar";
import { getAccommodation } from "../../api/acc_API";
import { getRoom } from "../../api/room_in_acc_API";
import { getBookingId } from "../../api/booking_API";
import { putBooking } from "../../api/booking_API";
import FormEditBooking from "../../components/Customer/Form_EditBooking";
import ScrollToTop from "../../components/Customer/Layout/ScrollTop";
import { getRoomType } from "../../api/acc-type_API";

function EditBooking() {
	const token = useAccessToken();
	const { booking_id } = useParams();
	const [accs, setAccommodations] = useState([]);
	const [room, setRoom] = useState([]);
	const [roomtypes, setRoomtypes] = useState([]);
	const [booking, setBooking] = useState({
		user: "",
		accommodations: "",
		rooms: "",
		name: "",
		email: "",
		phonenumber: "",
		address: "",
		checkin: "",
		checkout: "",
		total: 0,
		createdAt: "",
		updatedAt: new Date(),
	});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [accData, roomData, bookingData, roomtypeData] =
					await Promise.all([
						getAccommodation(token),
						getRoom(token),
						getBookingId(booking_id, token),
						getRoomType(),
					]);
				setAccommodations(accData);
				setRoom(roomData);
				setBooking(bookingData);
				setRoomtypes(roomtypeData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [booking_id, token]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
	};

	const formatDate = (date) => {
		if (!date) return "";

		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	};

	const handleUpdate = async () => {
		if (booking.status === "active") {
			alert("Không thể hủy đơn đặt phòng này!");
		} else {
			try {
				const bookingData = {
					user: booking.user,
					accommodations: booking.accommodations,
					rooms: booking.rooms,
					name: booking.name,
					email: booking.email,
					phonenumber: booking.phonenumber,
					address: booking.address,
					checkin: formatDate(new Date(booking.checkin)),
					checkout: formatDate(new Date(booking.checkout)),
					total: booking.total,
					createdAt: booking.createdAt,
					updatedAt: booking.updatedAt,
					status: booking.status,
				};

				const response = await putBooking(booking_id, token, bookingData);

				console.log("Update successful:", response.data);
				setUpdateSuccess(true);
				setTimeout(() => {
					setUpdateSuccess(false);
					navigate("/list-booking");
				}, 1000);
			} catch (error) {
				console.error("Update failed:", error);
			}
		}
	};

	const selectedAcc = accs.find(
		(item) => item.acc_id === booking.accommodations,
	);
	const selectedRoom = room.find((items) => items.room_id === booking.rooms);
	const selectedRoomType = roomtypes.find(
		(type) => type.roomtype_id === selectedRoom?.roomtype,
	);
	return (
		<>
			<Navbars />
			<ScrollToTop />
			<div className=" ">
				<div className="flex flex-col flex-1 w-full">
					{updateSuccess && (
						<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
							Cập nhật thông tin đặt phòng thành công !!
						</Alert>
					)}
					<div className=" container m-4 text-red-500">
						<FormEditBooking
							selectedAcc={selectedAcc}
							selectedRoom={selectedRoom}
							booking={booking}
							selectedRoomType={selectedRoomType}
							handleUpdate={handleUpdate}
							handleChange={handleChange}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default EditBooking;
