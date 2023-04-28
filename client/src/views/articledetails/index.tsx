import "./index.less";
import { Typography, Space } from "antd";
import { useState, useEffect } from "react";
import { getArticleById, likeArticles, setBahaviorLog } from "@/api/modules/article";
import { LikeOutlined, LikeFilled, EyeOutlined } from "@ant-design/icons";
import { store } from "@/redux/index";
import { connect } from "react-redux";
import { setUserLog } from "@/redux/modules/cache/action";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ArticleDetails = (props: any) => {
	const { setUserLog } = props;
	const { id } = useParams();
	const { userId } = store.getState().global.userInfo;
	const userlog = store.getState().cache.userlog;

	let newLog = {
		[id]: {
			//文章id
			viewed: true,
			read: false,
			liked: false,
			disliked: false
		}
	};
	if (Object.keys(userlog).length === 0) {
		setUserLog(newLog);
	}

	let timer: any;
	let startTime: number;

	const startTimer = () => {
		startTime = Date.now();
		timer = setInterval(() => {
			const elapsedTime = Date.now() - startTime;
			if (elapsedTime >= 10000) {
				recordUserBehavior(userId, id, "reading");
				clearInterval(timer);
			}
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timer);
	};

	// 当用户进入文章页面时开始计时
	startTimer();

	// 当用户离开文章页面时停止计时
	window.addEventListener("beforeunload", stopTimer);

	const [article, setArticle] = useState(null);
	const [isLiked, setisLiked] = useState(userlog[id]?.liked || false);

	useEffect(() => {
		async function fetchData() {
			try {
				const articleData = await getArticleById(id);
				setArticle(articleData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, [isLiked]);

	function formatDate(dateString: any) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const handleLiked = async () => {
		try {
			const response = await likeArticles({ id, userId });
			recordUserBehavior(userId, id, "like");
			updateLikeStatus(id);
			console.log(response);
		} catch (error) {
			// 在这里处理点赞失败的情况
		}
	};

	const recordUserBehavior = async (userId, articleId, behaviorType) => {
		await setBahaviorLog({ userId, articleId, behaviorType });
	};

	const updateLikeStatus = id => {
		const updatedLog = { ...newLog[id], liked: true };
		const updatedLogs = { ...newLog, [id]: updatedLog };
		setUserLog(updatedLogs);
		setisLiked(!isLiked);
	};

	return (
		<>
			<div className="article">
				{article && (
					<Typography>
						<Title>{article.title}</Title>
						<Paragraph>{article.content}</Paragraph>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Space size={20}>
								<Paragraph style={{ color: "#999" }}>{formatDate(article.createdAt)}</Paragraph>
								<Paragraph>
									{isLiked ? (
										<LikeFilled style={{ color: "red" }} onClick={handleLiked} />
									) : (
										<LikeOutlined onClick={handleLiked} />
									)}
									<span style={{ marginLeft: 8 }}>{article.likesCount}</span>
								</Paragraph>
								<Paragraph>
									<EyeOutlined />
									<span style={{ marginLeft: 8 }}>{article.viewsCount}</span>
								</Paragraph>
							</Space>
						</div>
					</Typography>
				)}
			</div>
		</>
	);
};

const mapDispatchToProps = { setUserLog };
export default connect(null, mapDispatchToProps)(ArticleDetails);
