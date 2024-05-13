import {
	Checkbox,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from "@material-tailwind/react";

export function FiltersRoom({ handleRoomTypeFilter, handlePriceFilter }) {
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
					Loại phòng:
				</Typography>
				<div className="border-2 rounded-md shadow-sm">
					<List>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-react"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-react"
										ripple={false}
										onClick={() => handleRoomTypeFilter("Phòng đơn")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Phòng đơn
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-vue"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-vue"
										ripple={false}
										onClick={() => handleRoomTypeFilter("Phòng đôi")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Phòng đôi
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										onClick={() => handleRoomTypeFilter("Phòng gia đình")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Phòng gia đình
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										onClick={() => handleRoomTypeFilter("Phòng ghép")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Phòng ghép
								</Typography>
							</label>
						</ListItem>
					</List>
				</div>

				<Typography color="blue-gray" className="font-bold m-1">
					Giá phòng
				</Typography>
				<div className="border-2 rounded-md shadow-sm">
					<List>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-react"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-react"
										ripple={false}
										onClick={() => handlePriceFilter("100000-500000")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									{(100000).toLocaleString()} - {(500000).toLocaleString()} VNĐ
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-vue"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-vue"
										ripple={false}
										onClick={() => handlePriceFilter("500001-2000000")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									{(500000).toLocaleString()} - {(2000000).toLocaleString()} VNĐ
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="vertical-list-svelte"
								className="flex w-full cursor-pointer items-center px-3 py-2"
							>
								<ListItemPrefix className="mr-3">
									<Checkbox
										id="vertical-list-svelte"
										ripple={false}
										onClick={() => handlePriceFilter("2000001-10000000")}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">
									Trên {(2000000).toLocaleString()} VNĐ
								</Typography>
							</label>
						</ListItem>
					</List>
				</div>
			</Card>
		</div>
	);
}
export default FiltersRoom;
