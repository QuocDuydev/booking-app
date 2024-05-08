import { Typography } from "@material-tailwind/react";

const SITEMAP = [
	{
		title: "Company",
		links: ["About Us", "Careers", "Our Team", "Projects"],
	},
	{
		title: "Help Center",
		links: ["Discord", "Twitter", "GitHub", "Contact Us"],
	},
	{
		title: "Resources",
		links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
	},
	{
		title: "Products",
		links: ["Templates", "UI Kits", "Icons", "Mockups"],
	},
];

export function FooterWithSitemap() {
	return (
		<footer className="relative w-full">
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
											className="inline-block py-1 pr-2 transition-transform hover:scale-105"
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
