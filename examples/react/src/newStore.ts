import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {createHelpers} from 'ts-reducer-creator';
import {Action} from "redux"

export enum SwitchState {
    On = "On",
    Off = "Off"
}

export interface State {
    value: number;
    boolValue: boolean;
    switchState: SwitchState;
}

export const initialState: State = {
    value: 0,
    boolValue: false,
    switchState: SwitchState.Off
}


interface CounterActions {
    useRemoteValue: number;
    increment: void;
    setValue: number;
    setBoolValue: boolean;
    setSwitchState: SwitchState;
}

export const helpers = createHelpers<State, CounterActions>('Counter', initialState, {
    increment: (state) => {
        return {...state, value: state.value + 1}; // state has type State
    },
    setValue: (state, payload) => {
        return {...state, value: payload};   // payload has type number
    },
    useRemoteValue: state => state,
    setBoolValue: (state, payload) => {
        return {...state, boolValue: payload}; // payload has type boolean
    },
    setSwitchState: (state, payload) => {
        return {...state, switchState: payload}; // payload has type SwitchState
    }
});

export const counterReducer = helpers.reducer

function getRemoteValue() {
    return of(10);
}

export const useRemoteValueEpic = (action$: Observable<Action>) => action$.pipe(
  helpers.ofTypeFilters.useRemoteValue,
  mergeMap(action => getRemoteValue().pipe(map(x => helpers.actionCreators.setValue(x + action.payload))))
)
