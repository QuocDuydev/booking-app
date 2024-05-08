import { useState, useEffect } from "react";
import { getAccommodationdetail } from "../../api/acc_API";
import { Link, useParams } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import {
	Card,
	CardBody,
	Typography,
	Rating,
	CardHeader,
} from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";

function HotelDetails() {
	const { acc_id } = useParams();
	const [hotels, setHotel] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const hotelData = await getAccommodationdetail(acc_id);
				setHotel(hotelData);
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [acc_id]);

	return (
		<div className="container mx-auto relative max-w-screen-xl">
			<Card className=" w-full mx-auto mb-2 shadow-none mt-12">
				<CardHeader className="">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-3">
						{hotels?.images?.slice(0, 2).map((image) => (
							<div
								key={image.id}
								className="grid gap-4 relative transform transition-transform  cursor-pointer"
							>
								<img
									src={image.image}
									// biome-ignore lint/a11y/noRedundantAlt: <explanation>
									alt={`Image ${image.id}`}
									className="w-full h-80"
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
						{hotels?.images?.slice(2, 6).map((image) => (
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
					<div className=" bg-black z-50">
						<Link to={`/hotel/${hotels.acc_id}/list-images`}>
							<Button
								variant="gradient"
								color="red"
								className="text-black absolute bottom-0 right-0 mb-3 mr-3"
							>
								Xem tất cả ảnh
							</Button>
						</Link>
					</div>
				</CardHeader>
				<CardBody>
					<div className="">
						<div className="flex">
							<Typography
								variant="h4"
								color="blue-gray"
								className="flex mb-2 text-blue-800"
							>
								{hotels.accname} - {hotels.location}
							</Typography>

							<div className=" ml-4 mt-1">
								{hotels.rating && (
									<Rating
										value={hotels.rating}
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
								{hotels.roommap}, {hotels.location}
							</Typography>
						</div>

						<div>
							<Typography variant="h4" className=" text-justify mt-3 ">
								Descriptions:{" "}
								<div className=" text-lg font-normal mt-2">
									{hotels.descriptions}
								</div>
							</Typography>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}
export default HotelDetails;
