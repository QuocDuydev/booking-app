import { ArrowUpIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 460) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{isVisible && (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					onClick={scrollToTop}
					className="p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-800 transition duration-300"
				>
					<ArrowUpIcon className="h-6 w-6" />
				</button>
			)}
		</div>
	);
}
