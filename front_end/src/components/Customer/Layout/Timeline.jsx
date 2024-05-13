import {
	ArrowRightEndOnRectangleIcon,
	ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
	MoonIcon,
	QuestionMarkCircleIcon,
	UserGroupIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineBody,
	Typography,
} from "@material-tailwind/react";

export function DefaultTimeline() {
	return (
		<>
			<div className="container mx-auto relative max-w-screen-2xl px-5 py-5">
				<div className="mb-4 mt-4">
					<Typography variant="h4">Quy định của chỗ ở</Typography>
				</div>
				<div className=" container p-4">
					<Timeline>
						<TimelineItem>
							<TimelineConnector />
							<TimelineHeader className="">
								<ArrowRightEndOnRectangleIcon className="h-6 w-6" />
								<Typography
									variant="h6"
									color="blue-gray"
									className="leading-none"
								>
									Nhận phòng
								</Typography>
							</TimelineHeader>
							<TimelineBody className="pb-4 ml-8">
								<Typography
									variant="small"
									color="gray"
									className="font-normal text-gray-600"
								>
									- Từ 15:00 đến 00:00
									<br />- Du khách phải xuất trình giấy tờ tùy thân có ảnh và
									thẻ tín dụng khi nhận phòng
									<br />- Bạn cần phải cho chỗ nghỉ biết trước thời gian bạn sẽ
									đến.
								</Typography>
							</TimelineBody>
						</TimelineItem>
						<TimelineItem>
							<TimelineConnector />
							<TimelineHeader className="">
								<ArrowRightStartOnRectangleIcon className="h-6 w-6" />
								<Typography
									variant="h6"
									color="blue-gray"
									className="leading-none"
								>
									Trả phòng
								</Typography>
							</TimelineHeader>
							<TimelineBody className="pb-4 ml-8">
								<Typography
									variant="small"
									color="gray"
									className="font-normal text-gray-600"
								>
									- Từ 01:00 đến 10:00
								</Typography>
							</TimelineBody>
						</TimelineItem>
						<TimelineItem>
							<TimelineHeader className="">
								<QuestionMarkCircleIcon className="h-6 w-6" />
								<Typography
									variant="h6"
									color="blue-gray"
									className="leading-none"
								>
									Hủy/trả trước
								</Typography>
							</TimelineHeader>
							<TimelineBody className="pb-4 ml-8">
								<Typography
									variant="small"
									color="gray"
									className="font-normal text-gray-600"
								>
									- Chính sách hủy và thanh toán trước khác nhau tùy theo loại
									căn hộ. Vui lòng nhập ngày lưu trú của bạn và kiểm tra các
									điều kiện của phòng bạn yêu cầu.
								</Typography>
							</TimelineBody>
						</TimelineItem>
						<TimelineItem>
							<TimelineHeader className="">
								<UserGroupIcon className="h-6 w-6" />
								<Typography
									variant="h6"
									color="blue-gray"
									className="leading-none"
								>
									Chính sách trẻ em
								</Typography>
							</TimelineHeader>
							<TimelineBody className="pb-4 ml-8">
								<Typography
									variant="small"
									color="gray"
									className="font-normal text-gray-600"
								>
									- Trẻ em ở mọi lứa tuổi đều được chào đón.
									<br />- Trẻ em từ 4 tuổi trở lên sẽ được tính phí như người
									lớn tại nơi lưu trú này.
									<br />- Để xem thông tin về giá và số lượng phòng chính xác,
									vui lòng thêm số lượng trẻ em trong nhóm của bạn và độ tuổi
									của chúng vào tìm kiếm của bạn
								</Typography>
							</TimelineBody>
						</TimelineItem>
						<TimelineItem>
							<TimelineHeader className="">
								<UserIcon className="h-6 w-6" />
								<Typography
									variant="h6"
									color="blue-gray"
									className="leading-none"
								>
									Giới hạn độ tuổi
								</Typography>
							</TimelineHeader>
							<TimelineBody className="pb-4 ml-8">
								<Typography
									variant="small"
									color="gray"
									className="font-normal text-gray-600"
								>
									- Độ tuổi tối thiểu để nhận phòng là 18.
								</Typography>
							</TimelineBody>
						</TimelineItem>
						<TimelineItem>
							<TimelineHeader className="">
								<MoonIcon className="h-6 w-6" />
								<Typography
									variant="h6"
									color="blue-gray"
									className="leading-none"
								>
									Giờ yên tĩnh
								</Typography>
							</TimelineHeader>
							<TimelineBody className="pb-4 ml-8">
								<Typography
									variant="small"
									color="gray"
									className="font-normal text-gray-600"
								>
									- Du khách phải giữ im lặng trong khoảng thời gian từ 22:00
									đến 06:00.
								</Typography>
							</TimelineBody>
						</TimelineItem>
					</Timeline>
				</div>
			</div>
		</>
	);
}
