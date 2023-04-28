import * as types from "@/redux/mutation-types";
import { ThemeConfigProp, UserInfo } from "@/redux/interface/index";

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});

// * setuserInfo
export const setUser = (userInfo: UserInfo) => ({
	type: types.SET_USERINFO,
	userInfo
});

// * setAssemblySize
export const setAssemblySize = (assemblySize: string) => ({
	type: types.SET_ASSEMBLY_SIZE,
	assemblySize
});

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language
});

// * setThemeConfig
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
	type: types.SET_THEME_CONFIG,
	themeConfig
});
