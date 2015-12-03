import React, { Component, Text } from 'react-native';
import { Provider } from 'react-redux/native';
import PortfolioInsights from './App';

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        {() => <PortfolioInsights />}
      </Provider>
    );
  }
}
