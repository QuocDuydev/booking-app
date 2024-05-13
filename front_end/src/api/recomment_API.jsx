import axios from "axios";

const baseURL = "http://back-end.timtro.top/api";

export const getRecomment = async (accId) => {
	try {
		const response = await axios.get(
			`${baseURL}/accommodations/${accId}/recomments`,
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching recomment data:", error);
		throw error;
	}
};
export const postRecomment = async (token, accId, recommentData) => {
	try {
		const formData = new FormData();
		// biome-ignore lint/complexity/noForEach: <explanation>
		Object.keys(recommentData).forEach((key) => {
			formData.append(key, recommentData[key]);
		});

		const response = await axios.post(
			`${baseURL}/accommodations/${accId}/recomments`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting recomment data:", error);
		throw error;
	}
};
