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
  Image,
  TouchableHighlight,
  processColor,
} from 'react-native';
import RNChart from 'react-native-chart';
import { companyStyle, accentColor } from '../styles/styles';
import Avatar           from './Avatar';

export default class Company extends Component {
  formatStockData() {
    return this.props.data.map(d => ({
      symbol: this.props.symbol,
      date: d.date,
      last: d.last,
    }));
  }

  formatSentimentData() {
    return this.props.sentimentHistory.map(d => ({
      mattDamon: 'Sentiment',
      date: d.date,
      sentiment: d.sentiment,
    }));
  }

  render() {
    const { symbol, description, data, onClick, sentimentHistory,
      onSelectDate, editing, entities, onRemove } = this.props;
    const myStockData = this.formatStockData();
    const sentimentLoading = sentimentHistory === 'loading';

    let mySentimentData = [];
    if (!sentimentLoading) {
      mySentimentData = this.formatSentimentData();
    }

    const loading = !data.length || sentimentLoading;
    const change = data.length ? data[data.length - 1].change : null;
    const last = data.length ? data[data.length - 1].last : null;

    return (
      <View style={companyStyle.company}>
        <View style={companyStyle.row}>
          {editing ? <TouchableHighlight
            onPress={onRemove}
            underlayColor="transparent"
          >
            <Image
              style={companyStyle.remove}
              source={require('../images/minus.png')}
            />
          </TouchableHighlight> : null}
          <Avatar
            symbol={symbol}
            description={description}
            change={change}
            last={last}
            loading={loading}
            onClick={onClick}
          />
        </View>
        {data.length ? <RNChart
          style={companyStyle.chart}
          xLabels={myStockData.map(d => d.date)}
          tightBounds={true}
          showXAxisLabels={false}
          chartData={[{
            lineWidth: 1,
            data: myStockData.map(d => d.last),
            showDataPoint: true,
            color: processColor(accentColor),
            dataPointRadius: 2,
            dataPointColor: processColor(accentColor),
            dataPointFillColor: processColor('white'),
          }]}
        /> : null}
      </View>
    );
  }
}

Company.propTypes = {
  symbol: PropTypes.string.isRequired,
  description: PropTypes.string,
  data: PropTypes.array.isRequired,
  editing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelectDate: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  entities: PropTypes.array,
  sentimentHistory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};
