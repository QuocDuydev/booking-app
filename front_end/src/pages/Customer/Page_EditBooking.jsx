import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccessToken } from "../../components/ultiti";
import { Alert } from "@material-tailwind/react";
import  Navbars  from "../../components/Customer/Layout/Navbar";
import { getHotel } from "../../api/acc_API";
import { getRoom } from "../../api/room_in_acc_API";
import { getBookingId } from "../../api/booking_API";
import { putBooking } from "../../api/booking_API";
import FormEditBooking from "../../components/Customer/Form_EditBooking";

function EditBooking() {
	const token = useAccessToken();
	const { booking_id } = useParams();
	const [hotel, setHotel] = useState([]);
	const [room, setRoom] = useState([]);
	const [booking, setBooking] = useState({
		user: "",
		hotel: "",
		room: "",
		name: "",
		email: "",
		phonenumber: "",
		address: "",
		checkin: "",
		checkout: "",
		total: 0,
		datebooking: "",
		status: "",
	});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(
		() => {
			const fetchData = async () => {
				try {
					const [hotelData, roomData, bookingData] = await Promise.all([
						getHotel(token),
						getRoom(token),
						getBookingId(booking_id, token),
					]);
					setHotel(hotelData);
					setRoom(roomData);
					setBooking(bookingData);
					console.log(bookingData);
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};
			fetchData();
		},
		[booking_id],
		token,
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
	};

	const formatDate = (date) => {
		if (!date) return "";

		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		// Thêm số 0 phía trước nếu tháng hoặc ngày là một chữ số
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	};
	const handleUpdate = async () => {
		if (booking.status === "active") {
			alert("Cannot update an active booking!");
		} else {
			try {
				const bookingData = {
					user: booking.user,
					hotel: booking.hotel,
					room: booking.room,
					name: booking.name,
					email: booking.email,
					phonenumber: booking.phonenumber,
					address: booking.address,
					checkin: formatDate(new Date(booking.checkin)),
					checkout: formatDate(new Date(booking.checkout)),
					total: booking.total,
					datebooking: booking.datebooking,
					status: booking.status,
				};

				const response = await putBooking(booking_id, token, bookingData);

				console.log("Create successful:", response.data);
				console.log("Update successful:", response.data);
				setUpdateSuccess(true);
				setTimeout(() => {
					setUpdateSuccess(false);
					navigate("/list-booking");
				}, 1000);
			} catch (error) {
				console.error("Update failed:", error);
				// Hiển thị thông báo lỗi hoặc xử lý lỗi khác
			}
		}
	};

	const selectedHotel = hotel.find((item) => item.hotel_id === booking.hotel);
	const selectedRoom = room.find((items) => items.room_id === booking.room);
	return (
		<>
			<Navbars />
			<div className=" ">
				<div className="flex flex-col flex-1 w-full">
					{updateSuccess && (
						<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
							Update successfuly !!
						</Alert>
					)}
					<div className=" container m-4 text-red-500">
						<FormEditBooking
							selectedHotel={selectedHotel}
							selectedRoom={selectedRoom}
							booking={booking}
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
