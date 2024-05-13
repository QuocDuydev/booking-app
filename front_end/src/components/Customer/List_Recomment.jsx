import { XMarkIcon } from "@heroicons/react/24/solid";
import {
	Drawer,
	Button,
	Typography,
	IconButton,
	Avatar,
	Rating,
	Card,
	CardBody,
	CardHeader,
} from "@material-tailwind/react";
import { useState } from "react";

export function ListAllRecomment({ users, recommentsData }) {
	const [openRight, setOpenRight] = useState(false);
	const openDrawerRight = () => setOpenRight(true);
	const closeDrawerRight = () => setOpenRight(false);
	return (
		<>
			<div className="flex flex-wrap gap-4 mt-4 ">
				<Button onClick={openDrawerRight}>Tất cả các đánh giá</Button>
			</div>

			<div className=" overflow-auto ">
				<Drawer
					placement="right"
					open={openRight}
					onClose={closeDrawerRight}
					className="p-4"
					style="max-width: 500px;"
				>
					<div className=" flex mb-6 items-center justify-between">
						<Typography variant="h5" color="blue-gray">
							List Recomment
						</Typography>
						<IconButton
							variant="text"
							color="blue-gray"
							onClick={closeDrawerRight}
						>
							<XMarkIcon className="h-5 w-5 " />
						</IconButton>
					</div>
					<div className="w-full overflow-y-auto max-h-[90%]">
						{recommentsData.map((item) => (
							<Card
								shadow={false}
								className="w-full  p-3 bg-gray-300 mb-3"
								key={item.recomment_id}
							>
								<CardHeader
									color="transparent"
									floated={false}
									shadow={false}
									className="mx-0 flex items-center gap-4 pt-0 pb-8 -mb-4"
								>
									<Avatar
										size="sm"
										variant="circular"
										src={
											users.length > 0 &&
											item.user &&
											users.find((user) => user.data.id === item.user)?.data
												.images
										}
									/>
									<div className="flex w-full flex-col gap-0.5">
										<div className="flex items-center justify-between">
											<Typography variant="h6" color="blue-gray">
												{users.length > 0 &&
													item.user &&
													users.find((user) => user.data.id === item.user)?.data
														.name}
											</Typography>
											<div className="flex items-center gap-0 text-xs">
												{item.rating && (
													<>
														<Rating
															value={item.rating}
															unratedColor="red"
															ratedColor="red"
															readonly
															className="flex justify-end"
														/>
													</>
												)}
											</div>
										</div>
										<Typography color="blue-gray">
											Thời gian: {new Date(item.updatedAt).getDate()}/
											{new Date(item.updatedAt).getMonth() + 1}/
											{new Date(item.updatedAt).getFullYear()}
										</Typography>
									</div>
								</CardHeader>
								<CardBody className=" mb-2 p-0 text-black text-justify">
									<Typography className="text-sm">
										{item.descriptions}
									</Typography>
								</CardBody>
							</Card>
						))}
					</div>
				</Drawer>
			</div>
		</>
	);
}
export default ListAllRecomment;
