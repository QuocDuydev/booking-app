import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../components/ultiti";
import { useParams, useNavigate } from "react-router-dom";
import Header_Admin from "../../components/Admin/Layout/Header";
import Sidebar_Admin from "../../components/Admin/Layout/SideBar";
import axios from "axios";
import {
	Card,
	Input,
	Button,
	Typography,
	Textarea,
	Alert,
	Select,
	Option,
} from "@material-tailwind/react";
import EditCustomerForm from "../../components/Admin/EditCustomer_Form";
import { getUserId } from "../../api/user_API";

function EditCustomer() {
	const { id } = useParams();
	const [user, setUser] = useState({
		username: "",
		name: "",
		email: "",
		password: "",
		account_type: "",
		joined: "",
	});
	const [defaultAccountType, setDefaultAccountType] = useState("");
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();
	const token = useAccessToken();

	//   useEffect(() => {
	//     const fetchData = async () => {
	//         try {

	//             const userData = await getUserId(id);
	//             setDefaultAccountType(user.account_type);
	//             setUser(userData);
	//         } catch (error) {
	//             console.error("Error fetching data:", error);
	//         }
	//     };
	//     fetchData();
	// }, [id]);
	useEffect(
		(token) => {
			axios
				.get(`http://localhost:8000/api/users/${id}/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setUser(response.data);
					setDefaultAccountType(response.data.account_type);
					// console.log(room.roomimage)
				})
				.catch((error) => {
					console.error("Error fetching room data:", error);
				});
		},
		[id],
	);

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
				setUpdateSuccess(true);
				setTimeout(() => {
					setUpdateSuccess(false);
				}, 1000);

				// Redirect to home page after 1 seconds
				setTimeout(() => {
					navigate("/admin/list-customer");
				}, 1000);
			})
			.catch((error) => {
				console.error("Update failed:", error);
			});
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};
	const handleSelectChange = (value) => {
		handleChange({ target: { name: "account_type", value } });
	};
	return (
		<>
			<div className=" flex h-screen overflow-hidden">
				<Sidebar_Admin />
				<div className="flex flex-col flex-1 w-full">
					<Header_Admin />
					{updateSuccess && (
						<Alert className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]">
							Update successfuly !!
						</Alert>
					)}
					<EditCustomerForm
						user={user}
						handleChange={handleChange}
						handleSelectChange={handleSelectChange}
						handleUpdate={handleUpdate}
					/>
				</div>
			</div>
		</>
	);
}
export default EditCustomer;
