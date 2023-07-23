import { useEffect, useState } from "react";
import { Card, List } from "antd";
import { useNavigate } from "react-router-dom";
import { getRecommendation } from "@/api/modules/article";
import "./index.less";

const RecommentCard = (props: any) => {
	const { userId } = props;
	const [recommendList, setRecommendList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const recommendData = await getRecommendation(userId);
			const data = Array.from(new Set(recommendData.map(item => item.title))).map(title =>
				recommendData.find(item => item.title === title)
			);
			setRecommendList(data);
		};
		fetchData();
	}, []);
	return (
		<Card title="猜你喜欢">
			<List
				className="RecommendList"
				dataSource={recommendList}
				renderItem={item => <List.Item onClick={() => navigate(`/article/${item.id}`)}>{item.title}</List.Item>}
			></List>
		</Card>
	);
};

export default RecommentCard;
