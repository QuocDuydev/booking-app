import { CheckBadgeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Carousel,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { getRoomType } from "../../api/acc-type_API";

export default function RoomDetail({ room }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	const [roomtype, setRoomtype] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const reponse = await getRoomType();
				const selectedRoomtype = reponse.find(
					(item) => item.roomtype_id === room.roomtype,
				);
				if (selectedRoomtype) {
					setRoomtype(selectedRoomtype.name);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [room.roomtype]);

	return (
		<div className="mb-4 mx-auto flex justify-center">
			<Button onClick={handleOpen} color="blue" variant="gradient" size="sm">
				Xem chi tiết phòng
			</Button>
			<Dialog open={open} handler={handleOpen} size="lg">
				<form>
					<DialogHeader className=" -mb-7">{room.roomname}</DialogHeader>
					<DialogBody>
						<div className="flex mx-auto ">
							<div className="mb-1 w-1/2 p-2">
								<Carousel className="rounded-xl">
									{room.images.map((image, index) => (
										// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
										<img
											src={image.image}
											alt={`image-${index}`}
											className="h-full object-cover"
										/>
									))}
								</Carousel>
							</div>

							<div className=" mx-auto w-1/2">
								<Typography
									variant="h5"
									className=" text-center mb-3"
									color="black"
								>
									Thông tin phòng
								</Typography>
								<div className="overflow-auto  h-[85px] sm:h-[180px] lg:h-[250px] ">
									<div className="w-full px-3">
										<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
											<div className=" flex w-full justify-center">
												<UserGroupIcon className="h-5 w-5 mr-2" />
												<Typography className="text-justify">
													{room.roomoccupancy} khách
												</Typography>
											</div>
											<div className=" flex w-full justify-center">
												<Typography variant="h6" className="mr-2">
													Loại:
												</Typography>
												<Typography className="text-justify">
													{roomtype}
												</Typography>
											</div>
										</div>
										<div className=" mb-3">
											<Typography
												variant="h6"
												className=" text-left mb-2 mt-2"
												color="black"
											>
												Tiện nghi
											</Typography>
											<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 md:grid-cols-2 ">
												{room?.amenities.map((items) => (
													<li className="flex justify-left " key={items.id}>
														<CheckBadgeIcon className="h-5 w-5 text-green-400 mr-2" />
														<span className="h-auto">{items.name}</span>
													</li>
												))}
											</div>
										</div>
									</div>
								</div>
								<Typography className="text-right text-lg font-bold text-red-500 2xl:text-2xl lg:text-2xl md:text-xl sm:text-xl">
									{room.roomprice.toLocaleString()} VNĐ
								</Typography>
							</div>
						</div>
					</DialogBody>
					<DialogFooter className="-mt-4">
						<Button
							variant="gradient"
							color="red"
							size="sm"
							onClick={handleOpen}
							className="mr-1 bg-slate-300"
						>
							<span>Thêm lựa chọn phòng</span>
						</Button>
					</DialogFooter>
				</form>
			</Dialog>
		</div>
	);
}
