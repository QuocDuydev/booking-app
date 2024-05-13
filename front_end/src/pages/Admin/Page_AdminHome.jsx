import React, { useState, useEffect } from "react";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import { useAccessToken } from "../../components/ultiti";
import { getUser } from "../../api/user_API";
import { getAccommodation } from "../../api/acc_API";
import { getRoom } from "../../api/room_in_acc_API";
import { getlistBooking } from "../../api/booking_API";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import {
	BuildingOfficeIcon,
	BuildingStorefrontIcon,
	ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

export default function AdminHome() {
	const [users, setUser] = useState([]);
	const [acc, setAcc] = useState([]);
	const [rooms, setRoom] = useState([]);
	const [bookings, setBooking] = useState([]);
	const token = useAccessToken();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [userData, accData, roomData, bookingData] = await Promise.all([
					getUser(token),
					getAccommodation(),
					getRoom(),
					getlistBooking(token),
				]);

				setUser(userData);
				setAcc(accData);
				setRoom(roomData);
				setBooking(bookingData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [token]);

	const totalUsers = users.length;
	const totalAccs = acc.length;
	const totalRooms = rooms.length;
	const totalBookings = bookings.length;
	return (
		<>
			<div className=" flex h-screen">
				<div className="hidden lg:block">
					<Sidebar_Admin />
				</div>

				<div className="flex flex-col flex-1 w-full">
					<Header_Admin />
					<div className="container px-6 mx-auto grid relative ">
						<h2 className="my-6 text-2xl font-semibold text-gray-700">
							Trang quản lý dữ liệu
						</h2>

						<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
							<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
								<div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
									<UserGroupIcon className="h-6 w-6" />
								</div>
								<div>
									<p className="mb-2 text-sm font-medium text-gray-600 ">
										Tổng số người dùng
									</p>
									<p className="text-lg font-semibold text-gray-700 ">
										{totalUsers} - tài khoản
									</p>
								</div>
							</div>

							<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
								<div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
									<BuildingOfficeIcon className="h-6 w-6" />
								</div>
								<div>
									<p className="mb-2 text-sm font-medium text-gray-600 ">
										Tổng số chỗ ở
									</p>
									<p className="text-lg font-semibold text-gray-700 ">
										{totalAccs} - chỗ ở
									</p>
								</div>
							</div>

							<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
								<div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
									<BuildingStorefrontIcon className="h-6 w-6" />
								</div>
								<div>
									<p className="mb-2 text-sm font-medium text-gray-600 ">
										Tổng số phòng
									</p>
									<p className="text-lg font-semibold text-gray-700 ">
										{totalRooms} - phòng
									</p>
								</div>
							</div>

							<div className="flex items-center p-4 bg-white rounded-lg shadow-xs ">
								<div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full ">
									<ChatBubbleLeftIcon className="h-6 w-6" />
								</div>
								<div>
									<p className="mb-2 text-sm font-medium text-gray-600 ">
										Tổng đơn đặt phòng
									</p>
									<p className="text-lg font-semibold text-gray-700 ">
										{totalBookings} - đơn
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
