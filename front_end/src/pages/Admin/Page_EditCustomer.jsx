import { useEffect, useState } from "react";
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

export default function EditCustomer() {
	const { id } = useParams();
	const [user, setUser] = useState({
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
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const navigate = useNavigate();
	const token = useAccessToken();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/users/${id}/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response);
				setUser(response.data);

				// console.log(room.roomimage)
			})
			.catch((error) => {
				console.error("Error fetching room data:", error);
			});
	}, [id]);

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
				setUpdateSuccess(true);
				setTimeout(() => {
					setUpdateSuccess(false);
				}, 1000);

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
	const handleSelectAccChange = (value) => {
		handleChange({ target: { name: "account_type", value } });
	};
	const handleSelectSexChange = (value) => {
		handleChange({ target: { name: "sex_type", value } });
	};
	return (
		<>
			<div className=" flex h-screen overflow-hidden">
				<div className="hidden lg:block">
					<Sidebar_Admin />
				</div>
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
						handleSelectSexChange={handleSelectSexChange}
						handleSelectAccChange={handleSelectAccChange}
						handleUpdate={handleUpdate}
					/>
				</div>
			</div>
		</>
	);
}
