import { useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Select,
	Typography,
} from "@material-tailwind/react";
import useAccessToken from "../ultiti";
import { deleteAmenities } from "../../api/room_in_acc_API";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function UploadAmenities({
	amenities,
	room,
	updateAmenityList,
}) {
	const token = useAccessToken();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	const handleDeleteAmenities = async (Amenityid) => {
		const isConfirmed = window.confirm(
			"Bạn có chắc chắn muốn xóa tiện nghi này?",
		);
		if (isConfirmed) {
			try {
				await deleteAmenities(token, Amenityid);
				updateAmenityList();
			} catch (error) {
				console.error("Delete image failed:", error);
			}
		}
	};

	return (
		<div>
			<div className="mt-4 mx-auto flex justify-center">
				<Button
					onClick={handleOpen}
					variant="gradient"
					color="blue"
					className="sm"
				>
					Danh sách tiện nghi
				</Button>
				<Dialog
					open={open}
					handler={handleOpen}
					className=" w-auto h-auto my-auto mx-auto"
				>
					<form>
						<DialogHeader className=" -mb-4 flex justify-center">
							Danh sách tiện nghi
						</DialogHeader>

						<DialogBody>
							<div className="flex flex-wrap mx-auto">
								{amenities
									.filter((item) => item.rooms === room.room_id)
									.map((item, index) => (
										<div
											key={`${item.rooms}-${index}`}
											className="ml-2 p-1 relative mt-3 flex justify-center "
											style={{
												minWidth: "30%",
												maxWidth: "30%",
												flexBasis: "30%",
											}}
										>
											<span>
												<XMarkIcon
													onClick={() => handleDeleteAmenities(item.id)}
													className="h-3 w-3 text-red-600 font-bold absolute top-1 right-1 cursor-pointer bg-white -mt-2"
												/>
											</span>
											<Typography>{item.name}</Typography>
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
						</DialogFooter>
					</form>
				</Dialog>
			</div>
		</div>
	);
}
