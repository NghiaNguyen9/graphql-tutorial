import { Action } from "@ngrx/store";
import { User } from './../../models/user.model';

export const ActionType = {
    CHECK_LOGIN: 'CHECK LOGIN',
    LOGOUT: 'LOGOUT'
}

export class CheckLogin implements Action {
    type = ActionType.CHECK_LOGIN;
    constructor(public payload: User) { }
}
export class Logout implements Action {
    type = ActionType.LOGOUT;
    constructor(public payload?: User) { }
}

export type Actions = CheckLogin | Logout