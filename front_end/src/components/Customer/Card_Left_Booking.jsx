import React from "react";
import DatePicker from "react-datepicker";
import { Typography, Rating } from "@material-tailwind/react";
import TotalPrice from "./Total_Price";
import { MapPinIcon } from "@heroicons/react/24/outline";

function CardLeftBooking({
	booking,
	setBooking,
	rooms,
	accs,
	calculateNumberOfDays,
}) {
	return (
		<div className=" max-w-full rounded-lg ">
			<div className="mb-1 w-full h-full p-4">
				<div className=" border border-solid border-black px-3 py-3 rounded-md">
					<Typography
						variant="h5"
						color="blue-gray"
						className="mb-3 text-sm md:text-md lg:text-lg xl:text-lg"
					>
						Thông tin chỗ ở
					</Typography>
					<div className="flex">
						{accs.accname && (
							<Typography
								variant="h3"
								color="blue-gray"
								className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
							>
								{accs.accname}
							</Typography>
						)}
						{accs.rating && (
							<Rating
								value={accs.rating}
								unratedColor="red"
								ratedColor="red"
								className="ml-5 -mt-3 text-sm md:text-md lg:text-lg xl:text-xl"
								readonly
							/>
						)}
					</div>

					<div className=" flex mt-1 text-sm md:text-md lg:text-lg xl:text-xl">
						<MapPinIcon className="h-6 w-6" />
						{accs.roommap && (
							<Typography
								variant="h6"
								color="blue-gray"
								className="ml-1 text-sm md:text-md lg:text-lg xl:text-xl"
							>
								{accs.roommap}
							</Typography>
						)}
					</div>
				</div>

				<div className=" border border-solid border-black px-3 py-3 rounded-md mt-3">
					<Typography
						variant="h5"
						color="blue-gray"
						className="mb-3 text-sm md:text-md lg:text-lg xl:text-lg"
					>
						Thông tin đặt phòng
					</Typography>
					<div className=" ">
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
						>
							Ngày nhận:
						</Typography>
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2  ml-2 text-center text-sm md:text-md lg:text-lg xl:text-xl"
						>
							<DatePicker
								className="text-center"
								name="checkin"
								selected={booking?.checkin ? new Date(booking.checkin) : null}
								minDate={new Date()} // Chỉ cho phép chọn từ ngày hiện tại trở đi
								onChange={(date) =>
									setBooking((prevBooking) => ({
										...prevBooking,
										checkin: date,
									}))
								}
								dateFormat="dd/MM/yyyy"
								placeholderText="Chọn ngày nhận phòng"
							/>
						</Typography>
					</div>
					<div className=" ">
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
						>
							Ngày trả:
						</Typography>
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2 ml-2 text-center text-sm md:text-md lg:text-lg xl:text-xl"
						>
							<DatePicker
								name="checkout"
								className="text-center"
								selected={booking?.checkout ? new Date(booking.checkout) : null}
								onChange={(date) =>
									setBooking((prevBooking) => ({
										...prevBooking,
										checkout: date,
									}))
								}
								dateFormat="dd/MM/yyyy"
								placeholderText="Chọn ngày trả phòng"
								excludeDates={[booking?.checkin]}
								minDate={booking?.checkin ? new Date(booking.checkin) : null} // Set minDate là ngày check-in
							/>
						</Typography>
					</div>
					<div className="border-b mb-2" />
					<div className=" flex">
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
						>
							Tổng số ngày:
						</Typography>
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl"
						>
							{calculateNumberOfDays()} ngày
						</Typography>
					</div>
					{rooms.map((item) => (
						<Typography
							variant="h5"
							color="blue-gray"
							className=" text-red-600 text-sm md:text-md lg:text-lg xl:text-xl"
							key={item.room_id}
						>
							Giá phòng: {item.roomprice.toLocaleString()} VNĐ
						</Typography>
					))}
				</div>

				<div className="flex mt-3 mx-auto justify-center bg-yellow-300 rounded-lg">
					<Typography
						variant="h4"
						color="blue-gray"
						className="py-2 uppercase text-sm md:text-md lg:text-lg xl:text-xl"
					>
						Tổng tiền
					</Typography>
					<div className="py-2 bg-slate-300 text-center ">
						<Typography
							variant="h4"
							name="total"
							color="blue-gray"
							className="uppercase ml-8 text-sm md:text-md lg:text-lg xl:text-xl"
						>
							<TotalPrice
								checkin={booking?.checkin}
								checkout={booking?.checkout}
								rooms={rooms}
							/>
						</Typography>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CardLeftBooking;
