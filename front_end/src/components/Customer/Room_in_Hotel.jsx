import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import Utilities from "./Layout/Utilities";
import { getRoom_In_Accommodation } from "../../api/room_in_acc_API";
import { getBooking, getlistBooking } from "../../api/booking_API";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import ButtonSearch from "./Button_Search";
import FiltersRoom from "./Filter_Room";
import { CheckBadgeIcon, ServerIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { getRoomType } from "../../api/acc-type_API";

function RoominHotel() {
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
				? selectedRoomType.includes(room.room_type)
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
										const selectRoomType = roomtype.find(
											(item) => item.roomtype_id === room.roomtype,
										);

										return (
											<div key={room.room_id} className="mb-2 ">
												<Card className="w-full mx-auto mb-2 border border-solid border-gray-400">
													<CardBody className="flex">
														<div className="h-30 w-1/3 ">
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
																			className="w-full h-40"
																			style={{ transition: "filter 0.3s ease" }}
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
																			style={{ transition: "filter 0.3s ease" }}
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
																<Button size="sm" className="">
																	Xem chi tiết phòng
																</Button>
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
															<div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2">
																<div className="flex w-full justify-center">
																	<ServerIcon className="h-5 w-5 mr-2" />
																	<Typography className="text-justify">
																		Giường đôi
																	</Typography>
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
																		{selectRoomType ? selectRoomType.name : ""}
																	</Typography>
																</div>
															</div>
															<div className="border-b mb-2 border-gray-500" />
															<div className=" flex flex-wrap container mx-auto ">
																<div className=" flex flex-col flex-wrap lg:w-3/4 w-full justify-center  ">
																	<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lx:grid-cols-2 gap-2  ">
																		{room?.amenities.map((items) => (
																			<li
																				className="flex justify-center "
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
																<div className=" flex flex-col flex-wrap lg:w-1/4 w-full">
																	<Typography className="text-right text-2xl font-bold text-red-500">
																		{room.roomprice.toLocaleString()}đ
																	</Typography>
																</div>
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
export default RoominHotel;
