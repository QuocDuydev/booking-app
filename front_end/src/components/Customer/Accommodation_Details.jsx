import { useState, useEffect } from "react";
import { getAccommodationdetail } from "../../api/acc_API";
import { Link, useParams } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import axios from "axios";
import {
	Card,
	CardBody,
	Typography,
	Rating,
	CardHeader,
	Avatar,
	Button,
} from "@material-tailwind/react";
import { CheckBadgeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import MapAcc from "./Map";
export default function AccommodationDetails() {
	const token = useAccessToken();
	const { acc_id } = useParams();
	const [accommodations, setAccommodation] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const accData = await getAccommodationdetail(acc_id);
				setAccommodation(accData);
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [acc_id]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userid = accommodations.user;
				const response = await axios.get(
					`http://back-end.timtro.top/api/users/${userid}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
	}, [accommodations, token]);

	return (
		<div className="container mx-auto relative max-w-screen-2xl">
			<Card className=" w-full mx-auto mb-2 shadow-none mt-12">
				<CardHeader className="">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-3">
						{accommodations?.images?.slice(0, 2).map((image) => (
							<div
								key={image.id}
								className="grid gap-4 relative transform transition-transform cursor-pointer"
							>
								<img
									src={image.image}
									// biome-ignore lint/a11y/noRedundantAlt: <explanation>
									alt={`Image ${image.id}`}
									className="w-full 2xl:h-80 lg:h-60 md:h-40 sm:h-40"
									style={{ transition: "filter 0.3s ease" }}
									onMouseEnter={(e) =>
										// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
										(e.target.style.filter = "brightness(70%)")
									}
									onMouseLeave={(e) =>
										// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
										(e.target.style.filter = "brightness(100%)")
									}
								/>
							</div>
						))}
					</div>
					<div className="grid grid-cols-4 gap-4 mt-4 ">
						{/* Hiển thị các ảnh tiếp theo */}
						{accommodations?.images?.slice(2, 6).map((image) => (
							<div
								key={image.id}
								className="relative transform transition-transform  cursor-pointer rounded-lg"
							>
								<img
									src={image.image}
									// biome-ignore lint/a11y/noRedundantAlt: <explanation>
									alt={`Image ${image.id}`}
									className="w-full lg:h-40 2xl:h-40 md:h-20 sm:h-20"
									style={{ transition: "filter 0.3s ease" }}
									onMouseEnter={(e) =>
										// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
										(e.target.style.filter = "brightness(70%)")
									}
									onMouseLeave={(e) =>
										// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
										(e.target.style.filter = "brightness(100%)")
									}
								/>
							</div>
						))}
					</div>
					<div className=" z-50">
						<Link to={`/accommodations/${accommodations.acc_id}/list-images`}>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button className=" absolute bottom-0 right-0 mb-3 mr-3 rounded-full bg-white p-2 text-black">
								Xem tất cả ảnh
							</button>
						</Link>
					</div>
				</CardHeader>
				<CardBody>
					<div className="flex flex-wrap container mx-auto">
						<div className="flex flex-col flex-wrap lg:w-2/3 w-full">
							<div className=" px-3 py-3 border border-solid border-gray-400 rounded-lg w-full mx-auto mr-3">
								<div className="flex">
									<Typography
										variant="h4"
										color="blue-gray"
										className="flex mb-2 text-blue-800"
									>
										{accommodations.accname} - {accommodations.location}
									</Typography>

									<div className=" ml-4 mt-1">
										{accommodations.rating && (
											<Rating
												value={accommodations.rating}
												unratedColor="red"
												ratedColor="red"
												readonly
												className="flex justify-center"
											/>
										)}
									</div>
								</div>
								<div className=" flex">
									<MapPinIcon className="w-6 h-6" />
									<Typography variant="h6" color="blue-gray" className="ml-1">
										{accommodations.roommap}
									</Typography>
								</div>

								<div className=" text-lg font-normal mt-2">
									{accommodations.descriptions}
								</div>
							</div>
							<div className=" px-3 py-3 border border-solid border-gray-400 rounded-lg mt-3 mr-3 mb-3 ">
								<div className="container">
									<Typography variant="h5" className="mb-4">
										Tiện nghi
									</Typography>
									<div className=" mx-auto overflow-auto h-[60px] ">
										<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lx:grid-cols-5 gap-2  ">
											{accommodations?.utilities?.map((items) => (
												<li className="flex justify-center " key={items.id}>
													<CheckBadgeIcon className="h-5 w-5 text-green-400 mr-2" />
													<span className="h-auto">{items.name}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col flex-wrap px-3 py-3 2xl:w-1/3 lg:w-1/3  md:mx-auto md:w-full sm:w-full  w-full  lg:ml-3 lg:-mr-3 2xl:ml-3 2xl:-mr-3 border border-solid border-gray-400 rounded-lg mb-3">
							<div className=" mx-auto w-full">
								<Typography variant="h5" className=" text-center">
									Thông tin chủ nhà
								</Typography>
								<div className="w-full px-3 py-3 flex">
									<Avatar
										variant="circular"
										size="xl"
										alt="tania andrew"
										className="border border-gray-900"
										src={users.images}
									/>
									<Typography
										variant="h4"
										color="red"
										className="ml-3 flex items-center"
									>
										{users.name}
									</Typography>
								</div>
								<div className="w-full px-3">
									<Typography variant="h6">
										Số điện thoại:
										<span className="ml-3">{users.phone}</span>
									</Typography>
									<Typography variant="h6">
										Email:
										<span className="ml-3">{users.email}</span>
									</Typography>
								</div>
								<Button
									variant="gradient"
									color="blue"
									size="lg"
									className="rounded-full mt-3 flex mx-auto "
								>
									Liên hệ ngay!
								</Button>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
			<div className="p-5">
				<Typography variant="h4"> Vị trí chỗ ở</Typography>
			</div>
			<MapAcc roommap={accommodations.roommap} />
		</div>
	);
}
