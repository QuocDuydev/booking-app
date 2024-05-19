import { useContext, useState, useEffect } from "react";
import useAccessToken from "../../ultiti";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
	Button,
	Menu,
	MenuHandler,
	MenuList,
	Avatar,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";
import {
	UserCircleIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	PowerIcon,
	ArrowRightCircleIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

export default function ProfileMenu() {
	const token = useAccessToken();
	let id = null;
	if (token) {
		const loggedInUser = jwt_decode(token);
		id = loggedInUser.user_id;
	}
	const { user, logoutUser } = useContext(AuthContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [users, setUsers] = useState([]);

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
	const imageUrl = users.images
		? users.images
		: "https://res.cloudinary.com/dzi8e6scb/image/upload/v1713672680/avatar_spd3di.jpg";
	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1  py-0.5 pr-2 pl-0.5 "
				>
					<Avatar
						variant="circular"
						size="sm"
						alt="tania andrew"
						className="border border-gray-900 p-0.5"
						src={imageUrl}
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? "rotate-180" : ""
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{!user && (
					<>
						<ListItem className="hover:bg-gray-200">
							<ListItemPrefix>
								<ArrowRightCircleIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Link to="/login"> Đăng nhập </Link>
						</ListItem>
						<ListItem className="hover:bg-gray-200">
							<ListItemPrefix>
								<PencilSquareIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Link to="/register">Đăng ký </Link>
						</ListItem>
					</>
				)}
				{user && (
					<>
						<ListItem className="hover:bg-gray-200">
							<ListItemPrefix>
								<UserCircleIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Link to={`/profile/${id}`}>Tài khoản</Link>
						</ListItem>

						<ListItem className="hover:bg-gray-200">
							<ListItemPrefix>
								<Cog6ToothIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Link to="/list-booking">Lịch sử đặt phòng</Link>
						</ListItem>

						<ListItem className="hover:bg-gray-200">
							<ListItemPrefix>
								<PowerIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Link
								to="/"
								onClick={logoutUser}
								className=" text-red-500 font-bold"
							>
								Đăng xuất
							</Link>
						</ListItem>
					</>
				)}
			</MenuList>
		</Menu>
	);
}
