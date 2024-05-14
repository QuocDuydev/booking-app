import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const SITEMAP = [
	{
		title: "Về Timtro.top",
		links: ["Cách đặt chỗ ở", "Liên hệ chúng tôi", "Trợ giúp", "Về chúng tôi"],
	},
	{
		title: "Theo dõi chúng tôi trên",
		links: ["Facebook", "Twitter", "Instagram", "Youtube"],
	},
	{
		title: "Sản phẩm",
		links: ["Nhà trọ", "Khách sạn", "HomeStay", "Khác"],
	},
	{
		title: "Mục khác",
		links: [
			"Chính Sách Quyền Riêng",
			"Điều khoản & Điều kiện",
			"Quy chế hoạt động",
			"Đăng ký nơi nghỉ của bạn",
		],
	},
];

export function FooterWithSitemap() {
	return (
		<footer className="relative w-full">
			<div className="flex justify-center mx-auto m-2">
				<Link to="https://forms.gle/3XNfhFBKnfCFbTtC9">
					<Button>Đánh giá trang web tại đây !!</Button>
				</Link>
			</div>
			<div className="mx-auto w-full max-w-7xl px-8 text-center">
				<div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
					{SITEMAP.map(({ title, links }, key) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={key} className="w-full">
							<Typography
								variant="small"
								color="blue-gray"
								className="mb-4 font-bold uppercase opacity-50"
							>
								{title}
							</Typography>
							<ul className="space-y-1">
								{links.map((link, key) => (
									<Typography
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={key}
										as="li"
										color="blue-gray"
										className="font-normal"
									>
										<a
											// biome-ignore lint/a11y/useValidAnchor: <explanation>
											href="#"
											className="inline-block p-1 transition-transform hover:scale-105"
										>
											{link}
										</a>
									</Typography>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
export default FooterWithSitemap;
