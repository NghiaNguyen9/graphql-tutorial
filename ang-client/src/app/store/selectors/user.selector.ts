import { createSelector } from "@ngrx/store";
import { IAppState } from "..";
import * as fromUser from '../reducers/user-reducers';

export const getUser = (state: IAppState) => state.user;
export const getUsers = createSelector(
    getUser,
    (state: fromUser.UserState) => {
        return state.userLogin
    }
)