import { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getAccommodation, deleteAccommodation } from "../../api/acc_API";
import Pagination from "../../components/Customer/Layout/Panination";
import jwt_decode from "jwt-decode";
import { getUser } from "../../api/user_API";
import { Typography } from "@material-tailwind/react";
import AccommodationTable from "../../components/Admin/Accommodation_Table";

export default function ListMotelAdmin() {
	const token = useAccessToken();
	const isConfirmed = false;
	const [userMotels, setUserMotels] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const motelData = await getAccommodation();

				if (token) {
					const decodedToken = jwt_decode(token);
					const userDetailsResponse = await getUser(token);
					const fillterMotels = motelData.filter(
						(motel) => motel.acctype === 3,
					);
					const userMotel = motelData.filter(
						(motel) =>
							motel.user === decodedToken.user_id && motel.acctype === 3,
					);
					const allowedAccess = userDetailsResponse.find(
						(user) =>
							user.id === decodedToken.user_id &&
							user.account_type === "superadmin",
					);
					if (allowedAccess) {
						setUserMotels(fillterMotels);
					} else {
						setUserMotels(userMotel);
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
				await deleteAccommodation(item, token);
				window.location.reload();
			} catch (error) {
				console.error("Error deleting user:", error);
			}
		}
	};
	const [currentPage, setCurrentPage] = useState(1);

	const accsPerPage = 5;
	const totalAccs = userMotels.length;
	const totalPages = Math.ceil(totalAccs / accsPerPage);

	// Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
	const getAccsForPage = (pageNumber) => {
		const startIndex = (pageNumber - 1) * accsPerPage;
		const endIndex = startIndex + accsPerPage;
		return userMotels.slice(startIndex, endIndex);
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
					<AccommodationTable
						handleDelete={handleDelete}
						getAccsForPage={getAccsForPage}
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
