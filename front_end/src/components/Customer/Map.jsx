import { Typography } from "@material-tailwind/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapAcc() {
	return (
		<div className="bg-red-200">
			<Typography>Vị trí chỗ ở</Typography>
			<LoadScript
				googleMapsApiKey="AIzaSyCtlS0msBiN-2gfqFwfJtm605w2LX5YX6M"
				loading="async"
			>
				<GoogleMap zoom={17} center={{ lat: 10.7769, lng: 106.7009 }}>
					<Marker position={{ lat: 10.7769, lng: 106.7009 }} />
				</GoogleMap>
			</LoadScript>
		</div>
	);
}
