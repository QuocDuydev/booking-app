import {
	Card,
	Input,
	Button,
	Typography,
	Textarea,
	Select,
	Option,
} from "@material-tailwind/react";

import { getAccType } from "../../api/acc-type_API";
import { useState, useEffect } from "react";

function CreateHotelForm({
	accommodation,
	handleChange,
	handleCreate,
}) {
	const [acctype, setAcctype] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const AccTypeData = await getAccType();

				setAcctype(AccTypeData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	const handleSelectChange = (value) => {
		handleChange({ target: { name: "acctype", value } });
	};
	return (
		<>
			<div className=" mx-auto mt-2 uppercase">
				<Typography variant="h4" color="red">
					Thêm chỗ ở
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
										Tên chỗ ở
									</Typography>
									<Input
										type="text"
										size="lg"
										name="accname"
										value={accommodation.accname}
										onChange={handleChange}
										placeholder="Nhập tên chỗ ở..."
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
										value={accommodation.descriptions}
										onChange={handleChange}
										placeholder="Nhập mô tả chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-md xl:text-md"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Loại chỗ ở
									</Typography>

									{/* <Select
										options={acctype.map((amenity) => ({
											value: amenity.acctype_id,
											label: amenity.name,
										}))}
										isMulti
										name="acctype"
										onChange={handleAmenitiesChange}
									/> */}
									<Select
										name="acctype"
										size="lg"
										value={String(accommodation?.acctype) || ""}
										onChange={handleSelectChange}
										className="text-sm md:text-md lg:text-lg xl:text-lg"
									>
										<Option value="1">Khách sạn</Option>
										<Option value="2">HomeStay</Option>
										<Option value="3">Nhà trọ</Option>
									</Select>
								</div>
							</div>
							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Vị trí
									</Typography>
									<Input
										type="text"
										multiple
										size="lg"
										name="location"
										value={accommodation.location}
										onChange={handleChange}
										placeholder="Nhập vị trí chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Địa chỉ chỗ ở
									</Typography>
									<Input
										type="text"
										multiple
										size="lg"
										name="roommap"
										value={accommodation.roommap}
										onChange={handleChange}
										placeholder="Nhập địa chỉ chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>

								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Xếp hạng
									</Typography>
									<Input
										type="number"
										multiple
										size="lg"
										name="rating"
										value={accommodation.rating}
										onChange={handleChange}
										placeholder="Xếp hạng chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Tổng số phòng
									</Typography>
									<Input
										type="number"
										multiple
										size="lg"
										name="totalroom"
										value={accommodation.totalroom}
										onChange={handleChange}
										placeholder="Nhập tổng số phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-700 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
							</div>
						</div>
						<Button
							size="lg"
							onClick={handleCreate}
							className="mx-auto w-2/4 bg-red-600 uppercase mt-2"
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
export default CreateHotelForm;
