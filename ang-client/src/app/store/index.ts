import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user-reducers';
import { createSelector } from '@ngrx/store';

export interface IAppState {
    user: fromUser.UserState
}

export const appReducer: ActionReducerMap<IAppState> = {
    user: fromUser.userReducer
}
export const getUser = (state: IAppState) => state.user;
export const getUsers = createSelector(
    getUser,
    (state: fromUser.UserState) => {
        return state.userLogin
    }
)