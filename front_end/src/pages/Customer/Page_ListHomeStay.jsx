import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAccommodation } from "../../api/acc_API";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Rating,
	Carousel,
} from "@material-tailwind/react";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import useAccessToken from "../../components/ultiti";
import Navbars from "../../components/Customer/Layout/Navbar";

export default function Page_ListHomeStay() {
	const token = useAccessToken();
	const [homestays, setHomestay] = useState([]);
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
	}, [homestays]);

	const getRoomsByAccommodationId = async () => {
		const roomData = await Promise.all(
			homestays.map(async (homestay) => {
				try {
					const response = await axios.get(
						`http://back-end.timtro.top/api/accommodations/${homestay.acc_id}/rooms/`,
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
						homestay.acc_id,
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
				const homestayData = await getAccommodation(token);
				const fillterHomestays = homestayData.filter(
					(homestay) => homestay.acctype === 2,
				);

				const sortedByRating = fillterHomestays.sort(
					(a, b) => b.rating - a.rating,
				);
				setHomestay(sortedByRating);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [token]);

	const limitedHomestay = homestays.slice(0, 4);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userIds = homestays.map((homestay) => homestay.user);
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
	}, [homestays, token]);
	return (
		<>
			<Navbars />
			<div className="container mx-auto relative max-w-screen-2xl px-3 py-3">
				<div className="mt-6 flex ">
					<BuildingOffice2Icon className="h-7 w-7 text-red-600 mr-3" />
					<Typography variant="h4">Danh sách Khách Sạn</Typography>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
					{homestays.map((item, index) => {
						const homestayRooms = rooms[index] || [];
						const firstRoomPrice =
							homestayRooms.length > 0 ? homestayRooms[0].roomprice : "0";
						return (
							<Card
								className="text-center shadow-lg border-spacing-0  rounded-xl flex flex-col"
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
														{item.location} - {item.roommap}
													</span>
												</div>
											</Typography>
										</div>
										<div className="mt-3 flex mx-auto text-right">
											<Typography variant="h4" color="red" className="flex">
												<span className="line-clamp-1 w-[250px] ml-1 mt-[1px] flex justify-center ">
													{firstRoomPrice.toLocaleString()}đ
												</span>
											</Typography>
										</div>
									</div>
								</CardBody>
							</Card>
						);
					})}
				</div>
			</div>
		</>
	);
}
