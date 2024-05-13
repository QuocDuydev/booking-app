import axios from "axios";

const baseURL = "http://back-end.timtro.top/api";

export const getSearch = async (keys) => {
	try {
		const response = await axios.get(
			`${baseURL}/accommodations/?search=${keys}`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching room data:", error);
		throw error;
	}
};
