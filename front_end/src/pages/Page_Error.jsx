import React from "react";
import { Link } from "react-router-dom";

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error() {
	return (
		<div className="bg-gradient-to-r from-purple-300 to-blue-200">
			<div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
				<div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
					<div className="border-t border-gray-200 text-center pt-8">
						<h1 className="text-9xl font-bold text-purple-400">404</h1>
						<h1 className="text-6xl font-medium py-8">
							Không tìm thấy trang !!
						</h1>
						<p className="text-2xl pb-8 px-12 font-medium">
							Trang bạn đang tìm kiếm không tồn tại. Nó có thể có đã được di
							chuyển hoặc bị xóa.
						</p>
						<Link to="/">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
								Trang chủ
							</button>
						</Link>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
							Liên hệ ngay!!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
