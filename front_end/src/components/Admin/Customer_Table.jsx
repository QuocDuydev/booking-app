import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function CustomerTable({
	handleDelete,
	getUsersForPage,
	currentPage,
}) {
	return (
		<>
			<div className=" mx-auto mb-4 mt-4">
				<Typography variant="h4" color="red">
					Danh sách người dùng
				</Typography>
			</div>
			<div className="max-w-full px-3 rounded-lg mt-2 overflow-hidden">
				<div className="container px-6 mx-auto grid">
					<div className="w-full overflow-y-auto h-[360px]">
						<table className="w-full whitespace-no-wrap">
							<thead>
								<tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-2 bg-gray-50">
									<th className="px-4 py-3">Họ và tên</th>
									<th className="px-4 py-3">Tên tài khoản</th>
									<th className="px-4 py-3">Email</th>
									<th className="px-4 py-3">Loại tài khoản</th>
									<th className="px-4 py-3">Hành động</th>
								</tr>
							</thead>
							<tbody className="bg-gray-100">
								{getUsersForPage(currentPage).map((item) => (
									<tr
										className="text-gray-700 text-center border-2"
										key={item.id}
									>
										<td className="px-4 py-3">
											<div className="flex items-center text-sm">
												<div>
													<p className="font-semibold">{item.name}</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-sm">{item.username}</td>
										<td className="px-4 py-3 text-sm">{item.email}</td>

										<td className="px-4 py-3 text-sm">{item.account_type}</td>
										<td className="px-4 py-3 ">
											<div className=" flex space-x-4 text-sm justify-center">
												<Link to={`/admin/edit-customer/${item.id}`}>
													<Button
														variant="text"
														className="flex items-center justify-between px-2 py-2 leading-5 text-green-600 rounded-full"
													>
														<PencilSquareIcon className="w-5 h-5" />
													</Button>
												</Link>
												<Button
													onClick={() => handleDelete(item)}
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
