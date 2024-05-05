import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccessToken } from "../ultiti";
import { getAccommodation } from "../../api/acc_API";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
	Rating,
} from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/outline";

function CardHotelHome() {
	const token = useAccessToken();
	const [hotels, setHotel] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Lấy dữ liệu khách sạn từ API
				const hotelData = await getAccommodation(token);

				// Sắp xếp theo số rating từ cao xuống thấp

				const latestTimestamp = Date.now();

				// Sắp xếp theo ngày thêm mới nhất và thời gian thêm mới nhất
				const sortedHotels = hotelData.sort((a, b) => {
					// So sánh ngày thêm mới nhất
					const dateComparison = new Date(b.dateadded) - new Date(a.dateadded);

					// Nếu cùng ngày thêm mới nhất, so sánh thời gian thêm mới nhất
					if (dateComparison === 0) {
						// Lấy thời gian thêm mới nhất của từng khách sạn
						const timestampA = new Date(a.dateadded).getTime();
						const timestampB = new Date(b.dateadded).getTime();

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

	const limitedHotel = hotels.slice(0, 8);

	return (
		<>
			<div className=" container mt-6">
				<Typography variant="h4">List Hotel Suggested</Typography>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
				{limitedHotel.map((item) => (
					<Card
						className="p-4 text-center bg-gray-200 shadow-md rounded-xl"
						key={item.hotel_id}
					>
						<CardHeader color="blue-gray" className="mt-3 h-56 overflow-hidden">
							<img
								src={item.hotelimage}
								alt="card-image"
								className="object-cover mx-auto w-full h-full transform transition-transform hover:scale-110"
							/>
						</CardHeader>
						<CardBody className="flex flex-col justify-between ">
							<div>
								<Typography
									variant="h5"
									color="blue-gray"
									className="mb-2 mt-3"
								>
									{item.hotelname}
								</Typography>

								<Rating
									value={item.rating}
									unratedColor="red"
									ratedColor="red"
									readonly
									className="flex justify-center"
								/>
								<div className=" flex mt-4">
									<MapPinIcon className="h-6 w-6" />

									<Typography variant="h6" color="blue-gray" className="ml-1">
										{item.location}
									</Typography>
								</div>
							</div>
						</CardBody>
						<CardFooter className="flex flex-col justify-between ">
							<Link to={`/hotel/${item.hotel_id}`}>
								<Button className="text-white bg-blue-500 hover:bg-blue-700">
									Read More
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}
export default CardHotelHome;
