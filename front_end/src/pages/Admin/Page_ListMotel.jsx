import { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getHotel } from "../../api/acc_API";
import { deleteHotel } from "../../api/acc_API";
import HotelTable from "../../components/Admin/Hotel_Table";
import Pagination from "../../components/Customer/Layout/Panination";
import jwt_decode from "jwt-decode";
import { getUser } from "../../api/user_API";
import { Typography } from "@material-tailwind/react";

export default function ListMotelAdmin() {
	const token = useAccessToken();
	const isConfirmed = false;
	const [userHotels, setUserHotels] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const hotelData = await getHotel();

				if (token) {
					const decodedToken = jwt_decode(token);
					const userDetailsResponse = await getUser(token);
					const fillterHotels = hotelData.filter(
						(hotel) => hotel.acctype === 3,
					);
					const userHotels = hotelData.filter(
						(hotel) =>
							hotel.user === decodedToken.user_id && hotel.acctype === 3,
					);
					const allowedAccess = userDetailsResponse.find(
						(user) =>
							user.id === decodedToken.user_id &&
							user.account_type === "superadmin",
					);
					if (allowedAccess) {
						setUserHotels(fillterHotels);
					} else {
						setUserHotels(userHotels);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);
	const handleDelete = async (item) => {
		const isConfirmed = window.confirm("Are you sure you want to delete?");
		if (isConfirmed) {
			try {
				await deleteHotel(item, token);
				const updateHotels = await getHotel();
				setUserHotels(updateHotels);
				window.location.reload();
			} catch (error) {
				console.error("Error deleting user:", error);
			}
		}
	};
	const [currentPage, setCurrentPage] = useState(1);
	// Giả sử danh sách khách sạn là một mảng hotels
	const hotelsPerPage = 5;
	const totalHotels = userHotels.length;
	const totalPages = Math.ceil(totalHotels / hotelsPerPage);

	// Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
	const getHotelsForPage = (pageNumber) => {
		const startIndex = (pageNumber - 1) * hotelsPerPage;
		const endIndex = startIndex + hotelsPerPage;
		return userHotels.slice(startIndex, endIndex);
	};

	// Xử lý khi chuyển tới một số trang mới
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className=" flex h-screen overflow-hidden">
				<Sidebar_Admin />
				<div className="flex flex-col flex-1 w-full">
					<Header_Admin />
					<div className=" mx-auto mb-4 mt-4">
						<Typography variant="h4" color="red">
							Danh sách nhà trọ
						</Typography>
					</div>
					<HotelTable
						handleDelete={handleDelete}
						getHotelsForPage={getHotelsForPage}
						currentPage={currentPage}
					/>
					<Pagination
						handlePageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			</div>
		</>
	);
}
