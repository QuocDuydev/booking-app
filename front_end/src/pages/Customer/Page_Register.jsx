import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../../api/user_API";
import useAccessToken from "../../components/ultiti";

function Registers() {
	const [activeItem, setActiveItem] = useState({
		username: "",
		email: "",
		password: "",
		repassword: "",
	});
	const token = useAccessToken();
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [errorMessages, setErrorMessages] = useState({});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setActiveItem({ ...activeItem, [name]: value });
		setPasswordsMatch({ ...passwordsMatch, [name]: "" });
	};

	const checkEmailExists = async (email) => {
		// const userDetailsResponse = await fetch(
		//     "http://localhost:8000/api/users/",
		//     {
		//         method: "GET",
		//         headers: {
		//             "Content-Type": "application/json",
		//             Authorization: `Bearer ${String(token)}`,
		//         },
		//     },
		// );
		// return false;
	};

	const checkUsernameExists = async (username) => {
		// try {
		//     const userDetailsResponse = await fetch(
		//         `http://localhost:8000/api/users/?username=${username}`,
		//         {
		//             method: "GET",
		//             headers: {
		//                 "Content-Type": "application/json",
		//                 Authorization: `Bearer ${String(token)}`,
		//             },
		//         },
		//     );
		//     const userDetails = await userDetailsResponse.json();
		//     return userDetails.length > 0;
		// } catch (error) {
		//     console.error("Error checking username:", error);
		//     return false;
		// }
	};

	const handleCreate = async () => {
		if (activeItem.password !== activeItem.repassword) {
			// Mật khẩu không khớp nhau, hiển thị thông báo lỗi
			setPasswordsMatch(false);
			return;
		}

		try {
			// Tạo người dùng mới
			await postUser(
				activeItem.username,
				activeItem.email,
				activeItem.password,
			);

			// Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
			alert("Đăng ký tài khoản thành công!");
			setActiveItem({
				username: "",
				email: "",
				password: "",
				repassword: "",
			});
			navigate("/login");
		} catch (error) {
			if (error.response?.data) {
				// Xử lý lỗi từ Django validation
				const { data } = error.response;
				setErrorMessages(data);
			} else {
				console.error("Error create user failed:", error);
			}
		}
	};

	return (
		<div className="bg-gradient-to-r from-purple-300 to-blue-200">
			<div className="w-full mx-auto min-h-screen flex items-center justify-center p-3">
				<div className="w-full bg-white shadow overflow-hidden rounded-xl px-6 py-4 lg:w-[50%] md:w-[70%] sm:w-[50%]">
					<div className="w-full">
						<h3 className="mb-2 text-4xl font-extrabold text-red-500 text-center">
							Đăng ký tài khoản
						</h3>
						<p className="mb-4 italic text-black text-center">
							Chào mừng bạn đến với TimphongQD
						</p>

						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
								Tài khoản
							</label>
							<input
								type="text"
								name="username"
								value={activeItem.username}
								onChange={handleChange}
								className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
								placeholder="Nhập tên tài khoản ..."
							/>
							{errorMessages.username && (
								<p className="text-red-500">{errorMessages.username}</p>
							)}
						</div>

						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={activeItem.email}
								onChange={handleChange}
								className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 "
								placeholder="Nhập địa chỉ Email ..."
							/>
							{errorMessages.email && (
								<p className="text-red-500">{errorMessages.email}</p>
							)}
						</div>
						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
								Mật khẩu
							</label>
							<input
								type="password"
								name="password"
								value={activeItem.password}
								onChange={handleChange}
								className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 "
								placeholder="Nhập mật khẩu ..."
							/>
							{errorMessages.password && (
								<p className="text-red-500">{errorMessages.password}</p>
							)}
						</div>
						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
								Nhập lại mật khẩu
							</label>
							<input
								type="password"
								name="repassword"
								value={activeItem.repassword}
								onChange={handleChange}
								className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 "
								placeholder="Nhập lại mật khẩu lần nữa ..."
							/>
							{errorMessages.repassword && (
								<p className="text-red-500">{errorMessages.repassword}</p>
							)}
						</div>

						{!passwordsMatch && (
							<p className="text-red-500 mb-3">
								Mật khẩu không trùng khớp. Vui lòng nhập lại!
							</p>
						)}
						<button
							type="button"
							onClick={handleCreate}
							className="w-full bg-blue-500 text-white px-4 mb-4 py-2 rounded-lg uppercase"
						>
							Đăng kí
						</button>
						<div className="flex ">
							<p className="text-sm mx-auto text-right font-semibold">
								{" "}
								Bạn đã có tài khoản?{" "}
								<Link
									to={"/login"}
									className="text-sm text-right font-semibold text-red-500"
								>
									{" "}
									Đăng nhập
								</Link>{" "}
								ngay!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Registers;
