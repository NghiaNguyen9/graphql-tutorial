import { User } from 'src/app/models/user.model';
import * as userAction from './../actions/user-actions';
import { createAction, props } from '@ngrx/store';

export interface UserState {
    userLogin: User | undefined
}

export const initialState: UserState = {
    userLogin: {
        Email: '',
        Password: ''
    }
}

export function userReducer(state = initialState, action: userAction.Actions): UserState {
    switch (action.type) {
        case userAction.ActionType.CHECK_LOGIN:
            const user = action.payload;
            return {
                ...state,
                userLogin: user
            };
        case userAction.ActionType.LOGOUT:
            return {
                ...state,
                userLogin: { Email: '', Password: '' }
            }
        default:
            return state
    }
}