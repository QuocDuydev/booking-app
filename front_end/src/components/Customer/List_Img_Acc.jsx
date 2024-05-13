import { useEffect, useState } from "react";
import { getAccommodationdetail } from "../../api/acc_API";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function List_Img_Acc() {
	const { acc_id } = useParams();
	const [acc, setAcc] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const AccData = await getAccommodationdetail(acc_id);
				setAcc(AccData);
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [acc_id]);
	return (
		<div className=" max-w-screen-xl container mx-auto relative mt-8">
			<Link to={`/accommodations/${acc.acc_id}`}>
				<div className="flex ml-4">
					<ArrowUturnLeftIcon className="h-5 w-5 mr-3" />
					<Typography variant="h6">Quay lại</Typography>
				</div>
			</Link>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 m-3">
				{acc?.images?.map((image) => (
					<div
						key={image.id}
						className="grid gap-4 relative transform transition-transform  cursor-pointer"
					>
						<img
							src={image.image}
							// biome-ignore lint/a11y/noRedundantAlt: <explanation>
							alt={`Image ${image.id}`}
							className="w-full h-60"
							style={{ transition: "filter 0.3s ease" }}
							onMouseEnter={(e) =>
								// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
								(e.target.style.filter = "brightness(70%)")
							}
							onMouseLeave={(e) =>
								// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
								(e.target.style.filter = "brightness(100%)")
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
