import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAccessToken } from "../components/ultiti";
import Loading from "../pages/Loading";

const AdminRoute = ({ element, isAdmin }) => {
	const token = useAccessToken();
	const [isAllowedAccess, setIsAllowedAccess] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				if (!isAdmin) {
					setLoading(false);
					return;
				}

				// Lấy thông tin người dùng từ API
				const userDetailsResponse = await fetch(
					"http://back-end.timtro.top/api/users/",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					},
				);

				if (userDetailsResponse.status === 200) {
					const userDetails = await userDetailsResponse.json();
					const loggedInUser = jwt_decode(token);
					// Kiểm tra loại tài khoản
					const allowedAccess = userDetails.find(
						(user) =>
							user.id === loggedInUser.user_id &&
							(user.account_type === "admin" ||
								user.account_type === "superadmin"),
					);
					setIsAllowedAccess(allowedAccess);
				} else {
					throw new Error("Failed to fetch user details");
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserDetails();
	}, [token, isAdmin]);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		// Xử lý lỗi khi không thể lấy thông tin người dùng
		console.error("Error fetching user details:", error);
		return <Navigate to="/error" />;
	}

	if (!isAdmin || !isAllowedAccess) {
		// Chuyển hướng đến trang lỗi khi không phải là admin hoặc không có quyền truy cập
		return <Navigate to="/error" />;
	}

	// Trả về phần tử của trang admin
	return element;
};

export default AdminRoute;
