import * as types from "@/redux/mutation-types";
import { UserLog, UserInterest } from "@/redux/interface/index";

export const setUserId = (userId: string) => ({
	type: types.SET_ID,
	userId
});

export const setUserLog = (userlog: UserLog) => ({
	type: types.SET_LOG,
	userlog
});

export const setUserInterest = (userInterest: UserInterest) => ({
	type: types.SET_INTEREST,
	userInterest
});
