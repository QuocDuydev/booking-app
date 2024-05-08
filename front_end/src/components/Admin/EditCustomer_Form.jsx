import {
	Card,
	Input,
	Button,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";

export default function EditCustomerForm({
	user,
	handleChange,
	handleSelectSexChange,
	handleUpdate,
	handleSelectAccChange,
}) {
	return (
		<>
			<div className=" mx-auto mt-4">
				<Typography variant="h4" color="red">
					Chỉnh sửa thông tin
				</Typography>
			</div>
			<div className=" max-w-full px-3 rounded-lg mt-2">
				<Card color="transparent" shadow={false}>
					<form>
						<div className="flex mx-auto ">
							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Họ và tên
									</Typography>

									<Input
										type="text"
										multiple
										size="lg"
										name="name"
										value={user.name}
										onChange={handleChange}
										placeholder="Nhập họ và tên..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Số điện thoại
									</Typography>

									<Input
										type="phone"
										size="lg"
										name="phone"
										value={user.phone}
										onChange={handleChange}
										placeholder="Nhập số điện thoại..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Giới tính
									</Typography>
									<Select
										name="sex_type"
										size="lg"
										value={user?.sex_type || ""}
										onChange={handleSelectSexChange}
										className="text-sm md:text-md lg:text-lg xl:text-lg"
									>
										<Option value="male">Nam</Option>
										<Option value="female">Nữ</Option>
									</Select>
								</div>
							</div>
							<div className="mb-1 w-1/2 p-4">
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2  text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Địa chỉ Email
									</Typography>

									<Input
										type="email"
										multiple
										size="lg"
										name="email"
										value={user.email}
										onChange={handleChange}
										placeholder="Nhập địa chỉ Email..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Địa chỉ
									</Typography>

									<Input
										type="text"
										multiple
										size="lg"
										name="address"
										value={user.address}
										onChange={handleChange}
										placeholder="Nhập địa chỉ..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-sm md:text-md lg:text-lg xl:text-lg"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4 text-sm md:text-md lg:text-lg xl:text-lg"
									>
										Loại tài khoản
									</Typography>
									<Select
										name="account_type"
										size="lg"
										value={user?.account_type || ""}
										onChange={handleSelectAccChange}
										className="text-sm md:text-md lg:text-lg xl:text-lg"
									>
										<Option value="user">Người dùng</Option>
										<Option value="admin">Quản trị viên</Option>
										<Option value="superadmin">Quản trị viên cấp cao</Option>
									</Select>
								</div>
							</div>
						</div>
						<Button
							size="lg"
							onClick={handleUpdate}
							className="mx-auto w-2/4 bg-red-600 uppercase mt-5 "
							fullWidth
						>
							Cập nhật ngay!
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
}
