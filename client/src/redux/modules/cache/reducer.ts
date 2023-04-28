import { UserCache } from "@/redux/interface";
import * as types from "@/redux/mutation-types";
import produce from "immer";
import { AnyAction } from "redux";

const userCache: UserCache = {
	userId: "",
	userlog: {},
	userinterest: {}
};

const cache = (state: UserCache = userCache, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_ID:
				draftState.userId = action.userId;
				break;
			case types.SET_LOG:
				draftState.userlog = action.userlog;
				break;
			case types.SET_ASSEMBLY_SIZE:
				draftState.userinterest = action.userinterest;
				break;
			default:
				return draftState;
		}
	});

export default cache;
