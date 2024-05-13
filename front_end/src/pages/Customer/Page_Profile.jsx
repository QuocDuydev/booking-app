import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbars from "../../components/Customer/Layout/Navbar";
import { useAccessToken } from "../../components/ultiti";
import axios from "axios";
import ProfileCard from "../../components/Customer/Profile_Card";

function ShowProfile() {
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
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState("");
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const imageUrl = URL.createObjectURL(file);
		setSelectedImageUrl(imageUrl);
		setSelectedFile(file);
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		axios
			.get(`http://back-end.timtro.top/api/users/${id}/`, {
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
		const userData = { ...user };
		// biome-ignore lint/performance/noDelete: <explanation>
		delete userData.images;
		axios({
			method: "put",
			url: `http://back-end.timtro.top/api/users/${id}/`,
			data: userData,
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
	const handleUpdateImg = () => {
		const userData = { ...user };

		userData.images = selectedFile;

		axios({
			method: "put",
			url: `http://back-end.timtro.top/api/users/${id}/`,
			data: userData,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("Update image successful:", response.data);
				alert("Cập nhật ảnh đại diện thành công!");
				window.location.reload();
			})
			.catch((error) => {
				console.error("Update image failed:", error);
			});
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUsers((prevUser) => ({ ...prevUser, [name]: value }));
	};
	const handleSelectSexChange = (value) => {
		handleChange({ target: { name: "sex_type", value } });
	};
	return (
		<>
			<Navbars />
			<ProfileCard
				user={user}
				handleChange={handleChange}
				handleUpdate={handleUpdate}
				handleSelectSexChange={handleSelectSexChange}
				handleUpdateImg={handleUpdateImg}
				selectedImageUrl={selectedImageUrl}
				handleFileChange={handleFileChange}
			/>
		</>
	);
}
export default ShowProfile;
