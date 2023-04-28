import { Login } from "@/api/interface/index";
import { PORT1, PORT } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT + `/login`, params);
	return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT + `/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = (role: string) => {
	return http.get<Menu.MenuOptions[]>(`${PORT}/menulist?role=${role}`);
};

//添加用户
export const AddUser = (params: any) => {
	return http.post(PORT + "/users", params);
};

//获取所有用户
export const getAllUser = () => {
	return http.get(PORT + "/users");
};

// 更新用户信息
export const updateUserInfo = (id: string) => {
	return http.patch(`${PORT}/users/${id}/role`);
};

//删除用户
export const deleteUser = (id: string) => {
	return http.delete(`${PORT}/users/${id}`);
};
