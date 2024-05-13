import { useState, useEffect } from "react";

import CardComments from "./Card_Comment";
import { useAccessToken } from "../ultiti";
import { getRecomment, postRecomment } from "../../api/recomment_API";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ListAllRecomment from "./List_Recomment";
import CreateRecomment from "./Form_CreateRecomment";
import axios from "axios";

function ShowRecomment() {
	const { acc_id } = useParams();
	const token = useAccessToken();
	const navigate = useNavigate();
	let id = null;
	if (token) {
		const loggedInUser = jwt_decode(token);
		id = loggedInUser.user_id;
	}
	const [recomment, setRecomments] = useState({
		accommodations: acc_id,
		user: id,
		descriptions: "",
		rating: "",
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const handleCreate = async () => {
		if (token) {
			try {
				const recommentData = {
					accommodations: recomment.accommodations,
					user: recomment.user,
					descriptions: recomment.descriptions,
					rating: recomment.rating,
					datecommented: recomment.datecommented,
				};

				const response = await postRecomment(token, acc_id, recommentData);
				console.log("Create successful:", response.data);
				alert("Thêm đánh giá thành công !");
				window.location.reload();
			} catch (error) {
				console.error("Create failed:", error);
			}
		} else {
			alert("Vui lòng đăng nhập trước khi thêm đánh giá!");
			navigate("/login");
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setRecomments((prevRecomment) => ({ ...prevRecomment, [name]: value }));
	};

	const [users, setUsers] = useState([]);
	const [recommentsData, setRecommentsData] = useState([]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchRecomments = async () => {
			try {
				const recommentData = await getRecomment(acc_id);
				setRecommentsData(recommentData);
				const latestTimestamp = Date.now();

				// Sắp xếp theo ngày thêm mới nhất và thời gian thêm mới nhất
				const sortedRecomment = recommentData.sort((a, b) => {
					// So sánh ngày thêm mới nhất
					const dateComparison = new Date(b.updatedAt) - new Date(a.updatedAt);

					// Nếu cùng ngày thêm mới nhất, so sánh thời gian thêm mới nhất
					if (dateComparison === 0) {
						// Lấy thời gian thêm mới nhất của từng khách sạn
						const timestampA = new Date(a.updatedAt).getTime();
						const timestampB = new Date(b.updatedAt).getTime();

						// So sánh thời gian thêm mới nhất với biến tạm thời
						return timestampB - timestampA - (latestTimestamp - timestampA);
					}

					// Nếu khác ngày thêm mới nhất, sắp xếp theo ngày thêm mới nhất
					return dateComparison;
				});

				setRecommentsData(sortedRecomment);

				// Lấy thông tin người dùng cho mỗi comment
				const usersData = await Promise.all(
					recommentData.map(async (item) => {
						if (item.user) {
							// Gọi API để lấy thông tin người dùng dựa trên user_id
							const userData = await axios.get(
								`http://back-end.timtro.top/api/users/${item.user}`,
								{
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${token}`,
									},
								},
							);
							return userData;
						}
						return null;
					}),
				);

				setUsers(usersData);
			} catch (error) {
				console.error("Error fetching recomments:", error);
			}
		};

		fetchRecomments();
	}, [acc_id]);

	const limitedRecomment = recommentsData.slice(0, 3);

	return (
		<>
			<CreateRecomment
				recomment={recomment}
				handleChange={handleChange}
				handleCreate={handleCreate}
			/>
			<CardComments users={users} limitedRecomment={limitedRecomment} />
			<ListAllRecomment users={users} recommentsData={recommentsData} />
		</>
	);
}
export default ShowRecomment;
