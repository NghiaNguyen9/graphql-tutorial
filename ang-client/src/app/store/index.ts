import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user-reducers';
export interface IAppState {
    user: fromUser.UserState
}

export const appReducer: ActionReducerMap<IAppState> = {
    user: fromUser.userReducer
}
