import React from "react";
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={`${
				id === open ? "rotate-180" : ""
			} h-5 w-5 transition-transform`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 8.25l-7.5 7.5-7.5-7.5"
			/>
		</svg>
	);
}

export default function AccordionCustomIcon() {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<>
			<div className="container mx-auto relative max-w-screen-2xl px-5 py-5">
				<h3 className=" mt-[40px] text-2xl font-bold mb-2">
					Làm thế nào nó hoạt động?
				</h3>

				<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
					<AccordionHeader onClick={() => handleOpen(1)} className=" text-md">
						Liên hệ đặt phòng
					</AccordionHeader>
					<AccordionBody>
						Bạn sẽ có thể liên lạc trực tiếp với chủ nhà để tìm hiểu cách đặt
						phòng. Cho dù bạn gặp họ trực tiếp hay chỉ đơn giản là sử dụng dịch
						vụ đặt online, bạn sẽ dễ dàng truy cập vào nơi lưu trú của mình và
						bắt đầu tận hưởng kỳ nghỉ của mình!
					</AccordionBody>
				</Accordion>
				<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
					<AccordionHeader onClick={() => handleOpen(2)} className=" text-md">
						Giao tiếp với chủ nhà của bạn
					</AccordionHeader>
					<AccordionBody>
						Bạn luôn có thể liên hệ với chủ nhà nếu có bất kỳ câu hỏi nào trước
						chuyến đi của mình. Có lẽ bạn muốn cho họ biết thời gian bạn đến
						hoặc bạn có yêu cầu đặc biệt – luôn tận hưởng cuộc trò chuyện thoải
						mái.
					</AccordionBody>
				</Accordion>
				<Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
					<AccordionHeader onClick={() => handleOpen(3)} className=" text-md">
						Đăng ký nó
					</AccordionHeader>
					<AccordionBody>
						Có thể bạn luôn ở trong khách sạn và không biết cách 'nhận phòng'
						tại một căn hộ hoặc nhà nghỉ mát. Đừng lo lắng, những vị khách khác
						cũng cảm thấy như vậy! Đó là lý do tại sao chủ nhà cung cấp tất cả
						thông tin bạn cần để giúp bạn ổn định cuộc sống.
					</AccordionBody>
				</Accordion>
			</div>
		</>
	);
}
