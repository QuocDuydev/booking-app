import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccessToken } from "../../components/ultiti";
import axios from "axios";
import ProfileCard from "../../components/Customer/Profile_Card";
import Header_Admin from "../../components/Admin/Layout/Header";

function ProfileAdmin() {
	const token = useAccessToken();
	const { id } = useParams();
	const [user, setUsers] = useState({
		username: "",
		images: "",
		name: "",
		email: "",
		phone: "",
		address: "",
		password: "",
		account_type: "",
		sex_type: "",
		createdAt: "",
		updatedAt: new Date(),
	});

	useEffect(
		(token) => {
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
		},
		[id],
	);
	const handleUpdate = () => {
		const userData = { ...user };
		// biome-ignore lint/performance/noDelete: <explanation>
		delete userData.images;
		axios({
			method: "put",
			url: `http://localhost:8000/api/users/${id}/`,
			data: userData,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("Update successful:", response.data);
				alert("Update Profile successfully!");
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
			<Header_Admin />
			<ProfileCard
				user={user}
				handleChange={handleChange}
				handleUpdate={handleUpdate}
			/>
		</>
	);
}
export default ProfileAdmin;
