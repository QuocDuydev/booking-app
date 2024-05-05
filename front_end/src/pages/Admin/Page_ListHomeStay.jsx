import { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { deleteAccommodation, getAccommodation } from "../../api/acc_API";
import Pagination from "../../components/Customer/Layout/Panination";
import jwt_decode from "jwt-decode";
import { getUser } from "../../api/user_API";
import { Typography } from "@material-tailwind/react";
import AccommodationTable from "../../components/Admin/Accommodation_Table";

export default function ListHomeStayAdmin() {
	const token = useAccessToken();
	const isConfirmed = false;
	const [userHomestays, setUserHomestays] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const homestayData = await getAccommodation();

				if (token) {
					const decodedToken = jwt_decode(token);
					const userDetailsResponse = await getUser(token);
					const fillterHomestays = homestayData.filter(
						(homestay) => homestay.acctype === 2,
					);
					const userHomestay = homestayData.filter(
						(homestay) =>
							homestay.user === decodedToken.user_id && homestay.acctype === 2,
					);
					const allowedAccess = userDetailsResponse.find(
						(user) =>
							user.id === decodedToken.user_id &&
							user.account_type === "superadmin",
					);
					if (allowedAccess) {
						setUserHomestays(fillterHomestays);
					} else {
						setUserHomestays(userHomestay);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);

	const handleDelete = async (item) => {
		const isConfirmed = window.confirm("Bạn chắc chắn muốn xóa nó?");
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
	const totalAccs = userHomestays.length;
	const totalPages = Math.ceil(totalAccs / accsPerPage);

	// Hàm xử lý để lấy danh sách khách sạn cho trang hiện tại
	const getAccsForPage = (pageNumber) => {
		const startIndex = (pageNumber - 1) * accsPerPage;
		const endIndex = startIndex + accsPerPage;
		return userHomestays.slice(startIndex, endIndex);
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
							Danh sách HomeStay
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
