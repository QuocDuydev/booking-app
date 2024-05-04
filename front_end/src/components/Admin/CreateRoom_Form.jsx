import {
	Card,
	Input,
	Button,
	Typography,
	Textarea,
	Select as MaterialSelect,
	Option,
} from "@material-tailwind/react";

import Select from "react-select";
import { useState, useEffect } from "react";
import { getAmenities } from "../../api/acc-type_API";

function CreateRoomForm({
	room,
	handleChange,
	handleSelectChange,
	handleCreate,
	handleAmenitiesChange,
}) {
	const [amenity, setAmenities] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const AccTypeData = await getAmenities();

				setAmenities(AccTypeData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	return (
		<>
			<div className="mx-auto mt-2">
				<Typography variant="h4" color="red">
					Thêm phòng
				</Typography>
			</div>
			<div className=" max-w-full px-3 rounded-lg mt-2 overflow-auto">
				<Card color="transparent" shadow={false}>
					<form className=" ">
						<div className="flex mx-auto ">
							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Tên phòng
									</Typography>
									<Input
										type="text"
										size="lg"
										name="roomname"
										value={room.roomname}
										onChange={handleChange}
										placeholder="Nhập tên phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>

								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Mô tả
									</Typography>
									<Textarea
										type="textarea"
										multiple
										size="lg"
										name="descriptions"
										value={room.descriptions}
										onChange={handleChange}
										placeholder="Nhập mô tả phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-md xl:text-md"
									/>
								</div>
								
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Loại phòng
									</Typography>
									<MaterialSelect
										name="roomtype"
										size="lg"
										value={String(room?.roomtype) || ""}
										onChange={handleSelectChange}
										className="text-sm md:text-md lg:text-lg xl:text-lg"
									>
										<Option value="1">Phòng đơn</Option>
										<Option value="2">Phòng đôi</Option>
										<Option value="3">Phòng gia đình</Option>
										<Option value="4">Phòng ghép</Option>
									</MaterialSelect>
								</div>
							</div>
							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Tiện nghi
									</Typography>
									<Select
										options={amenity.map((amenity) => ({
											value: amenity.amenities_id,
											label: amenity.name,
										}))}
										isMulti
										name="amenities"
										onChange={handleAmenitiesChange}
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Giá phòng
									</Typography>
									<Input
										type="number"
										multiple
										size="lg"
										name="roomprice"
										value={room.roomprice}
										onChange={handleChange}
										placeholder="Nhập giá phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Số phòng
									</Typography>
									<Input
										type="number"
										multiple
										size="lg"
										name="roomnumber"
										value={room.roomnumber}
										onChange={handleChange}
										placeholder="Nhập số phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Sức chứa người/phòng
									</Typography>
									<Input
										type="number"
										multiple
										size="lg"
										name="roomoccupancy"
										value={room.roomoccupancy}
										onChange={handleChange}
										placeholder="Thêm sức chứa người/phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
							</div>
						</div>
						<Button
							size="lg"
							onClick={handleCreate}
							className="mx-auto w-2/4 bg-red-600 uppercase"
							fullWidth
						>
							Thêm ngay!
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
}
export default CreateRoomForm;
