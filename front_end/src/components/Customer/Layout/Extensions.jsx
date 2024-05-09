import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export default function Extensions() {
	return (
		<>
			<div className="container">
				<Typography variant="h5" className="mb-4">
					Tiện nghi
				</Typography>
				<div className=" mx-auto overflow-hidden ">
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 gap-4  ">
						<li className="flex items-center space-x-2 border rounded-md px-3 py-2 shadow-lg">
							<CheckBadgeIcon className="h-5 w-5 text-green-400 " />
							<span>Apartments</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
