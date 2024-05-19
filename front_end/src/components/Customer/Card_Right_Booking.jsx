import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function CardRightBooking({
	booking,
	rooms,
	handleChange,
	handleCreate,
	roomtype,
}) {
	return (
		<div className=" max-w-full px-3 rounded-lg ">
			<div className="mb-1 w-full h-full p-4">
				{rooms.map((item) => {
					let selectedRoomtype = "";
					// biome-ignore lint/complexity/noForEach: <explanation>
					roomtype.forEach((roomType) => {
						if (roomType.roomtype_id === item.roomtype) {
							selectedRoomtype = roomType.name;
						}
					});
					return (
						<div
							className=" border border-solid border-black  px-3 py-3 rounded-md"
							key={item.room_id}
						>
							<Typography
								variant="h5"
								color="blue-gray"
								className="mb-3 text-sm md:text-md lg:text-lg xl:text-lg"
							>
								Thông tin phòng
							</Typography>

							<div className="flex">
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
								>
									Tên phòng:
								</Typography>
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
								>
									{item.roomname}
								</Typography>
							</div>

							<div className=" flex ">
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
								>
									Mô tả:
								</Typography>
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2  ml-2 font-normal text-justify text-sm md:text-md lg:text-lg xl:text-lg"
								>
									{typeof item.descriptions === "string"
										? item.descriptions.split(" ").slice(0, 25).join(" ")
										: ""}
								</Typography>
							</div>
							<div className="border-b mb-2" />
							<div className=" flex">
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
								>
									Loại phòng:
								</Typography>
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl"
								>
									{selectedRoomtype}
								</Typography>
							</div>

							<Typography
								variant="h5"
								color="blue-gray"
								className=" mt-2 text-red-600 text-sm md:text-md lg:text-lg xl:text-xl"
							>
								Giá phòng: {item.roomprice.toLocaleString()} VNĐ
							</Typography>
						</div>
					);
				})}
				<Card color="transparent" shadow={false}>
					<form className="border border-solid border-black mt-3 mb-2 rounded-md">
						<div className="lg:flex md:flex sm:flex mx-auto  ">
							<div className="mb-1 p-4 w-full">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Họ và tên
									</Typography>

									<Input
										type="text"
										size="lg"
										name="name"
										value={booking?.name || ""}
										onChange={handleChange}
										placeholder="Enter  username..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
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
										type="email"
										multiple
										size="lg"
										name="email"
										value={booking?.email || ""}
										onChange={handleChange}
										placeholder="Enter email..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-700 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
							</div>
							<div className="mb-1 w-full p-4 ">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Số điện thoại
									</Typography>

									<Input
										type="tel"
										multiple
										size="lg"
										name="phonenumber"
										value={booking?.phonenumber || ""}
										onChange={handleChange}
										placeholder="Enter Phone number..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
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
										value={booking?.address || ""}
										onChange={handleChange}
										placeholder="Nhập địa chỉ của bạn..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
							</div>
						</div>
						<Button
							onClick={handleCreate}
							size="md"
							className="mx-auto w-2/4 bg-red-600 uppercase mb-3"
							fullWidth
						>
							Đặt phòng ngay
						</Button>
					</form>
				</Card>
			</div>
		</div>
	);
}
