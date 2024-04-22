import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbars from "../../components/Customer/Layout/Navbar";
import { useAccessToken } from "../../components/ultiti";
import axios from "axios";
import ProfileCard from "../../components/Customer/Profile_Card";

function ShowProfile() {
	const token = useAccessToken();
	const { id } = useParams();
	const [user, setUsers] = useState([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/users/${id}/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, [id]);
	const handleUpdate = () => {
		axios({
			method: "put",
			url: `http://localhost:8000/api/users/${id}/`,
			data: user,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("Update successful:", response.data);
				alert("Cập nhật thông tin tài khoản thành công!");
				window.location.reload();
			})
			.catch((error) => {
				console.error("Update failed:", error);
			});
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUsers((prevUser) => ({ ...prevUser, [name]: value }));
	};
	return (
		<>
			<Navbars />
			<ProfileCard
				user={user}
				handleChange={handleChange}
				handleUpdate={handleUpdate}
			/>
		</>
	);
}
export default ShowProfile;
