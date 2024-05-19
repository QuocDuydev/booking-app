import React from "react";
import { Link } from "react-router-dom";
import {
	ListBulletIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
export default function AccommodationTable({
	handleDelete,
	getAccsForPage,
	currentPage,
}) {
	return (
		<>
			<div className="max-w-full px-3 rounded-lg mt-2 overflow-hidden">
				<div className="container px-6 mx-auto grid">
					<div className="w-full overflow-y-auto h-[360px]">
						<table className="w-full whitespace-no-wrap">
							<thead>
								<tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-2">
									<th className="px-4 py-3">DS Phòng</th>
									<th className="px-4 py-3">Tên chỗ ở</th>
									<th className="px-4 py-3">Vị trí</th>
									<th className="px-4 py-3">Tổng số phòng</th>
									<th className="px-4 py-3">Ngày cập nhật</th>
									<th className="px-4 py-3">Hành động</th>
								</tr>
							</thead>
							<tbody className="bg-gray-100 text-center">
								{getAccsForPage(currentPage).map((item) => (
									<tr
										className="text-gray-700 dark:text-gray-400 border-2"
										key={item.acc_id}
									>
										<td className="px-4 py-3 flex justify-center">
											<Link to={`/admin/${item.acc_id}/list-rooms/`}>
												{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
												<button>
													<ListBulletIcon className="h-5 w-5 text-black mt-2" />
												</button>
											</Link>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center text-sm">
												<div>
													<p className="font-semibold">{item.accname}</p>

													{/* <img src={item.hotelimage} /> */}
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-sm">{item.location}</td>
										<td className="px-4 py-3 text-xs">
											<span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
												{item.totalroom} - phòng
											</span>
										</td>
										<td className="px-4 py-3 text-sm">
											{new Date(item.updatedAt).getDate()}/
											{new Date(item.updatedAt).getMonth() + 1}/
											{new Date(item.updatedAt).getFullYear()} -{" "}
											{new Date(item.updatedAt).getHours()}:
											{new Date(item.updatedAt).getMinutes()}:
											{new Date(item.updatedAt).getSeconds()}
										</td>
										<td className="px-4 py-3 ">
											<div className=" flex space-x-4 text-sm justify-center">
												<Link to={`/admin/edit-hotel/${item.acc_id}`}>
													<Button
														variant="text"
														className="flex items-center justify-between px-2 py-2 leading-5 text-green-600 rounded-full"
													>
														<PencilSquareIcon className="w-5 h-5" />
													</Button>
												</Link>
												<Button
													onClick={() => handleDelete(item.acc_id)}
													variant="text"
													className="flex items-center justify-between px-2 py-2 leading-5 text-red-600 rounded-full"
												>
													<TrashIcon className="w-5 h-5" />
												</Button>
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
