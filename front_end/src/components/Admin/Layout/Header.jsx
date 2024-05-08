import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useAccessToken } from "../../ultiti";
import jwt_decode from "jwt-decode";
import {
	Navbar,
	Typography,
	Button,
	IconButton,
	Input,
	Popover,
	PopoverHandler,
	PopoverContent,
	Avatar,
	List,
	ListItem,
	ListItemPrefix,
	Collapse,
} from "@material-tailwind/react";

import {
	UserCircleIcon,
	Cog6ToothIcon,
	PowerIcon,
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import ProfileMenu from "../../Customer/Layout/ProfileMenu";
import Sidebar_Admin from "./SideBar";

function Header_Admin() {
	const token = useAccessToken();
	let id = null;
	let username = null;
	if (token) {
		const loggedInUser = jwt_decode(token);
		id = loggedInUser.user_id;
		username = loggedInUser.username;
	}
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setIsNavOpen(false),
		);
	}, []);
	const { user, logoutUser } = useContext(AuthContext);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openDrawer = () => {
		setIsDrawerOpen(true);
		setIsNavOpen(false);
	};
	const closeDrawer = () => setIsDrawerOpen(false);

	return (
		<>
			<Navbar className="sticky top-0 z-10 mx-auto max-w-screen-3xl p-2 rounded-none lg:pl-6">
				<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
					<Typography
						as="a"
						href="/"
						className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-red-500"
					>
						Timtro.dk
					</Typography>
					<IconButton
						size="sm"
						color="blue-gray"
						variant="text"
						className="ml-auto mr-2 lg:hidden"
						onClick={toggleIsNavOpen}
					>
						<Bars3Icon className="h-6 w-6 stroke-2" />
					</IconButton>

					<ProfileMenu />
				</div>
				<Collapse open={isNavOpen} className="overflow-scroll">
					<Sidebar_Admin />
				</Collapse>
			</Navbar>
		</>
	);
}
export default Header_Admin;
