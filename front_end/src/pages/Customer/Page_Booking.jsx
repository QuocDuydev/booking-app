import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbars from "../../components/Customer/Layout/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import { useAccessToken } from "../../components/ultiti";
import { postBooking } from "../../api/booking_API";
import { getHoteldetail } from "../../api/hotel_API";
import { getRoomdetailinHotel } from "../../api/room_in_hotel_API";
import { Alert } from "@material-tailwind/react";
import CardLeftBooking from "../../components/Customer/Card_Left_Booking";
import CardRightBooking from "../../components/Customer/Card_Right_Booking";

function Booking() {
	const { hotel_id, room_id } = useParams();
	const token = useAccessToken();
	const decodedToken = jwt_decode(token);
	const userId = decodedToken.user_id;
	const navigate = useNavigate();
	const [rooms, setRooms] = useState([]);
	const [hotels, setHotels] = useState([]);
	const [booking, setBooking] = useState({
		user: userId,
		hotel: hotel_id,
		room: room_id,
		name: "",
		email: "",
		phonenumber: "",
		address: "",
		checkin: "",
		checkout: "",
		total: 0,
		datebooking: new Date().toISOString().split("T")[0],
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
				hotel: booking.hotel,
				room: booking.room,
				name: booking.name,
				email: booking.email,
				phonenumber: booking.phonenumber,
				address: booking.address,
				checkin: formatDate(booking.checkin),
				checkout: formatDate(booking.checkout),
				total: totalPrice,
				datebooking: booking.datebooking,
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
			// Hiển thị thông báo lỗi hoặc xử lý lỗi khác
		}
	};

	useEffect(() => {
		// Fetch hotel details
		const fetchData = async () => {
			try {
				const [hotelData, roomData] = await Promise.all([
					getHoteldetail(hotel_id, token),
					getRoomdetailinHotel(hotel_id, room_id, token),
				]);

				setHotels(hotelData);
				setRooms(roomData);
				console.log(roomData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [hotel_id, room_id, token]);

	return (
		<>
			<Navbars />
			{CreateSuccess && (
				<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
					Create successfuly !!
				</Alert>
			)}
			<div className="grid grid-cols-6">
				<div className="grid gap-4 relative col-span-2  ">
					<CardLeftBooking
						booking={booking}
						setBooking={setBooking}
						rooms={rooms}
						hotels={hotels}
						calculateNumberOfDays={calculateNumberOfDays}
					/>
				</div>
				<div className="grid gap-4 relative col-span-4 ml-3 mb-3 mt-4">
					<CardRightBooking
						booking={booking}
						rooms={rooms}
						handleChange={handleChange}
						handleCreate={handleCreate}
					/>
				</div>
			</div>
		</>
	);
}
export default Booking;
