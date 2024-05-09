import { useState, useEffect } from "react";
import {
	Card,
	Input,
	Button,
	Typography,
	Textarea,
	Select,
	Option,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";

import UploadImageRooms from "./Upload_Image_Room";
import {
	getAmenities,
	getImageRoom,
	postAmenities,
	postImageRoom,
} from "../../api/room_in_acc_API";
import useAccessToken from "../ultiti";
import UploadAmenities from "./List_Amenities";

function EditRoomForm({
	room,
	handleChange,
	handleUpdate,
	selectedAccommodations,
}) {
	const [amenity, setAmenity] = useState("");
	const onChange = ({ target }) => setAmenity(target.value);
	const token = useAccessToken();
	const [images, setImages] = useState([]);
	const [amenities, setAmenities] = useState([]);
	const id = useParams();
	const [selectedImage, setSelectedImage] = useState(null);

	const handleUploadImage = async () => {
		try {
			const formData = new FormData();

			formData.append("rooms", room.room_id);
			formData.append("image", selectedImage);

			const response = await postImageRoom(token, formData, id);
			console.log("Create successful:", response.data);
			setTimeout(() => {
				alert("Thêm ảnh thành công!");
				updateImageList();
				setSelectedImage(null);
			}, 1000);
		} catch (error) {
			console.error("Create failed:", error);
		}
	};

	const handleChangeImage = (e) => {
		const image = e.target.files[0];
		setSelectedImage(image);
	};
	const handleSelectChange = (value) => {
		handleChange({ target: { name: "roomtype", value } });
	};
	const updateImageList = async () => {
		try {
			const userData = await getImageRoom(token);
			setImages(userData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const updateAmenityList = async () => {
		try {
			const amenitiesData = await getAmenities(token);
			setAmenities(amenitiesData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleUploadAmenities = async () => {
		try {
			const formData = new FormData();

			formData.append("rooms", room.room_id);
			formData.append("name", amenity);

			const response = await postAmenities(token, formData, id);
			console.log("Create successful:", response.data);
			setTimeout(() => {
				alert("Thêm tiện nghi thành công!");
				updateAmenityList();
				setSelectedImage(null);
			}, 1000);
		} catch (error) {
			console.error("Create failed:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [amenitiesData, userData] = await Promise.all([
					getAmenities(token),
					getImageRoom(token),
				]);
				setAmenities(amenitiesData);
				setImages(userData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);
	return (
		<>
			<div className="mx-auto mt-2">
				<Typography variant="h4" color="red">
					Cập nhật thông tin phòng
				</Typography>
			</div>
			<div className=" max-w-full px-3 rounded-lg mt-2 overflow-auto">
				<Card color="transparent" shadow={false}>
					<form>
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
										name="hotel"
										value={
											selectedAccommodations
												? selectedAccommodations.accname
												: ""
										}
										placeholder="Nhập tên chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										readOnly
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
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
										placeholder="Nhập mô tả về phòng..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-md xl:text-md"
									/>
								</div>
								<UploadImageRooms
									room={room}
									handleChange={handleChange}
									handleChangeImage={handleChangeImage}
									handleUploadImage={handleUploadImage}
									images={images}
									updateImageList={updateImageList}
								/>
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
									<div className="flex justify-center border-b border-gray-200 text-gray-800 font-medium">
										<div className="relative flex w-full items-center">
											<Input
												type="text"
												name="name"
												placeholder="Nhập tiện nghi"
												className="pr-20"
												onChange={onChange}
											/>
											<Button
												size="sm"
												color={amenity ? "gray" : "blue-gray"}
												disabled={!amenity}
												className="!absolute right-1 top-1 rounded"
												onClick={handleUploadAmenities}
											>
												Thêm
											</Button>
										</div>
									</div>
									<UploadAmenities
										room={room}
										amenities={amenities}
										updateAmenityList={updateAmenityList}
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
								<div className="flex">
									<div className="w-1/2 mr-2">
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
									<div className="w-1/2">
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
											placeholder="Nhập sức chứa phòng..."
											className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										/>
									</div>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Loại phòng
									</Typography>

									<Select
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
									</Select>
								</div>
							</div>
						</div>

						<Button
							size="lg"
							onClick={handleUpdate}
							className="mx-auto w-2/4 bg-red-600 uppercase"
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
export default EditRoomForm;
