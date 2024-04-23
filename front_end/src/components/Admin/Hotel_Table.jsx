import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { ListBulletIcon } from "@heroicons/react/24/solid";
function HotelTable({ handleDelete, getHotelsForPage, currentPage }) {
	return (
		<>
			<div className=" mx-auto mb-4 mt-4">
				<Typography variant="h4" color="red">
					List Hotels
				</Typography>
			</div>
			<div className="max-w-full px-3 rounded-lg mt-2 overflow-hidden">
				<div className="container px-6 mx-auto grid">
					<div className="w-full overflow-y-auto h-[360px]">
						<table className="w-full whitespace-no-wrap">
							<thead>
								<tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-2">
									<th className="px-4 py-3">Rooms</th>
									<th className="px-4 py-3">Name</th>
									<th className="px-4 py-3">Location</th>
									<th className="px-4 py-3">Total Rooms</th>
									<th className="px-4 py-3">Date Added</th>
									<th className="px-4 py-3">Actions</th>
								</tr>
							</thead>
							<tbody className="bg-gray-100 text-center">
								{getHotelsForPage(currentPage).map((item) => (
									<tr
										className="text-gray-700 dark:text-gray-400 border-2"
										key={item.hotel_id}
									>
										<td className="px-4 py-3 flex justify-center">
											<Link to={`/admin/${item.hotel_id}/list-rooms/`}>
												{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
												<button>
													<ListBulletIcon className="h-5 w-5 text-black mt-2" />
												</button>
											</Link>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center text-sm">
												<div>
													<p className="font-semibold">{item.hotelname}</p>

													{/* <img src={item.hotelimage} /> */}
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-sm">{item.location}</td>
										<td className="px-4 py-3 text-xs">
											<span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
												{item.totalroom} - rooms
											</span>
										</td>
										<td className="px-4 py-3 text-sm">{item.dateadded}</td>
										<td className="px-4 py-3 ">
											<div className=" flex space-x-4 text-sm justify-center">
												<Link to={`/admin/edit-hotel/${item.hotel_id}`}>
													{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
													<button
														className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
														aria-label="Edit"
													>
														<svg
															className="w-5 h-5"
															aria-hidden="true"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
														</svg>
													</button>
												</Link>

												{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
												<button
													onClick={() => handleDelete(item)}
													className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
													aria-label="Delete"
												>
													<svg
														className="w-5 h-5"
														aria-hidden="true"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
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
export default HotelTable;
