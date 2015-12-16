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

import React, {
  Component,
  PropTypes,
  View,
  Text,
} from 'react-native';
import { avatarStyle } from '../styles/styles';

export default class Avatar extends Component {
  render() {
    const {symbol, description, change, last, loading, onClick} = this.props;
    const hC = typeof change === 'number';
    const hL = typeof last === 'number';
    let cClass = 'neutral';
    if (hC && (change < 0)) {
      cClass = 'negative';
    } else if (hC && (change > 0)) {
      cClass = 'positive';
    }
    return (
      <View style={avatarStyle.avatar}>
        <Text style={avatarStyle.symbol}>{symbol}</Text>
        <Text style={avatarStyle.description}>{description}</Text>
        {hL ? <Text style={avatarStyle.last}>{last}</Text> : null}
        {hC ? <Text style={avatarStyle[cClass]}>{change}</Text> : null}
      </View>
    );
  }
}

Avatar.propTypes = {
  symbol: PropTypes.string.isRequired,
  description: PropTypes.string,
  change: PropTypes.number,
  last: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
