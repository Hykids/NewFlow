import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
// import ArticleDetails from "@/views/articledetails/index";

// 常用组件模块
const articleRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/article/:id",
				element: lazyLoad(React.lazy(() => import("@/views/articledetails/index"))),
				// element: <ArticleDetails />,
				meta: {
					// requiresAuth: true,
					title: "文章详情",
					key: "details"
				}
			}
		]
	}
];

export default articleRouter;
