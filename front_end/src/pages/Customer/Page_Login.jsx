import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Login() {
	const { loginUser } = useContext(AuthContext);

	return (
		<div className="bg-gradient-to-r from-purple-300 to-blue-200">
			<div className="w-full mx-auto min-h-screen flex items-center justify-center p-3 rounded-lg">
				<form
					onSubmit={loginUser}
					className="w-full bg-white shadow overflow-hidden rounded-xl px-6 py-4 lg:w-[50%] md:w-[70%] sm:w-[50%]"
				>
					<div className="w-full">
						<h3 className="mb-2 text-4xl font-extrabold text-red-500 text-center">
							Đăng nhập
						</h3>
						<p className="mb-4 italic text-center text-black">
							Chào mừng bạn đến với TimphongQD
						</p>

						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
								Tài khoản
							</label>
							<input
								type="username"
								name="username"
								className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
								placeholder="Nhập tên tài khoản ..."
							/>
						</div>

						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
								Mật khẩu
							</label>
							<input
								type="password"
								name="password"
								className="form-input w-full px-4 py-2 border rounded-lg text-gray-700"
								placeholder="Nhập mật khẩu ..."
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-500 font-semibold text-white px-4 mb-4 py-2 rounded-lg uppercase"
						>
							Đăng nhập
						</button>
						<div className="flex ">
							<a
								// biome-ignore lint/a11y/useValidAnchor: <explanation>
								href=""
								className="text-sm text-left font-semibold mx-auto text-blue-500"
							>
								Quên mật khẩu?
							</a>
							<p className="text-sm mx-auto text-right font-semibold">
								{" "}
								Bạn chưa có tài khoản?{" "}
								<Link
									to={"/register"}
									className="text-sm text-right font-semibold text-red-500"
								>
									{" "}
									Đăng ký
								</Link>{" "}
								ngay!
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Login;
