import {createHelpers} from "./index"

interface State {
  value: number;
  boolValue: boolean;
}

interface Actions {
  addValue: number;
  setBoolean: boolean;
}

const initialState: State = {value: 1, boolValue: false}

const helpers = createHelpers<State, Actions>("Foo", initialState, {
  addValue: (state, payload) => {
    return {...state, value: state.value + payload}
  },
  setBoolean: (state, payload) => {
    return {...state, boolValue: payload};
  }
})

test("reducer for addValue", () => {
  const newState = helpers.reducer(
    initialState,
    helpers.actionCreators.addValue(100),
  )
  expect(newState.value).toBe(101)
  expect(newState.boolValue).toBe(false)
})

test("reducer for setBoolean", () => {
  const newState = helpers.reducer(
    initialState,
    helpers.actionCreators.setBoolean(true),
  )
  expect(newState.value).toBe(1)
  expect(newState.boolValue).toBe(true)
})

test("action type", () => {
  expect(helpers.actionTypes.addValue).toBe("[Foo] addValue")
  expect(helpers.actionTypes.setBoolean).toBe("[Foo] setBoolean")
})

test("action creator", () => {
  expect(helpers.actionCreators.addValue(100)).toEqual({
    type: "[Foo] addValue",
    payload: 100,
  })
  expect(helpers.actionCreators.setBoolean(true)).toEqual({
    type: "[Foo] setBoolean",
    payload: true,
  })
})
