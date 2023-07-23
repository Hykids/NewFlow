import { PORT } from "@/api/config/servicePort";
import { Article } from "@/api/interface/index";

import http from "@/api";

export const getAllArticles = (page: any) => {
	return http.get<Article.ArticleItem>(PORT + `/articles?page=${page}`);
};

export const getTopArticles = () => {
	return http.get(PORT + `/articles/top-articles`);
};

export const getArticleById = (id: string) => {
	return http.get<Article.ArticleItem>(PORT + `/articles/${id}`);
};

export const creatArticles = (params: Article.ArticleItem) => {
	return http.post<Article.ArticleItem>(PORT + `/articles`, params);
};

export const deleteArticles = (id: string) => {
	return http.delete<Article.ArticleItem>(PORT + `/articles/${id}`);
};

export const likeArticles = (params: any) => {
	const { id } = params;
	return http.post<Article.ArticleItem>(PORT + `/articles/${id}/likes`, params);
};

export const updateArticles = (params: any) => {
	const { id } = params;
	return http.patch<Article.ArticleItem>(PORT + `/articles/${id}`, params);
};

export const setBahaviorLog = (params: Article.Bahavior) => {
	return http.post<Article.Bahavior>(PORT + `/behavior`, params);
};

export const getRecommendation = (id: string) => {
	return http.get<Article.ArticleItem>(PORT + `/recommendation/${id}`);
};
