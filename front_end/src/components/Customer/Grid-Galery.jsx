import React from "react";
import { Typography } from "@material-tailwind/react";

export function GridGallery() {
	return (
		<>
			<div className="container mx-auto relative max-w-screen-2xl px-3 py-3">
				<div className="container mx-auto relative max-w-screen-2xl px-3 py-3">
					<div className="mt-[40px] mb-4">
						<Typography variant="h4">Trending destinations</Typography>
						<Typography variant="h5" className=" font-normal">
							Most popular choices for travellers from Vietnam
						</Typography>
					</div>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-4">
						<div className="grid gap-4 relative transform transition-transform  cursor-pointer">
							<img
								className="h-auto w-full rounded-xl object-cover object-center "
								src="https://cf.bstatic.com/xdata/images/city/540x270/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o="
								alt="gallery-photo"
							/>
							<div className="absolute top-2 left-2 right-0 bottom-0 flex items-left">
								<p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-bold">
									Da Nang
								</p>
								<img
									className="h-4 w-6 mt-2 ml-2"
									src="https://th.bing.com/th/id/OIP.TuKIodlDSsomCsjyM3DTuQHaE7?rs=1&pid=ImgDetMain"
									alt="vietnam-icon"
								/>
							</div>
						</div>
						<div className="grid gap-4 relative  transform transition-transform  cursor-pointer">
							<img
								className="h-auto w-full rounded-xl object-cover object-center"
								src="https://cf.bstatic.com/xdata/images/city/540x270/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
								alt="gallery-photo"
							/>
							<div className="absolute top-2 left-2 right-0 bottom-0 flex items-left">
								<p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-bold">
									Ho Chi Minh City
								</p>
								<img
									className="h-4 w-6 mt-2 ml-2"
									src="https://th.bing.com/th/id/OIP.TuKIodlDSsomCsjyM3DTuQHaE7?rs=1&pid=ImgDetMain"
									alt="vietnam-icon"
								/>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4 md:grid-cols-3">
						<div className="relative  transform transition-transform  cursor-pointer">
							<img
								className=" h-[90px] 2xl:h-48 lg:h-48 md:48 sm:h-30 w-full rounded-xl object-cover object-center"
								src="https://dulich9.com/wp-content/uploads/2019/10/dia-diem-du-lich-63-tinh-thanh-14.jpg"
								alt="gallery-photo"
							/>
							<div className="absolute top-2 left-2 right-0 bottom-0 flex items-left">
								<p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-bold">
									Ha Noi
								</p>
								<img
									className="h-4 w-6 mt-2 ml-2"
									src="https://th.bing.com/th/id/OIP.TuKIodlDSsomCsjyM3DTuQHaE7?rs=1&pid=ImgDetMain"
									alt="vietnam-icon"
								/>
							</div>
						</div>

						<div className="relative  transform transition-transform  cursor-pointer">
							<img
								className="h-[90px]  2xl:h-48 lg:h-48 sm:h-30 w-full rounded-xl object-cover object-center"
								src="https://dulich9.com/wp-content/uploads/2019/10/cach-dia-diem-du-lich-ca-nuoc-9.jpg"
								alt="gallery-photo"
							/>
							<div className="absolute top-2 left-2 right-0 bottom-0 flex items-left">
								<p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-bold">
									Da Lat
								</p>
								<img
									className="h-4 w-6 mt-2 ml-2"
									src="https://th.bing.com/th/id/OIP.TuKIodlDSsomCsjyM3DTuQHaE7?rs=1&pid=ImgDetMain"
									alt="vietnam-icon"
								/>
							</div>
						</div>

						<div className="relative  transform transition-transform  cursor-pointer">
							<img
								className="h-[90px]  2xl:h-48 lg:h-48 md:38 sm:h-30 w-full rounded-xl object-cover object-center "
								src="https://dulich9.com/wp-content/uploads/2019/10/cach-dia-diem-du-lich-ca-nuoc-3.jpg"
								alt="gallery-photo"
							/>
							<div className="absolute top-2 left-2 right-0 bottom-0 flex items-left">
								<p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-bold">
									Khanh Hoa
								</p>
								<img
									className="h-4 w-6 mt-2 ml-2"
									src="https://th.bing.com/th/id/OIP.TuKIodlDSsomCsjyM3DTuQHaE7?rs=1&pid=ImgDetMain"
									alt="vietnam-icon"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default GridGallery;
