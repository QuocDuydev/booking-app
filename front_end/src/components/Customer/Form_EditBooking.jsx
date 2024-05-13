import React from "react";
import {
	Card,
	Input,
	Button,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";

function FormEditBooking({
	selectedAcc,
	selectedRoom,
	booking,
	handleUpdate,
	handleChange,
}) {
	return (
		<>
			<div className="mx-auto flex justify-center mb-3">
				<Typography variant="h4" color="red">
					Cập nhật thông tin đặt phòng
				</Typography>
			</div>
			<div className=" max-w-full px-3 rounded-lg mt-2">
				<Card color="transparent" shadow={false}>
					<form>
						<div className="mx-auto p-4 bg-blue-100 rounded-lg">
							<div className=" grid grid-cols-6 ">
								<div className="grid gap-4 relative col-span-2 px-4">
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Tên chỗ ở:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedAcc ? selectedAcc.accname : ""}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Địa chỉ chỗ ở:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedAcc ? selectedAcc.roommap : ""}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Tỉnh, thành phố:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedAcc ? selectedAcc.location : ""}
										</Typography>
									</div>
								</div>

								<div className=" grid gap-4 relative col-span-2 px-4">
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Tên phòng:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className=" ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedRoom ? selectedRoom.roomname : ""}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Loại phòng:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className=" ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedRoom ? selectedRoom.roomtype : ""}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Giá phòng/đêm:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className=" ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{(selectedRoom
												? selectedRoom.roomprice
												: ""
											).toLocaleString()}{" "}
											VNĐ
										</Typography>
									</div>
								</div>

								<div className=" grid gap-4 relative col-span-2 px-4">
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Tổng tiền:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{booking.total.toLocaleString()} VNĐ
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Ngày nhận:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{new Date(booking.checkin).getDate()}/
											{new Date(booking.checkin).getMonth() + 1}/
											{new Date(booking.checkin).getFullYear()}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Ngày trả:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{new Date(booking.checkout).getDate()}/
											{new Date(booking.checkout).getMonth() + 1}/
											{new Date(booking.checkout).getFullYear()}
										</Typography>
									</div>
								</div>
							</div>
						</div>

						<div className="flex mx-auto">
							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Full Name
									</Typography>

									<Input
										type="text"
										multiple
										size="lg"
										name="name"
										value={booking.name}
										onChange={handleChange}
										placeholder="Enter Descriptions about Rooms..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										// readOnly
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Email
									</Typography>
									<Input
										type="text"
										multiple
										size="lg"
										name="email"
										value={booking.email}
										onChange={handleChange}
										placeholder="Enter price rooms..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-700 text-sm md:text-md lg:text-lg xl:text-lg"
										// readOnly
									/>
								</div>
							</div>

							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Phone Number
									</Typography>

									<Input
										type="tel"
										multiple
										size="lg"
										name="phonenumber"
										value={booking.phonenumber}
										onChange={handleChange}
										placeholder="Enter Numbers rooms..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										// readOnly
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Address
									</Typography>

									<Input
										type="text"
										multiple
										size="lg"
										name="address"
										value={booking.address}
										onChange={handleChange}
										placeholder="Enter Numbers rooms..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										// readOnly
									/>
								</div>
							</div>
						</div>
						<Button
							size="lg"
							onClick={handleUpdate}
							className="mx-auto w-1/4 bg-red-600 uppercase mt-2"
							fullWidth
						>
							Update nows
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
}
export default FormEditBooking;
