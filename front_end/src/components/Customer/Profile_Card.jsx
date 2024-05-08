import { useState } from "react";
import {
	Button,
	Select,
	Option,
	Input,
	Typography,
} from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/solid";
function ProfileCard({
	user,
	handleChange,
	handleUpdate,
	handleSelectSexChange,
	handleFileChange,
	handleUpdateImg,
	selectedImageUrl,
}) {
	return (
		<div>
			<section className="py-2 my-auto dark:bg-gray-900">
				<div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
					<div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
						<div className="">
							<h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold dark:text-white">
								Hồ sơ cá nhân
							</h1>

							<form>
								<div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center">
									<div
										className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
										style={{
											backgroundImage: `url(${
												selectedImageUrl || user.images
											})`,
										}}
									>
										<div className="bg-white/90 rounded-full w-7 h-7 text-center ml-28 mt-4">
											<input
												type="file"
												name="images"
												id="upload_profile"
												hidden
												required=""
												onChange={handleFileChange}
											/>
											<label htmlFor="upload_profile">
												<CameraIcon className="h-5 w-5 mt-1 ml-1" />
											</label>
										</div>
									</div>
								</div>
								<div>
									<Button
										size="sm"
										className="mx-auto flex justify-center cursor-pointer font-bold mt-2"
										onClick={handleUpdateImg}
									>
										Cập nhật Avatar
									</Button>
								</div>

								<div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
									<div className="w-full  mb-4 mt-2">
										<div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full mb-4">
											<div className="w-full">
												<Typography className="mb-2 text-red-600 font-bold">
													Tên người dùng
												</Typography>
												<Input
													onChange={handleChange}
													name="name"
													value={user.name}
													type="text"
													placeholder="Tên người dùng ..."
												/>
											</div>
											<div className="w-full">
												<Typography className=" text-red-600 font-bold mb-2">
													Địa chỉ Email
												</Typography>
												<Input
													onChange={handleChange}
													name="email"
													value={user.email}
													type="text"
													placeholder="Địa chỉ Email..."
												/>
											</div>
										</div>
										<div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full mb-4">
											<div className="w-full">
												<Typography
													htmlFor=""
													className=" text-red-600 font-bold mb-2"
												>
													Số điện thoại
												</Typography>
												<Input
													onChange={handleChange}
													name="number"
													value={user.phone}
													type="number"
													placeholder="Số điện thoại ..."
												/>
											</div>
											<div className="w-full">
												<Typography className=" text-red-600 font-bold mb-2">
													Địa chỉ nhà
												</Typography>
												<Input
													onChange={handleChange}
													name="address"
													value={user.address}
													type="text"
													placeholder="Địa chỉ nhà..."
												/>
											</div>
										</div>
										<div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
											<div className="w-full">
												<Typography className=" mb-2 text-red-600 font-bold">
													Giới tính
												</Typography>

												<Select
													name="account_type"
													value={user?.sex_type || ""}
													onChange={handleSelectSexChange}
													className="text-sm md:text-md lg:text-md xl:text-md"
												>
													<Option value="male">Nam</Option>
													<Option value="female">Nữ</Option>
												</Select>
											</div>
											<div className="w-full">
												<Typography className=" mb-2 text-red-600 font-bold">
													Tên tài khoản
												</Typography>
												<Input
													onChange={handleChange}
													name="address"
													disabled
													value={user.username}
													type="text"
													placeholder="Địa chỉ nhà..."
												/>
											</div>

											<div className="w-full rounded-lg  text-white">
												<Button
													onClick={handleUpdate}
													color="blue"
													size="sm"
													className="w-full p-4 mx-auto mt-6 text-md"
												>
													Cập nhật thông tin
												</Button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
export default ProfileCard;
