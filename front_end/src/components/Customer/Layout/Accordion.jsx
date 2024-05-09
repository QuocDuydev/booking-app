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

function AccordionCustomIcon() {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<>
			<div className="container mx-auto relative max-w-screen-2xl px-5 py-5">
				<h3 className=" mt-[40px] text-2xl font-bold mb-2">
					How does it work?
				</h3>

				<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
					<AccordionHeader onClick={() => handleOpen(1)} className=" text-md">
						Getting your key
					</AccordionHeader>
					<AccordionBody>
						You’ll be able to communicate directly with your host to find out
						how to get your keys. Whether you meet them personally or simply use
						a lockbox, it’ll be easy for you to access your property and start
						enjoying your holiday!
					</AccordionBody>
				</Accordion>
				<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
					<AccordionHeader onClick={() => handleOpen(2)} className=" text-md">
						Communicating with your host
					</AccordionHeader>
					<AccordionBody>
						You can always contact your host with any questions leading up to
						your trip. Perhaps you want to let them know what time you’re
						arriving or you have a special request – enjoy stress-free
						communication at all times.
					</AccordionBody>
				</Accordion>
				<Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
					<AccordionHeader onClick={() => handleOpen(3)} className=" text-md">
						Checking in
					</AccordionHeader>
					<AccordionBody>
						Maybe you’ve always stayed in hotels and you’re not sure how to
						‘check-in’ to an apartment or holiday home. Don’t worry, other
						guests have felt the same! That’s why hosts provide all the
						information you need to get you settled in.
					</AccordionBody>
				</Accordion>
			</div>
		</>
	);
}
export default AccordionCustomIcon;
