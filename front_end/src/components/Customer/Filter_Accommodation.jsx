import {
	Checkbox,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
	Rating,
} from "@material-tailwind/react";

export default function FilterAcc({ handleAccTypeFilter, handleRatingFilter }) {
	return (
		<div className=" gap-4 relative  col-span-1 hidden lg:block">
			<Card className=" shadow-none  mt-4">
				<Typography
					color="blue-gray"
					className="font-bold m-1 mb-3"
					variant="h5"
				>
					Bộ lọc:
				</Typography>
				<Typography color="blue-gray" className="font-bold m-1">
					Loại chỗ ở
				</Typography>
				<div className="border-2 rounded-md shadow-sm">
					<List>
						<ListItem className="p-0" onClick={() => handleAccTypeFilter(1)}>
							<label
								htmlFor="vertical-list-react"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-react"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Khách Sạn
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0" onClick={() => handleAccTypeFilter(2)}>
							<label
								htmlFor="vertical-list-vue"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-vue"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									HomeStay
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0" onClick={() => handleAccTypeFilter(3)}>
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Nhà trọ
								</Typography>
							</label>
						</ListItem>
					</List>
				</div>
				<Typography color="blue-gray" className="font-bold m-1">
					Xếp hạng
				</Typography>
				<div className="border-2 rounded-md shadow-sm">
					<List>
						<ListItem className="p-0" onClick={() => handleRatingFilter(1)}>
							<label
								htmlFor="vertical-list-react"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-react"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									<Rating
										value={1}
										unratedColor="red"
										ratedColor="red"
										readonly
										className="flex justify-end"
									/>
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0" onClick={() => handleRatingFilter(2)}>
							<label
								htmlFor="vertical-list-vue"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-vue"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									<Rating
										value={2}
										unratedColor="red"
										ratedColor="red"
										readonly
										className="flex justify-end"
									/>
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0" onClick={() => handleRatingFilter(3)}>
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									<Rating
										value={3}
										unratedColor="red"
										ratedColor="red"
										readonly
										className="flex justify-end"
									/>
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0" onClick={() => handleRatingFilter(4)}>
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									<Rating
										value={4}
										unratedColor="red"
										ratedColor="red"
										readonly
										className="flex justify-end"
									/>
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0" onClick={() => handleRatingFilter(5)}>
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									<Rating
										value={5}
										unratedColor="red"
										ratedColor="red"
										readonly
										className="flex justify-end"
									/>
								</Typography>
							</label>
						</ListItem>
					</List>
				</div>
			</Card>
		</div>
	);
}
