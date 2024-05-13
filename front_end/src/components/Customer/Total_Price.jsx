import { useState, useEffect } from "react";

function TotalPrice({ checkin, checkout, rooms }) {
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const calculateTotalPrice = () => {
			if (checkin && checkout && rooms) {
				if (!checkin || !checkout) return 0;
				const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
				const numberOfDays = Math.round(
					Math.abs((new Date(checkout) - new Date(checkin)) / oneDay),
				);
				const pricePerNight = rooms
					.map((room) => room.roomprice)
					.reduce((acc, curr) => acc + curr, 0);
				const totalPrice = numberOfDays * pricePerNight;
				return totalPrice;
			}
			return 0;
		};

		const totalPrice = calculateTotalPrice();
		setTotalPrice(totalPrice);
	}, [checkin, checkout, rooms]);

	return (
		<div className="text-center">{`${totalPrice.toLocaleString()} VND`}</div>
	);
}

export default TotalPrice;
