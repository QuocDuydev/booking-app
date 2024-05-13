import React from "react";

const MapAcc = ({ roommap }) => {
	const mapStyle = {
		width: "100%",
		height: "100%",
		border: "0",
		marginHeight: "0",
		marginWidth: "0",
		filter: "grayscale(1) contrast(1.2) opacity(0.7)",
	};

	const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
		roommap,
	)}&output=embed`;

	return (
		<div className="container mx-auto relative max-w-screen-xl h-[500px] p-3 border border-solid border-gray-400 rounded-lg ">
			<iframe
				width="100%"
				height="100%"
				title="map"
				src={mapUrl}
				style={mapStyle}
			/>
		</div>
	);
};

export default MapAcc;
