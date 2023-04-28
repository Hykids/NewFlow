import { Card, Space, Pagination, List } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
import CardItem from "./cardItem";
import { useEffect, useState } from "react";
import { Article } from "@/api/interface";
import { store } from "@/redux/index";
import { getAllArticles, getTopArticles } from "@/api/modules/article";
import type { PaginationProps } from "antd";

// import { Carousel } from "antd";

const Home = () => {
	const [articles, setArticle] = useState<Article.ArticleItem[]>([]);
	const [topArticles, setTopArticless] = useState([]);
	const [current, setCurrent] = useState(1);
	const [totalPage, setTotalPage] = useState(50);
	const navigate = useNavigate();

	const { userId } = store.getState().global.userInfo;
	const getTopArticlesTitle = async () => {
		const res = await getTopArticles();
		res && setTopArticless(res);
	};

	const getArticlesByPage = async page => {
		const res = await getAllArticles(page);
		const { articles, totalPages } = res;
		if (articles) {
			setArticle(articles);
			setTotalPage(Number(totalPages) * 10);
		}
	};
	const onChange: PaginationProps["onChange"] = page => {
		setCurrent(page);
		getArticlesByPage(page);
	};

	useEffect(() => {
		getTopArticlesTitle();
		getArticlesByPage(current);
	}, []);
	return (
		<div className="home card">
			<div className="leftCard">
				{articles &&
					articles.map(article => {
						return <CardItem key={article.id} article={article} userId={userId}></CardItem>;
					})}
				<Pagination current={current} onChange={onChange} total={totalPage || 50} />;
			</div>
			<div className="rightCard">
				<Space direction="vertical" size={16}>
					<Card title="热榜" extra={<a href="#">More</a>}>
						{topArticles && (
							<List
								dataSource={topArticles}
								renderItem={(Article, index) => (
									<List.Item onClick={() => navigate(`/article/${Article.id}`)}>{`${index + 1}. ${Article.title}`}</List.Item>
								)}
							/>
						)}
					</Card>

					{/* <Card size="small" title="热门标签" extra={<a href="#">More</a>} style={{ width: 300 }}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card> */}
				</Space>
			</div>
		</div>
	);
};

export default Home;
