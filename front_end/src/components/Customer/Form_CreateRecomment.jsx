import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Typography,
	Textarea,
} from "@material-tailwind/react";
import { useState } from "react";

export function CreateRecomment({ recomment, handleChange, handleCreate }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	return (
		<div className="mb-4 mx-auto flex justify-center">
			<Button onClick={handleOpen} color="red" variant="gradient">
				Thêm đánh giá
			</Button>
			<Dialog open={open} handler={handleOpen} className=" w-[60%] h-auto ">
				<form>
					<DialogHeader className=" -mb-7">Thêm đánh giá</DialogHeader>
					<DialogBody>
						<div className="flex mx-auto ">
							<div className="mb-1 w-full p-4">
								<div>
									<Typography variant="h6" color="blue-gray" className="mb-2">
										Nội dung đánh giá
									</Typography>

									<Textarea
										type="text"
										size="lg"
										name="descriptions"
										value={recomment.descriptions}
										onChange={handleChange}
										placeholder="Enter  username..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									/>
								</div>
								<div>
									<Typography
										variant="h6"
										color="blue-gray"
										className="mb-2 mt-4"
									>
										Xếp hạng
									</Typography>

									<Input
										type="number"
										multiple
										size="lg"
										name="rating"
										value={recomment.rating}
										onChange={handleChange}
										placeholder="Enter Full name..."
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									/>
								</div>
							</div>
						</div>
					</DialogBody>
					<DialogFooter className="-mt-4">
						<Button
							variant="text"
							color="red"
							onClick={handleOpen}
							className="mr-1 bg-slate-300"
						>
							<span>Đóng</span>
						</Button>
						<Button
							variant="gradient"
							color="red"
							onClick={handleCreate}
							className=" bg-red-600"
						>
							<span>Thêm ngay</span>
						</Button>
					</DialogFooter>
				</form>
			</Dialog>
		</div>
	);
}
export default CreateRecomment;
