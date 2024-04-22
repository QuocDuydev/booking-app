import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ handlePageChange, totalPages }) {
	const [active, setActive] = useState(1);

	const prev = () => {
		if (active > 1) {
			setActive(active - 1); // Giảm trang hiện tại khi bấm "Previous"
			handlePageChange(active - 1); // Chuyển đến trang trước đó
		}
	};

	const next = () => {
		if (active < totalPages) {
			setActive(active + 1); // Tăng trang hiện tại khi bấm "Next"
			handlePageChange(active + 1); // Chuyển đến trang tiếp theo
		}
	};

	return (
		<div className="flex items-center gap-4 mt-4 mx-auto">
			<Button
				variant="text"
				className="flex items-center gap-2"
				onClick={prev}
				disabled={active === 1}
			>
				<ArrowLeftIcon strokeWidth={1} className="h-4 w-4" /> Previous
			</Button>
			{[...Array(totalPages)].map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div className="flex items-center gap-2" key={index + 1}>
					<IconButton
						onClick={() => handlePageChange(index + 1)}
						className={index + 1 === active ? "bg-gray-500" : ""}
					>
						{index + 1}
					</IconButton>
				</div>
			))}
			<Button
				variant="text"
				className="flex items-center gap-2"
				onClick={next}
				disabled={active === totalPages}
			>
				Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
}
export default Pagination;
