import { useState, useEffect } from "react";
import { Table, Pagination, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllArticles, deleteArticles } from "@/api/modules/article";
import { Article } from "@/api/interface";
import "./index.less";
const DynamicForm = () => {
	const [articles, setArticles] = useState<Article.ArticleItem[]>([]);
	const [current, setCurrent] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const columns = [
		{
			title: "index",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			className: "table-column"
		},
		{
			title: "Create At",
			dataIndex: "createAt",
			key: "createAt",
			className: "table-column"
		},
		{
			title: "Update Time",
			dataIndex: "updateTime",
			key: "updateTime",
			className: "table-column"
		},
		{
			title: "Action",
			key: "action",
			render: ({ id }) => (
				<Space size="middle">
					<a>
						<EditOutlined />
					</a>
					<a onClick={() => deleteArticle(id)}>
						<DeleteOutlined />
					</a>
				</Space>
			)
		}
	];

	const deleteArticle = async (id: string) => {
		try {
			await deleteArticles(id);
			message.success("删除文章成功");
			getArticlesByPage(current);
		} catch (error) {
			console.log(error);
			message.error("删除文章失败");
		}
	};
	const getArticlesByPage = async (page: number) => {
		try {
			const res = await getAllArticles(page);
			const { articles, totalPages } = res;
			if (articles) {
				setArticles(articles);
				setTotalPages(Number(totalPages));
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getArticlesByPage(current);
	}, [current]);

	const handlePageChange = (page: number) => {
		setCurrent(page);
	};

	const data = articles.map((article, index) => ({
		id: article._id,
		key: index + 1,
		title: article.title,
		content: article.content,
		createAt: new Date(article.createdAt).toLocaleDateString(),
		updateTime: new Date(article.updatedAt).toLocaleDateString()
	}));

	return (
		<>
			<Table dataSource={data} columns={columns} pagination={false} />
			<Pagination current={current} total={totalPages * 10} onChange={handlePageChange} />
		</>
	);
};
export default DynamicForm;
