import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import { getRoom_In_Accommodation } from "../../api/room_in_acc_API";
import { getlistBooking } from "../../api/booking_API";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import ButtonSearch from "./Button_Search";
import FiltersRoom from "./Filter_Room";
import { CheckBadgeIcon, ServerIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { getRoomType } from "../../api/acc-type_API";
import RoomDetail from "./Room_Detail";

export default function RoominAccommodation() {
	const { acc_id } = useParams();
	const token = useAccessToken();
	const [rooms, setRooms] = useState([]);
	const [bookedRoomIds, setBookedRoomIds] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [roomtype, setRoomtypes] = useState([]);

	useEffect(() => {
		setIsLoggedIn(!!token);
		const fetchData = async () => {
			try {
				// Fetch hotel and booking data
				const [roomData, bookingData, roomtypeData] = await Promise.all([
					getRoom_In_Accommodation(acc_id, token),
					getlistBooking(token),
					getRoomType(),
				]);
				setRoomtypes(roomtypeData);
				// Extract booked room ids from booking data
				const bookedRoomIds = bookingData.map((booking) => booking.room);
				setBookedRoomIds(bookedRoomIds);

				// Filter available rooms
				const availableRooms = roomData.filter((room) => {
					// Kiểm tra xem phòng có trong danh sách phòng đã đặt không
					const isBooked = bookedRoomIds.includes(room.room_id);
					// Kiểm tra trạng thái của phòng
					const isHidden = room.status === "hide";

					return !isBooked || isHidden;
				});
				availableRooms.sort((a, b) => a.roomprice - b.roomprice);
				setRooms(availableRooms);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [acc_id, token]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRoomType, setSelectedRoomType] = useState("");
	const [selectedPriceMin, setSelectedPriceMin] = useState("");
	const [selectedPriceMax, setSelectedPriceMax] = useState("");

	function removeAccents(str) {
		// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	const isPriceInRange = (Prices, min, max) => {
		if (min === "" && max === "") {
			return true;
		}

		const minRange = Number.parseInt(min) || 0;
		const maxRange = Number.parseInt(max) || Number.POSITIVE_INFINITY;

		return Prices >= minRange && Prices <= maxRange;
	};
	const handleRoomTypeFilter = (room_type) => {
		setSelectedRoomType((prevRoomtype) => {
			// Kiểm tra xem vị trí đã được chọn chưa
			const index = prevRoomtype.indexOf(room_type);

			// Nếu vị trí đã được chọn, loại bỏ nó khỏi danh sách
			if (index !== -1) {
				const updatedRoomtype = [...prevRoomtype];
				updatedRoomtype.splice(index, 1);
				return updatedRoomtype;
			}
			// Nếu vị trí chưa được chọn, thêm nó vào danh sách
			return [...prevRoomtype, room_type];
		});
	};

	const handlePriceFilter = (Prices) => {
		const [min, max] = Prices.split("-");

		// Convert min and max to integers
		const minRange = Number.parseInt(min) || 0;
		const maxRange = Number.parseInt(max) || Number.POSITIVE_INFINITY;

		if (
			minRange === Number.parseInt(selectedPriceMin) &&
			maxRange === Number.parseInt(selectedPriceMax)
		) {
			// If the selected range is being toggled, reset to default values
			setSelectedPriceMin("");
			setSelectedPriceMax("");
		} else {
			// Set the selected range values
			setSelectedPriceMin(minRange.toString());
			setSelectedPriceMax(maxRange.toString());
		}
	};
	const filteredRooms = rooms.filter((room) => {
		const searchTermWithoutAccents = removeAccents(searchTerm.toLowerCase());
		const roomNameWithoutAccents = removeAccents(room.roomname.toLowerCase());

		const matchesSearchTerm = roomNameWithoutAccents.includes(
			searchTermWithoutAccents,
		);

		// Kiểm tra xem vị trí của khách sạn có trùng khớp với vị trí được chọn hay không
		const matchesRoomType =
			selectedRoomType.length > 0
				? selectedRoomType.includes(room.roomtype)
				: true;

		const matchesPrices = isPriceInRange(
			room.roomprice,
			selectedPriceMin,
			selectedPriceMax,
		);

		return matchesSearchTerm && matchesRoomType && matchesPrices;
	});

	return (
		<>
			<div className="container mx-auto relative max-w-screen-2xl p-5">
				<Typography variant="h4" className=" mt-[40px] font-bold mb-5">
					Danh sách phòng
				</Typography>

				<ButtonSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<div className="grid grid-cols-4">
					<FiltersRoom
						handleRoomTypeFilter={handleRoomTypeFilter}
						handlePriceFilter={handlePriceFilter}
					/>
					<div className="grid gap-4 relative col-span-5 m-4 md:col-span-5 lg:col-span-3">
						{isLoggedIn ? (
							<>
								{rooms.length > 0 ? (
									filteredRooms.map((room) => {
										let selectedRoomtype = "";
										// biome-ignore lint/complexity/noForEach: <explanation>
										roomtype.forEach((roomType) => {
											if (roomType.roomtype_id === room.roomtype) {
												selectedRoomtype = roomType.name;
											}
										});
										return (
											<div key={room.room_id} className="mb-2 ">
												<Card className="w-full mx-auto mb-2 border border-solid border-gray-400">
													<CardBody className="flex">
														<div className="h-auto w-1/3  flex items-center">
															<div className="">
																<div className="grid grid-cols-1 mb-1 ">
																	{room?.images?.slice(0, 1).map((image) => (
																		<div
																			key={image.id}
																			className="relative transform transition-transform  cursor-pointer rounded-lg"
																		>
																			<img
																				src={image.image}
																				// biome-ignore lint/a11y/noRedundantAlt: <explanation>
																				alt={`Image ${image.id}`}
																				className="w-full h-20 2xl:h-40 lg-h-40 md:h-40"
																				style={{
																					transition: "filter 0.3s ease",
																				}}
																				onMouseEnter={(e) =>
																					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
																					(e.target.style.filter =
																						"brightness(70%)")
																				}
																				onMouseLeave={(e) =>
																					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
																					(e.target.style.filter =
																						"brightness(100%)")
																				}
																			/>
																		</div>
																	))}
																</div>
																<div className="grid grid-cols-3 gap-1 ">
																	{/* Hiển thị các ảnh tiếp theo */}
																	{room?.images?.slice(1, 4).map((image) => (
																		<div
																			key={image.id}
																			className="relative transform transition-transform  cursor-pointer rounded-lg"
																		>
																			<img
																				src={image.image}
																				// biome-ignore lint/a11y/noRedundantAlt: <explanation>
																				alt={`Image ${image.id}`}
																				className="w-full h-15"
																				style={{
																					transition: "filter 0.3s ease",
																				}}
																				onMouseEnter={(e) =>
																					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
																					(e.target.style.filter =
																						"brightness(70%)")
																				}
																				onMouseLeave={(e) =>
																					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
																					(e.target.style.filter =
																						"brightness(100%)")
																				}
																			/>
																		</div>
																	))}
																</div>
																<div className="flex mx-auto justify-center mt-2">
																	<RoomDetail room={room} />
																</div>
															</div>
														</div>
														<div className="m-3 flex flex-col justify-between w-2/3">
															<Typography
																variant="h5"
																color="blue-gray"
																className="mb-2 text-blue-800"
															>
																{room.roomname}
															</Typography>
															<div className="overflow-auto h-[85px] sm:h-[100px] md:h-[120px] lg:h-[160px] ">
																<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
																	<div className="hidden 2xl:block">
																		<div className="flex w-full justify-center  ">
																			<ServerIcon className="h-5 w-5 mr-2" />
																			<Typography className="text-justify">
																				{room?.amenities.length > 0 && (
																					<li
																						className="flex justify-center"
																						key={room.amenities[0].id}
																					>
																						<span className="h-auto">
																							{room.amenities[0].name}
																						</span>
																					</li>
																				)}
																			</Typography>
																		</div>
																	</div>
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
																			{selectedRoomtype}
																		</Typography>
																	</div>
																</div>
																<div className="border-b mb-2 mt-2 border-gray-500" />
																<div className=" flex flex-wrap container mx-auto mb-2 ">
																	<div className=" flex flex-col flex-wrap w-full ">
																		<ul className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-2  ">
																			{room?.amenities.map((items) => (
																				<li
																					className="flex justify-left "
																					key={items.id}
																				>
																					<CheckBadgeIcon className="h-5 w-5 text-green-400 mr-2" />
																					<span className="h-auto">
																						{items.name}
																					</span>
																				</li>
																			))}
																		</ul>
																	</div>
																</div>
															</div>
															<div className=" flex flex-col flex-wrap w-full mt-2">
																<Typography className="text-right text-lg font-bold 2xl:text-2xl lg:text-2xl md:text-xl sm:text-xl text-red-500">
																	{room.roomprice.toLocaleString()} VNĐ
																</Typography>
															</div>
															<div className="flex justify-center mt-3">
																<Link to={`/booking/${acc_id}/${room.room_id}`}>
																	<Button size="md" color="red">
																		Đặt phòng
																	</Button>
																</Link>
															</div>
														</div>
													</CardBody>
												</Card>
											</div>
										);
									})
								) : (
									<div>
										<h3
											colSpan="6"
											className="px-4 py-3 text-center text-red-600 font-semibold"
										>
											Hiện tại không còn phòng trống!
										</h3>
									</div>
								)}
							</>
						) : (
							<div>
								<h3 className="px-4 py-3 text-center text-red-600 font-semibold">
									Vui lòng đăng nhập hoặc đăng ký để xem danh sách phòng!
								</h3>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
