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

import React, { Component, PropTypes } from 'react';
import LineGraph         from './LineGraph';
import Avatar            from './Avatar';
import EntityBubbleChart from './EntityBubbleChart';
import minusSvg          from '../svgs/minus.svg';

export default class Company extends Component {
  formatStockData() {
    return this.props.data.map(d => ({
      symbol: this.props.symbol,
      date: d.date,
      last: d.last
    }));
  }

  formatSentimentData() {
    return this.props.sentimentHistory.map(d => ({
      mattDamon: 'Sentiment',
      date: d.date,
      sentiment: d.sentiment
    }));
  }

  render() {
    const { symbol, description, data, onClick, sentimentHistory,
      onSelectDate, editing, entities } = this.props;
    const myStockData = this.formatStockData();
    const sentimentLoading = sentimentHistory === 'loading';

    let mySentimentData = [];
    if (!sentimentLoading) {
      mySentimentData = this.formatSentimentData();
    }

    const loading = !data.length || sentimentLoading;
    const change = data.length ? data[data.length - 1].change : null;
    const last = data.length ? data[data.length - 1].last : null;

    // conditional components
    const editBtn = editing ?
      <div className="remove"
        dangerouslySetInnerHTML={{__html: minusSvg}}
        onClick={this.props.onRemove}>
      </div> : null;
    const graph = data.length ?
      <LineGraph stockData={myStockData}
        sentimentData={mySentimentData}
        onSelectDate={onSelectDate} />
      : null;
    const bubbleChart = entities.length ?
      <EntityBubbleChart entities={entities} />
      : null;

    return (
      <div className="company">
        {editBtn}
        <Avatar symbol={symbol} description={description} change={change} last={last} loading={loading} onClick={onClick} />
        {graph}
        {bubbleChart}
      </div>
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
    PropTypes.array
  ]).isRequired
};
