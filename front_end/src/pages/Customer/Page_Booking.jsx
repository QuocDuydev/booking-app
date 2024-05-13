import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbars from "../../components/Customer/Layout/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import { useAccessToken } from "../../components/ultiti";
import { postBooking } from "../../api/booking_API";
import { getAccommodationdetail } from "../../api/acc_API";
import { getRoomdetail_In_Accommodation } from "../../api/room_in_acc_API";
import { Alert } from "@material-tailwind/react";
import CardLeftBooking from "../../components/Customer/Card_Left_Booking";
import CardRightBooking from "../../components/Customer/Card_Right_Booking";
import { getRoomType } from "../../api/acc-type_API";

export default function Booking() {
	const { acc_id, room_id } = useParams();
	const token = useAccessToken();
	const decodedToken = jwt_decode(token);
	const userId = decodedToken.user_id;
	const navigate = useNavigate();
	const [rooms, setRooms] = useState([]);
	const [accs, setAccommodations] = useState([]);
	const [roomtype, setRoomtypes] = useState([]);
	const [booking, setBooking] = useState({
		user: userId,
		accommodations: acc_id,
		rooms: room_id,
		name: "",
		email: "",
		phonenumber: "",
		address: "",
		checkin: "",
		checkout: "",
		total: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const [CreateSuccess, setCreateSuccess] = useState(false);

	const formatDate = (date) => {
		if (!date) return "";

		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		// Thêm số 0 phía trước nếu tháng hoặc ngày là một chữ số
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0 + ${day}` : day;

		return `${year}-${month}-${day}`;
	};

	// Hàm tính tổng tiền dựa trên giá phòng và số đêm lưu trú
	const handleChange = (e) => {
		const { name, value } = e.target;
		setBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
	};

	const calculateNumberOfDays = () => {
		// Kiểm tra xem booking có tồn tại không
		if (!booking || !booking.checkin || !booking.checkout) return 0;

		// Lấy giá trị checkin và checkout từ state booking
		const { checkin, checkout } = booking;

		// Tính số ngày giữa checkin và checkout
		const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
		const numberOfDays = Math.round(
			Math.abs((new Date(checkout) - new Date(checkin)) / oneDay),
		);

		return numberOfDays;
	};
	const totalPrice =
		rooms.reduce((acc, room) => acc + room.roomprice, 0) *
		calculateNumberOfDays();

	const handleCreate = async () => {
		try {
			const bookingData = {
				user: booking.user,
				accommodations: booking.accommodations,
				rooms: booking.rooms,
				name: booking.name,
				email: booking.email,
				phonenumber: booking.phonenumber,
				address: booking.address,
				checkin: formatDate(booking.checkin),
				checkout: formatDate(booking.checkout),
				total: totalPrice,
				createdAt: booking.createdAt,
				updatedAt: booking.updatedAt,
				status: booking.status,
			};

			const response = await postBooking(token, bookingData);

			console.log("Create successful:", response.data);
			setCreateSuccess(true);
			setBooking(response.data);
			setTimeout(() => {
				navigate("/list-booking");
				setCreateSuccess(false);
			}, 1000);
		} catch (error) {
			console.error("Create failed:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [accData, roomData, roomtypeData] = await Promise.all([
					getAccommodationdetail(acc_id),
					getRoomdetail_In_Accommodation(acc_id, room_id),
					getRoomType(),
				]);
				console.log(roomtypeData);
				setAccommodations(accData);
				setRooms(roomData);
				setRoomtypes(roomtypeData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [acc_id, room_id]);
	const selectRoomType = roomtype.find(
		(item) => item.roomtype_id === rooms.roomtype,
	);
	return (
		<>
			<Navbars />
			{CreateSuccess && (
				<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
					Đặt phòng thành công!
				</Alert>
			)}
			<div className="container mx-auto relative max-w-screen-2xl bg-blue-50">
				<div className="flex flex-wrap px-3 py-3">
					<div className="flex flex-col lg:w-1/3 md:w-1/3 sm:w-full w-full">
						<CardLeftBooking
							booking={booking}
							setBooking={setBooking}
							rooms={rooms}
							accs={accs}
							calculateNumberOfDays={calculateNumberOfDays}
						/>
					</div>
					<div className="flex flex-col lg:w-2/3 md:w-2/3 sm:w-full w-full">
						<CardRightBooking
							booking={booking}
							rooms={rooms}
							selectRoomType={selectRoomType}
							handleChange={handleChange}
							handleCreate={handleCreate}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
