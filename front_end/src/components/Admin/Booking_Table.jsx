import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function BookingTable({
	handleDelete,
	getBookingsForPage,
	currentPage,
}) {
	return (
		<>
			<div className="mx-auto mb-4 mt-4">
				<Typography variant="h4" color="red">
					Danh sách đơn đặt phòng
				</Typography>
			</div>
			<div className="max-w-full px-3 rounded-lg mt-2 overflow-hidden">
				<div className="container px-6 mx-auto grid">
					<div className="w-full overflow-y-auto h-[360px]">
						<table className="w-full whitespace-no-wrap">
							<thead>
								<tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-2 bg-gray-50 ">
									<th className="px-4 py-3">Tên người dùng</th>
									<th className="px-4 py-3">Ngày nhận phòng</th>
									<th className="px-4 py-3">Ngày trả phòng</th>
									<th className="px-4 py-3">Tổng tiền</th>
									<th className="px-4 py-3">Trạng thái</th>
									<th className="px-4 py-3">Hoạt động</th>
								</tr>
							</thead>
							<tbody className="bg-gray-100 text-center">
								{getBookingsForPage(currentPage).map((item) => (
									<tr
										className="text-gray-700 dark:text-gray-400 border-2"
										key={item.booking_id}
									>
										<td className="px-4 py-3">
											<div className="flex items-center text-sm">
												<div>
													<p className="font-semibold">{item.name}</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-sm">
											{new Date(item.checkin).getDate()}/
											{new Date(item.checkin).getMonth() + 1}/
											{new Date(item.checkin).getFullYear()}
										</td>
										<td className="px-4 py-3 text-sm">
											{new Date(item.checkout).getDate()}/
											{new Date(item.checkout).getMonth() + 1}/
											{new Date(item.checkout).getFullYear()}
										</td>
										<td className="px-4 py-3 text-sm">
											{item.total.toLocaleString()} VNĐ
										</td>
										<td className="px-4 py-3 text-sm">{item.status}</td>
										<td className="px-4 py-3 ">
											<div className=" flex space-x-4 text-sm justify-center">
												<Link to={`/admin/edit-booking/${item.booking_id}`}>
													<Button
														variant="text"
														className="flex items-center justify-between px-2 py-2 leading-5 text-green-600 rounded-full"
													>
														<PencilSquareIcon className="w-5 h-5" />
													</Button>
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
