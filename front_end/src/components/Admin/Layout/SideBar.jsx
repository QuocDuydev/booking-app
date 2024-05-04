import { useState, useEffect } from "react";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";
import {
	ChevronRightIcon,
	ChevronDownIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAccessToken } from "../../ultiti";
import { getUser } from "../../../api/user_API";

function Sidebar_Admin() {
	const [open, setOpen] = useState(0);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};
	const token = useAccessToken();

	const [accountType, setAccountType] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDetailsResponse = await getUser(token);
				const loggedInUser = jwt_decode(token);
				const allowedAccess = userDetailsResponse.find(
					(user) =>
						user.id === loggedInUser.user_id &&
						user.account_type === "superadmin",
				);
				// console.log(userDetailsResponse);
				setAccountType(allowedAccess);
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		};

		fetchData();
	}, [token]);

	return (
		<div className="sticky top-0 z-10 h-max max-w-full rounded">
			<Card className=" hidden lg:block max-w-[15rem] p-4 h-full bg-white rounded shadow-none sm:hidden">
				<List>
					<Link to="/admin">
						<ListItem>
							<ListItemPrefix>
								<HomeIcon className="h-6 w-6" />
							</ListItemPrefix>
							Dashboard
						</ListItem>
					</Link>
					{accountType && (
						<>
							<Accordion
								open={open === 1}
								icon={
									<ChevronDownIcon
										strokeWidth={2.5}
										className={`mx-auto h-4 w-4 transition-transform ${
											open === 1 ? "rotate-180" : ""
										}`}
									/>
								}
							>
								<ListItem className="p-0" selected={open === 1}>
									<AccordionHeader
										onClick={() => handleOpen(1)}
										className="border-b-0 p-3"
									>
										<Typography
											color="blue-gray"
											className="-mr-3 font-normal text-lg"
										>
											Manager Customer
										</Typography>
									</AccordionHeader>
								</ListItem>
								<AccordionBody className="py-1">
									<List className="p-0">
										<Link to="/admin/list-customer">
											<ListItem>
												<ListItemPrefix>
													<ChevronRightIcon
														strokeWidth={3}
														className="h-3 w-5"
													/>
												</ListItemPrefix>
												List Customer
											</ListItem>
										</Link>
									</List>
								</AccordionBody>
							</Accordion>
						</>
					)}
					<Accordion
						open={open === 2}
						icon={
							<ChevronDownIcon
								strokeWidth={2.5}
								className={`mx-auto h-4 w-4 transition-transform ${
									open === 2 ? "rotate-180" : ""
								}`}
							/>
						}
					>
						<ListItem className="p-0" selected={open === 2}>
							<AccordionHeader
								onClick={() => handleOpen(2)}
								className="border-b-0 p-3"
							>
								<Typography
									color="blue-gray"
									className="mr-auto font-normal text-lg"
								>
									Manager Hotel
								</Typography>
							</AccordionHeader>
						</ListItem>
						<AccordionBody className="py-1">
							<List className="p-0">
								<Link to="/admin/list-hotel">
									<ListItem>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										List Hotel
									</ListItem>
								</Link>
							</List>
							<List className="p-0">
								<Link to="/admin/list-homestay">
									<ListItem>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										List HomeStay
									</ListItem>
								</Link>
							</List>
							<List className="p-0">
								<Link to="/admin/list-motel">
									<ListItem>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										List Motel
									</ListItem>
								</Link>
							</List>
							<List className="p-0">
								<Link to="/admin/create-hotel">
									<ListItem>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										Create Hotel
									</ListItem>
								</Link>
							</List>
						</AccordionBody>
					</Accordion>

					<Accordion
						open={open === 3}
						icon={
							<ChevronDownIcon
								strokeWidth={2.5}
								className={`mx-auto h-4 w-4 transition-transform ${
									open === 3 ? "rotate-180" : ""
								}`}
							/>
						}
					>
						<ListItem className="p-0" selected={open === 3}>
							<AccordionHeader
								onClick={() => handleOpen(3)}
								className="border-b-0 p-3"
							>
								<Typography
									color="blue-gray"
									className="mr-auto font-normal text-lg"
								>
									Manager Booking
								</Typography>
							</AccordionHeader>
						</ListItem>
						<AccordionBody className="py-1">
							<List className="p-0">
								<Link to="/admin/list-booking">
									<ListItem>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										List Booking
									</ListItem>
								</Link>
							</List>
						</AccordionBody>
					</Accordion>
				</List>
			</Card>
		</div>
	);
}
export default Sidebar_Admin;
