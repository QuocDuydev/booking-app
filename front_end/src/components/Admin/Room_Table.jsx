import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function RoomTable({
	acc_id,
	handleDelete,
	getRoomsForPage,
	currentPage,
	roomtypes,
}) {
	return (
		<>
			<div className=" mx-auto mb-4 mt-4">
				<Typography variant="h4" color="red" className="mr-7">
					Danh sách phòng
				</Typography>
			</div>
			<div className=" flex justify-left ml-10 mb-4">
				<Link to={`/admin/${acc_id}/create-rooms/`}>
					<Button className=" bg-red-500"> Thêm phòng tại đây!!</Button>
				</Link>
			</div>
			<div className="max-w-full px-3 rounded-lg mt-2 overflow-hidden">
				<div className="container px-6 mx-auto grid">
					<div className="w-full overflow-y-auto h-[360px]">
						<table className="w-full whitespace-no-wrap">
							<thead>
								<tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-2 bg-gray-50">
									<th className="px-4 py-3">Tên phòng</th>
									<th className="px-4 py-3">Giá phòng</th>
									<th className="px-4 py-3">Loại phòng</th>
									<th className="px-4 py-3">Sức chứa</th>
									<th className="px-4 py-3">Ngày cập nhật</th>
									<th className="px-4 py-3">Hành động</th>
								</tr>
							</thead>
							<tbody className="bg-gray-100 text-center">
								{getRoomsForPage(currentPage).map((item) => {
									let selectedRoomtype = "";
									// biome-ignore lint/complexity/noForEach: <explanation>
									roomtypes.forEach((roomType) => {
										if (roomType.roomtype_id === item.roomtype) {
											selectedRoomtype = roomType.name;
										}
									});
									return (
										<tr className="text-gray-700 border-2" key={item.room_id}>
											<td className="px-4 py-3">
												<div className="flex items-center text-sm">
													<div>
														<p className="font-semibold">{item.roomname}</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-3 text-sm">
												{item.roomprice.toLocaleString()} VNĐ
											</td>
											<td className="px-4 py-3 text-sm">{selectedRoomtype}</td>
											<td className="px-4 py-3 text-xs">
												<span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">
													{item.roomoccupancy} - người
												</span>
											</td>
											<td className="px-4 py-3 text-sm">
												{" "}
												{new Date(item.updatedAt).getDate()}/
												{new Date(item.updatedAt).getMonth() + 1}/
												{new Date(item.updatedAt).getFullYear()}-{" "}
												{new Date(item.updatedAt).getHours()}:
												{new Date(item.updatedAt).getMinutes()}:
												{new Date(item.updatedAt).getSeconds()}
											</td>
											<td className="px-4 py-3 ">
												<div className=" flex space-x-4 text-sm justify-center">
													<Link
														to={`/admin/${item.accommodations}/edit-room/${item.room_id}`}
													>
														<Button
															variant="text"
															className="flex items-center justify-between px-2 py-2 leading-5 text-green-600 rounded-full"
														>
															<PencilSquareIcon className="w-5 h-5" />
														</Button>
													</Link>
													<Button
														onClick={() => handleDelete(item.room_id)}
														variant="text"
														className="flex items-center justify-between px-2 py-2 leading-5 text-red-600 rounded-full"
													>
														<TrashIcon className="w-5 h-5" />
													</Button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
