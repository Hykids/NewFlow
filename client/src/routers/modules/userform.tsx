import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 表单 Form 模块
const formRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "表单 Form"
		},
		children: [
			{
				path: "/user/adduserform",
				element: lazyLoad(React.lazy(() => import("@/views/userform/useradd/index"))),
				meta: {
					requiresAuth: true,
					title: "添加用户",
					key: "addUserForm"
				}
			},
			{
				path: "/user/manageuserform",
				element: lazyLoad(React.lazy(() => import("@/views/userform/usermanage/index"))),
				meta: {
					requiresAuth: true,
					title: "用户管理",
					key: "manageUserForm"
				}
			}
		]
	}
];

export default formRouter;
