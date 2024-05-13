import { useEffect, useState } from "react";
import {
	Navbar,
	Typography,
	IconButton,
	Collapse,
} from "@material-tailwind/react";

import { Bars3Icon } from "@heroicons/react/24/solid";
import Sidebar_Admin from "./SideBar";
import ProfileMenuAdmin from "./ProfileMenu_Admin";

function Header_Admin() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setIsNavOpen(false),
		);
	}, []);

	return (
		<>
			<Navbar className="sticky top-0 z-10 mx-auto max-w-screen-3xl p-2 rounded-none lg:pl-6">
				<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
					<Typography
						as="a"
						href="/admin"
						className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-red-500"
					>
						Timtro.top
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

					<ProfileMenuAdmin />
				</div>
				<Collapse open={isNavOpen} className="overflow-scroll">
					<Sidebar_Admin />
				</Collapse>
			</Navbar>
		</>
	);
}
export default Header_Admin;
