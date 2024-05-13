import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getSearch } from "../../api/search_API";
import Navbars from "../../components/Customer/Layout/Navbar";
import { Footer } from "flowbite-react";
import {
	Card,
	CardBody,
	CardHeader,
	Carousel,
	Collapse,
	IconButton,
	Rating,
	Typography,
} from "@material-tailwind/react";
import { Bars3Icon, MapPinIcon } from "@heroicons/react/24/solid";
import useAccessToken from "../../components/ultiti";
import { getAccommodation } from "../../api/acc_API";
import FilterAcc from "../../components/Customer/Filter_Accommodation";

const SearchResult = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [accs, setAccs] = useState([]);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchQuery = queryParams.get("q");
	const token = useAccessToken();
	const [selectedRating, setSelectedRating] = useState("");
	const [selectedAccType, setSelectedAccType] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const AccData = await getAccommodation(token);
				AccData.sort((a, b) => b.rating - a.rating);
				setAccs(AccData);
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);
	function removeAccents(str) {
		// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}
	const handleRatingFilter = (ratings) => {
		setSelectedRating((prevRating) => (prevRating === ratings ? "" : ratings));
	};
	const handleAccTypeFilter = (acctypes) => {
		setSelectedAccType((prevAcctype) =>
			prevAcctype === acctypes ? "" : acctypes,
		);
	};
	const filteredAccs = accs.filter((item) => {
		const searchTermWithoutAccents = removeAccents(searchQuery.toLowerCase());
		const accNameWithoutAccents = removeAccents(item.accname.toLowerCase());
		const locationWithoutAccents = removeAccents(item.location.toLowerCase());

		const matchesSearchTerm =
			accNameWithoutAccents.includes(searchTermWithoutAccents) ||
			locationWithoutAccents.includes(searchTermWithoutAccents);
		const matchesAccType = selectedAccType
			? item.acctype === selectedAccType
			: true;
		const matchesRating = selectedRating
			? item.rating === selectedRating
			: true;
		return matchesSearchTerm && matchesAccType && matchesRating;
	});
	useEffect(() => {
		const fetchSearchs = async () => {
			const searchData = await getSearch(searchQuery);
			setSearchResults(searchData);
		};

		if (searchQuery) {
			fetchSearchs();
		}
	}, [searchQuery]);
	const [user, setUsers] = useState([]);
	const [rooms, setRooms] = useState([]);
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
	}, []);

	const getRoomsByAccommodationId = async () => {
		const roomData = await Promise.all(
			accs.map(async (item) => {
				try {
					const response = await axios.get(
						`http://back-end.timtro.top/api/accommodations/${item.acc_id}/rooms/`,
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
						item.acc_id,
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
		const fetchUserData = async () => {
			try {
				const userIds = accs.map((item) => item.user);
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
	}, [accs, token]);
	if (searchQuery && searchQuery.trim() === "") {
		return (
			<>
				<Navbars />
				<main className="content">
					<div className="container mx-auto">
						{/* <ButtonSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
						<div className="grid grid-cols-4">
							<FilterAcc
								handleAccTypeFilter={handleAccTypeFilter}
								handleRatingFilter={handleRatingFilter}
							/>
							<div className="grid gap-4 relative col-span-5 m-4 md:col-span-5 lg:col-span-3">
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2">
									{accs.map((acc) => (
										<Card
											className="text-center shadow-lg border-spacing-0  rounded-xl flex flex-col"
											key={acc.acc_id}
										>
											<CardHeader className="mt-6 h-56 overflow-hidden">
												<Carousel className="rounded-xl">
													{acc.images.slice(0, 5).map((image, index) => (
														<Link
															to={`/accommodations/${acc.acc_id}`}
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
														{acc.accname}
													</Typography>
												</div>
												<div className=" ">
													<div className="mx-auto flex justify-center mb-2">
														{acc.acc_id && (
															<>
																<Rating
																	value={acc.rating}
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
																{user[acc.user]?.name}
															</span>
														</Typography>
														<Typography color="blue-gray">
															<div className="flex">
																<MapPinIcon className="h-5 w-5" />
																<span className="line-clamp-1 w-[250px] ml-1 overflow-ellipsis block ">
																	{acc.location} - {acc.roommap}
																</span>
															</div>
														</Typography>
													</div>
													<div className="mt-3 flex mx-auto text-right">
														<Typography
															variant="h4"
															color="red"
															className="flex"
														>
															<span className="line-clamp-1 w-[250px] ml-1 mt-[1px] flex justify-center ">
																{/* {firstRoomPrice.toLocaleString()}đ */}
															</span>
														</Typography>
													</div>
												</div>
											</CardBody>
										</Card>
									))}
								</div>
							</div>
						</div>
						<Footer />
					</div>
				</main>
			</>
		);
	}
	return (
		<>
			<Navbars />
			<main className="content">
				<div className="container mx-auto">
					{/* <ButtonSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
					<div className="grid grid-cols-4">
						<FilterAcc
							handleAccTypeFilter={handleAccTypeFilter}
							handleRatingFilter={handleRatingFilter}
						/>

						<div className="grid gap-4 relative col-span-5 m-4 md:col-span-5 lg:col-span-3">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2">
								{filteredAccs.map((acc) => (
									<Card
										className="text-center shadow-lg border-spacing-0  rounded-xl flex flex-col"
										key={acc.acc_id}
									>
										<CardHeader className="mt-6 h-56 overflow-hidden">
											<Carousel className="rounded-xl">
												{acc.images.slice(0, 5).map((image, index) => (
													<Link
														to={`/accommodations/${acc.acc_id}`}
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
													{acc.accname}
												</Typography>
											</div>
											<div className=" ">
												<div className="mx-auto flex justify-center mb-2">
													{acc.acc_id && (
														<>
															<Rating
																value={acc.rating}
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
															{user[acc.user]?.name}
														</span>
													</Typography>
													<Typography color="blue-gray">
														<div className="flex">
															<MapPinIcon className="h-5 w-5" />
															<span className="line-clamp-1 w-[250px] ml-1 overflow-ellipsis block ">
																{acc.location} - {acc.roommap}
															</span>
														</div>
													</Typography>
												</div>
												<div className="mt-3 flex mx-auto text-right">
													<Typography variant="h4" color="red" className="flex">
														<span className="line-clamp-1 w-[250px] ml-1 mt-[1px] flex justify-center ">
															{/* {firstRoomPrice.toLocaleString()}đ */}
														</span>
													</Typography>
												</div>
											</div>
										</CardBody>
									</Card>
								))}
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</main>
		</>
	);
};

export default SearchResult;
