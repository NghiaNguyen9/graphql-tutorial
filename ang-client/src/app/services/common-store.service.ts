import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonStoreState } from '../models/common-store-state.model';

@Injectable({
    providedIn: 'root'
})

export class CommonStoreService {
    stateKey: string = 'COMMON_STORE';
    defaultState: any = {}
    private state: BehaviorSubject<CommonStoreState> = new BehaviorSubject(this.defaultState);
    constructor() {
        this.state.next(this.getStateFromSession(this.stateKey));
    }

    getValues(): CommonStoreState {
        return this.state.value;
    }

    getState(): Observable<CommonStoreState> {
        return this.state.asObservable();
    }
    clearState() {
        sessionStorage.removeItem(this.stateKey);
        this.state.next(this.defaultState);
    }
    setState(updateState: CommonStoreState): void {
        const _newData = { ...this.state.value, ...updateState };
        this.state.next(_newData);
        this.setState2Session(this.stateKey, _newData);
    }
    private setState2Session(key: string, data: any) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    private getStateFromSession(key: string) {
        const _result = sessionStorage.getItem(key);
        if (!_result) {
            return null;
        }
        return JSON.parse(_result);
    }
}