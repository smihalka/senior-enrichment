import React from 'react';
import store from '../store';
// import { incrementCounter } from '../action-creators';
// import StatelessComponent from './StatelessComponent';

class ContainerComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
  }

  // Job 1: subscribe to the store
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  // Job 4: unsubscribe when unmounting
  componentWillUnmount () {
    this.unsubscribe();
  }

  // Job 3: define methods that dispatch to the store
  increment () {
    store.dispatch(incrementCounter());
  }

  render () {
    // Job 2: "map" data from the state into props
    const {counter} = this.state;
    return <StatelessComponent counter={counter} increment={this.increment} />
  }
}
