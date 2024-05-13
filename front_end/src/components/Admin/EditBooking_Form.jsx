import React from "react";
import {
	Card,
	Input,
	Button,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";

export default function EditBookingForm({
	booking,
	handleUpdate,
	handleChange,
	selectedAcc,
	selectedRoom,
}) {
	return (
		<>
			<div className="mx-auto mt-3">
				<Typography variant="h4" color="red">
					Cập nhật đơn đặt phòng
				</Typography>
			</div>
			<div className=" max-w-full px-3 rounded-lg mt-2 overflow-auto">
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
											Địa chỉ:
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
											Vị trí:
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
											Giá phòng:
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
											color="red"
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
											Ngày nhận phòng:
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
											Ngày trả phòng:
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
						<div className="w-1/3 p-4 mx-auto">
							<div className="flex justify-center">
								<Typography
									variant="h6"
									color="blue-gray"
									className="mr-4 py-2 text-sm md:text-md lg:text-lg xl:text-lg flex w-1/2 "
								>
									Trạng thái
								</Typography>
								<Select
									size="lg"
									name="status"
									value={booking.status}
									onChange={(value) => handleChange(value, "status")}
									className="text-sm md:text-md lg:text-lg xl:text-lg"
								>
									<Option value="processing">Proccessing</Option>
									<Option value="active">Active</Option>
									<Option value="hide">Hide</Option>
								</Select>
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
										Họ và Tên người dùng
									</Typography>

									<Input
										type="text"
										multiple
										size="lg"
										name="name"
										value={booking.name}
										onChange={handleChange}
										placeholder="Nhập họ và tên của bạn..."
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
										Địa chỉ Email
									</Typography>
									<Input
										type="text"
										multiple
										size="lg"
										name="email"
										value={booking.email}
										onChange={handleChange}
										placeholder="Nhập địa chỉ email..."
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
										Số điện thoại
									</Typography>

									<Input
										type="number"
										multiple
										size="lg"
										name="phonenumber"
										value={booking.phonenumber}
										onChange={handleChange}
										placeholder="Nhập số điện thoại..."
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
										Địa chỉ
									</Typography>

									<Input
										type="text"
										multiple
										size="lg"
										name="address"
										value={booking.address}
										onChange={handleChange}
										placeholder="Nhập địa chỉ..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										// readOnly
									/>
								</div>
							</div>
						</div>
						<Button
							size="lg"
							onClick={handleUpdate}
							className="mx-auto w-2/4 bg-red-600 uppercase mt-2"
							fullWidth
						>
							Cập nhật ngay!
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
}
