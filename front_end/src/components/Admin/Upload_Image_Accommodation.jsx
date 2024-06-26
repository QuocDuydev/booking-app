import { useState } from "react";
import {
	Input,
	Button,
	Typography,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Select,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { deleteImageAcc } from "../../api/acc_API";
import useAccessToken from "../ultiti";

export default function UploadImageAccommodations({
	accommodation,
	handleChange,
	handleChangeImage,
	handleUploadImage,
	images,
	updateImageList,
}) {
	const token = useAccessToken();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	const handleDeleteImage = async (imageId) => {
		const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa ảnh này?");
		if (isConfirmed) {
			try {
				await deleteImageAcc(token, imageId);
				updateImageList();
			} catch (error) {
				console.error("Delete image failed:", error);
			}
		}
	};

	return (
		<div>
			<div className="mt-4 mx-auto flex justify-center">
				<Button onClick={handleOpen} variant="gradient" color="blue">
					Tải ảnh tại đây !
				</Button>
				<Dialog
					open={open}
					handler={handleOpen}
					className=" w-[60%] h-auto my-auto mx-auto"
				>
					<form>
						<DialogHeader className=" -mb-7" />

						<DialogBody>
							<div className="flex mx-auto ">
								<div className="mb-1 w-full p-4" key={accommodation.acc_id}>
									<div>
										<Typography variant="h6" color="blue-gray" className="mb-2">
											Tên chỗ ở
										</Typography>
										<Input
											type="text"
											size="lg"
											name="accommodations"
											value={accommodation.accname}
											readOnly
											onChange={handleChange}
											placeholder="Enter name hotels..."
											className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
										/>
									</div>
									<div>
										<Typography
											variant="h6"
											color="blue-gray"
											className="mb-2 mt-4"
										>
											Ảnh
										</Typography>

										<Input
											onChange={handleChangeImage}
											type="file"
											size="lg"
											name="image"
											className=" !border-t-blue-gray-200 focus:!border-t-gray-900 disabled:cursor-not-allowed"
										/>
									</div>
								</div>
							</div>

							<div className="flex m-4">
								{images
									.filter(
										(item) => item.accommodations === accommodation.acc_id,
									)
									.map((item) => (
										<div
											key={item.accommodations}
											className="ml-2 p-1 relative"
										>
											<XMarkIcon
												onClick={() => handleDeleteImage(item.id)}
												className="h-3 w-3 text-red-600 font-bold absolute top-1 right-1 cursor-pointer bg-white"
											/>
											<img
												src={item.image}
												alt=""
												className="w-[80px] h-[45px]"
											/>
										</div>
									))}
							</div>
						</DialogBody>
						<DialogFooter className="-mt-4 flex mx-auto items-end">
							<Button
								variant="text"
								color="red"
								onClick={handleOpen}
								className="mr-1 bg-slate-300"
							>
								<span>Đóng</span>
							</Button>
							<Button
								variant="gradient"
								color="green"
								onClick={handleUploadImage}
								className=" bg-red-600"
							>
								<span>Tải ảnh lên</span>
							</Button>
						</DialogFooter>
					</form>
				</Dialog>
			</div>
		</div>
	);
}
