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
	selectedHotel,
	selectedRoom,
}) {
	return (
		<>
			<div className="mx-auto mt-3">
				<Typography variant="h4" color="red">
					Edit the Bookings
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
											Hotel Name:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedHotel ? selectedHotel.hotelname : ""}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Hotels Address:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedHotel ? selectedHotel.roommap : ""}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Location:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedHotel ? selectedHotel.location : ""}
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
											Room Name:
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
											Number of guests:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className=" ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedRoom ? selectedRoom.roomoccupancy : ""} - person
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className=" text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Room Price:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className=" ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{selectedRoom ? selectedRoom.roomprice : ""} $
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
											Total Amount:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{booking.total} $
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Check in:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{booking.checkin}
										</Typography>
									</div>
									<div className="flex">
										<Typography
											variant="h3"
											color="blue-gray"
											className="mb-2 text-blue-700 text-sm md:text-md lg:text-lg xl:text-xl"
										>
											Check out:
										</Typography>
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2  ml-2 text-sm md:text-md lg:text-lg xl:text-xl "
										>
											{booking.checkout}
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
									className="mr-4 py-2 text-sm md:text-md lg:text-lg xl:text-lg "
								>
									Status
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
										type="number"
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
							className="mx-auto w-2/4 bg-red-600 uppercase mt-2"
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
