import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@material-tailwind/react";

const images = [
	{
		src: "https://dulich9.com/wp-content/uploads/2019/10/cac-dia-diem-du-lich-63-tinh-thanh-Viet-Nam-3.jpg",

		text: "Your Luxury Hotel For Vacation",
	},
	{
		src: "https://dulich9.com/wp-content/uploads/2019/10/cac-dia-diem-du-lich-63-tinh-thanh-Viet-Nam-8.jpg",

		text: "Hotel with reasonable price",
	},
	{
		src: "https://dulich9.com/wp-content/uploads/2019/10/dia-diem-du-lich-63-tinh-thanh-14.jpeg",

		text: "Great Vacation Experience",
	},
];

function CarouselDefault() {
	const [activeIndex, setActiveIndex] = useState(0);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		beforeChange: (current, next) => setActiveIndex(next),
	};

	return (
		<div className=" h-96 relative overflow-hidden">
			<Slider {...settings}>
				{images.map((image, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="relative">
						<img
							src={image.src}
							// biome-ignore lint/a11y/noRedundantAlt: <explanation>
							alt={`image ${index + 1}`}
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 flex flex-col  items-center bg-black/50">
							<h3 className="text-white text-2xl mt-5">
								{" "}
								Wellcome to Website Booking{" "}
							</h3>
							<h1 className="text-white text-4xl font-bold  m-10">
								{image.text}
							</h1>
							<Button className=" bg-white text-black font-bold hover:bg-gray-500 hover:text-white">
								See Rooms Nows
							</Button>
						</div>
					</div>
				))}
			</Slider>
			<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
				{images.map((_, i) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
							activeIndex === i ? "w-8 bg-gray-200" : "w-4 bg-white/50"
						}`}
						onClick={() => setActiveIndex(i)}
					/>
				))}
			</div>
		</div>
	);
}

export default CarouselDefault;
