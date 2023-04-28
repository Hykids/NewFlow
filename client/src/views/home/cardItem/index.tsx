import { Card, Typography } from "antd";
// import { Article } from "@/api/interface";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, LikeOutlined, CalendarOutlined } from "@ant-design/icons";
import { setBahaviorLog, updateArticles } from "@/api/modules/article";
import "./index.less";

// const { Paragraph } = Typography;

const CardItem = (props: any) => {
	const { article, userId } = props;

	const navigate = useNavigate();

	const clickhandle = async () => {
		navigate(`/article/${article._id}`);
		await setBahaviorLog({ userId: userId, articleId: article._id, behaviorType: "views" });
		await updateArticles({ id: article._id, viewsCount: 1 });
	};

	const formattedDate = new Date(article.createdAt)
		.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		})
		.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
	return (
		<div className="cardContainer">
			<Card className="cardContent">
				<Typography className="cardText">
					<Typography.Title onClick={() => clickhandle()} level={3} style={{ margin: 0 }} ellipsis={{ rows: 1 }}>
						{article.title}
					</Typography.Title>
					<Typography.Paragraph ellipsis={{ rows: 3 }}>{article.content}</Typography.Paragraph>
				</Typography>
				<div className="cardfooter">
					<Card.Meta style={{ color: "#999" }} avatar={<EyeOutlined />} title={article.viewsCount.toString()} />
					<Card.Meta style={{ color: "#999" }} avatar={<LikeOutlined />} title={article.likesCount.toString()} />
					<Card.Meta style={{ color: "#999" }} avatar={<CalendarOutlined />} title={formattedDate} />
				</div>
			</Card>
		</div>
	);
};

export default CardItem;
