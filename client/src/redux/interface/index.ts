import type { SizeType } from "antd/lib/config-provider/SizeContext";

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: UserInfo;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* UserState */
export interface UserInfo {
	userId: string;
	role: string;
}

export interface UserLog {
	[articleId: string]: {
		viewed: boolean;
		read: boolean;
		liked: boolean;
		disliked: boolean;
	};
}

export interface UserInterest {
	[tag: string]: number;
}

export interface UserCache {
	userId: string;
	userlog: UserLog;
	userinterest: UserInterest;
}
/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* TabsState */
export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}
