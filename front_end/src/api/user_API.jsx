import axios from "axios";

const baseURL = "http://back-end.timtro.top/apis";
const baseURLs = "http://back-end.timtro.top/api";

export const getUser = async (token) => {
	try {
		const response = await axios.get(`${baseURLs}/users/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};

export const getUserId = async (userId, token) => {
	try {
		const response = await axios.get(`${baseURLs}/users/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching user by id:", error);
		throw error;
	}
};

export const postUser = async (username, email, password) => {
	try {
		const response = await axios.post(
			`${baseURL}/signup/`,
			{
				username: username,
				email: email,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting user:", error);
		throw error;
	}
};

export const putUser = async (userId, token) => {
	try {
		const response = await axios.put(`${baseURLs}/users/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error putting user:", error);
		throw error;
	}
};

export const deleteUsers = async (userId, token) => {
	try {
		const response = await axios.delete(`${baseURLs}/users/${userId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
};
