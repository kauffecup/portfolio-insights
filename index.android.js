import React, { Component, AppRegistry, Text } from 'react-native';
import Root           from './app/containers/native/Root';
import configureStore from './app/store/configureStore';

const store = configureStore();

class PortfolioInsights extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
};

AppRegistry.registerComponent('PortfolioInsights', () => PortfolioInsights);
