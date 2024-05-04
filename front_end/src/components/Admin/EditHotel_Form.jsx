import React, { useState, useEffect } from "react";
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
import useAccessToken from "../ultiti";
import { getImage, postImage } from "../../api/acc_API";
import { getAccType } from "../../api/acc-type_API";
import UploadImageAccommodations from "./Upload_Image_Accommodation";

function EditHotelForm({ accommodation, handleChange, handleUpdate }) {
	const token = useAccessToken();
	const [images, setImages] = useState([]);
	const id = useParams();
	const [selectedImage, setSelectedImage] = useState(null);
	const handleUploadImage = async () => {
		// Call your upload image function here
		try {
			const formData = new FormData();

			formData.append("accommodations", accommodation.acc_id);
			formData.append("image", selectedImage);

			const response = await postImage(token, formData, id);
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
	const [acctypes, setAcctype] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const AccTypeData = await getAccType();
				console.log(AccTypeData);
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

	const handleChangeImage = (e) => {
		const image = e.target.files[0];
		setSelectedImage(image);
	};

	const updateImageList = async () => {
		try {
			const userData = await getImage(token);
			setImages(userData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getImage(token);

				setImages(userData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);
	return (
		<>
			<div className="mx-auto mt-4">
				<Typography variant="h4" color="red">
					Cập nhật thông tin chỗ ở
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
										className=" mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Tên chỗ ở
									</Typography>
									<Input
										type="text"
										size="lg"
										name="accname"
										value={accommodation.accname}
										onChange={handleChange}
										placeholder="Tên chỗ ở..."
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
										placeholder="Nhập mô tả về chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-md xl:text-md"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
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
										placeholder="Enter total rooms..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-700 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<UploadImageAccommodations
									accommodation={accommodation}
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
										className="mb-2  text-sm md:text-md lg:text-lg xl:text-lg"
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
										placeholder="Nhập xếp hạng chỗ ở..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
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
						</div>
						<Button
							onClick={handleUpdate}
							className="mx-auto w-2/4 bg-red-600 uppercase text-sm"
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
export default EditHotelForm;
