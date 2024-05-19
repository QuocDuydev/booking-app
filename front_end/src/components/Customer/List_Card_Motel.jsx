import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import axios from "axios";
import { getAccommodation } from "../../api/acc_API";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Button,
	Rating,
	Carousel,
} from "@material-tailwind/react";
import {
	BuildingStorefrontIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ListCardMotel() {
	const token = useAccessToken();

	const [hotels, setHotel] = useState([]);
	const [user, setUsers] = useState([]);
	const [rooms, setRooms] = useState([]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const roomData = await getRoomsByAccommodationId();
				setRooms(roomData);
			} catch (error) {
				console.error("Error fetching room data:", error);
			}
		};

		fetchRooms();
	}, [hotels]);

	const getRoomsByAccommodationId = async () => {
		const roomData = await Promise.all(
			hotels.map(async (hotel) => {
				try {
					const response = await axios.get(
						`http://back-end.timtro.top/api/accommodations/${hotel.acc_id}/rooms/`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					);
					return response.data;
				} catch (error) {
					console.error(
						"Error fetching room data for accommodation ID",
						hotel.acc_id,
						":",
						error,
					);
					return [];
				}
			}),
		);
		return roomData;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Lấy dữ liệu khách sạn từ API
				const hotelData = await getAccommodation(token);
				const fillterHotels = hotelData.filter((hotel) => hotel.acctype === 3);
				// Sắp xếp theo số rating từ cao xuống thấp

				const latestTimestamp = Date.now();

				// Sắp xếp theo ngày thêm mới nhất và thời gian thêm mới nhất
				const sortedHotels = fillterHotels.sort((a, b) => {
					// So sánh ngày thêm mới nhất
					const dateComparison = new Date(b.updatedAt) - new Date(a.updatedAt);

					// Nếu cùng ngày thêm mới nhất, so sánh thời gian thêm mới nhất
					if (dateComparison === 0) {
						// Lấy thời gian thêm mới nhất của từng khách sạn
						const timestampA = new Date(a.updatedAt).getTime();
						const timestampB = new Date(b.updatedAt).getTime();

						// So sánh thời gian thêm mới nhất với biến tạm thời
						return timestampB - timestampA - (latestTimestamp - timestampA);
					}

					// Nếu khác ngày thêm mới nhất, sắp xếp theo ngày thêm mới nhất
					return dateComparison;
				});
				const sortedByRating = sortedHotels.sort((a, b) => b.rating - a.rating);

				setHotel(sortedByRating);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [token]);

	const limitedHotel = hotels.slice(0, 4);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userIds = hotels.map((hotel) => hotel.user);
				const uniqueUserIds = [...new Set(userIds)]; // Get unique user ids
				const usersData = await Promise.all(
					uniqueUserIds.map((userId) =>
						axios.get(`http://back-end.timtro.top/api/users/${userId}/`, {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}),
					),
				);
				const usersMap = usersData.reduce((acc, userRes) => {
					acc[userRes.data.id] = userRes.data;
					return acc;
				}, {});
				setUsers(usersMap);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
	}, [hotels, token]);

	return (
		<>
			<div className="container mx-auto relative max-w-screen-2xl px-3 py-3">
				<div className=" container mt-6 flex">
					<BuildingStorefrontIcon className="h-7 w-7 text-red-600 mr-3" />
					<Typography variant="h4">Danh sách Nhà Trọ</Typography>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
					{limitedHotel.map((item, index) => {
						const hotelRooms = rooms[index] || [];
						const firstRoomPrice =
							hotelRooms.length > 0 ? hotelRooms[0].roomprice : "0";
						return (
							<Card
								className="text-center shadow-md rounded-xl flex flex-col"
								key={item.acc_id}
							>
								<CardHeader className="mt-6 h-56 overflow-hidden">
									<Carousel className="rounded-xl">
										{item.images.slice(0, 5).map((image, index) => (
											<Link
												to={`/accommodations/${item.acc_id}`}
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
											>
												<img
													src={image.image}
													alt={`image-${index}`}
													className="h-full w-full object-cover"
												/>
											</Link>
										))}
									</Carousel>
								</CardHeader>
								<CardBody className=" flex flex-col justify-between  h-1/2">
									<div className="mx-auto justify-center  overflow-hidden b ">
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2 line-clamp-3 w-[250px]"
											style={{
												display: "-webkit-box",
												WebkitBoxOrient: "vertical",
												WebkitLineClamp: 3,
												overflow: "hidden",
												textOverflow: "ellipsis",
											}}
										>
											{item.accname}
										</Typography>
									</div>
									<div className=" ">
										<div className="mx-auto flex justify-center mb-2">
											{item.acc_id && (
												<>
													<Rating
														value={item.rating}
														unratedColor="red"
														ratedColor="red"
														readonly
														className="flex justify-end"
													/>
												</>
											)}
										</div>
										<div className="text-left">
											<Typography
												variant="h6"
												color="blue-gray"
												className="flex"
											>
												Chủ nhà:
												<span className="line-clamp-1 w-[190px] ml-1 overflow-ellipsis block text-blue-600">
													{user[item.user]?.name}
												</span>
											</Typography>
											<Typography color="blue-gray">
												<div className="flex">
													<MapPinIcon className="h-5 w-5" />
													<span className="line-clamp-1 w-[250px] ml-1 overflow-ellipsis block ">
														 {item.roommap}
													</span>
												</div>
											</Typography>
										</div>
										<div className="mt-3 flex mx-auto text-right">
											<Typography variant="h4" color="red" className="flex">
												<span className="line-clamp-1 w-[250px] ml-1 mt-[1px] flex justify-center ">
													{firstRoomPrice.toLocaleString()} VNĐ
												</span>
											</Typography>
										</div>
									</div>
								</CardBody>
							</Card>
						);
					})}
				</div>
				<div className="flex mx-auto justify-end mt-3 ">
					<Link to={"/list-motel"}>
						<Button size="md">Xem thêm {">>"}</Button>
					</Link>
				</div>
			</div>
		</>
	);
}
