import { useState, useEffect } from "react";
import {
	Navbar,
	Collapse,
	Typography,
	IconButton,
	MenuItem,
} from "@material-tailwind/react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ProfileMenu from "./ProfileMenu";

const navListItems = [
	{
		label: "PHÒNG TRỌ",
	},
	{
		label: "KHÁCH SẠN",
	},
	{
		label: "HOMESTAY",
	},
];

function NavList() {
	return (
		<ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
			{navListItems.map(({ label }) => (
				<Typography
					key={label}
					as="a"
					href="#"
					variant="small"
					color="gray"
					className="font-medium text-blue-gray-500"
				>
					<MenuItem className="flex items-center gap-2 lg:rounded-full">
						<span className="text-gray-900"> {label}</span>
					</MenuItem>
				</Typography>
			))}
			<form className="w-auto mx-auto lg:w-[450px] md:w-[500px]">
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<MagnifyingGlassIcon className="w-5 h-5 text-black" />
					</div>
					<input
						type="search"
						id="default-search"
						className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
						placeholder="Tìm kiếm phòng trọ bạn muốn ..."
						required
					/>
					<button
						type="submit"
						className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 hidden lg:block md:block "
					>
						Search
					</button>
				</div>
			</form>
		</ul>
	);
}

export default function Navbars() {
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
						href="/"
						className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-red-500"
					>
						E-Commerce
					</Typography>
					<div className="hidden lg:block">
						<NavList />
					</div>
					<IconButton
						size="sm"
						color="blue-gray"
						variant="text"
						onClick={toggleIsNavOpen}
						className="ml-auto mr-2 lg:hidden"
					>
						<Bars3Icon className="h-6 w-6" />
					</IconButton>

					<ProfileMenu />
				</div>
				<Collapse open={isNavOpen} className="overflow-scroll">
					<NavList />
				</Collapse>
			</Navbar>
		</>
	);
}
