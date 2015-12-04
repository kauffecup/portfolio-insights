//------------------------------------------------------------------------------
// Copyright IBM Corp. 2015
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

import React, { Component, AppRegistry, Text } from 'react-native';
import Root           from './app/containers/native/Root';
import configureStore from './app/store/configureStore.prod'; // TODO: get working with magic

const store = configureStore();

class PortfolioInsights extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
};

AppRegistry.registerComponent('PortfolioInsights', () => PortfolioInsights);
