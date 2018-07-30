import {helpers, State, SwitchState} from "./newStore"
import * as React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

export interface Props extends State {
  actions: typeof helpers.actionCreators
}

class AppComponent extends React.Component<Props> {

  render() {
    const { value, boolValue, switchState, actions } = this.props;
    return (
      <div>
        <p>Value: { value }</p>
        <p>Boolean Value: { boolValue }</p>
        <p>Switch State: { switchState }</p>
        <button onClick={() => actions.increment()}>Increment</button>
        <button onClick={() => actions.useRemoteValue(1)}>Use remote value</button>
        <button onClick={() => actions.setBoolValue(!boolValue)}>Toggle boolean value</button>
        <button onClick={() => actions.setSwitchState(SwitchState.On)}>Turn on switch</button>
      </div>
    )
  }
}

export const App = connect(
  state => state,
  (dispatch) => ({ actions: bindActionCreators(helpers.actionCreators, dispatch) })
)(AppComponent) as any

