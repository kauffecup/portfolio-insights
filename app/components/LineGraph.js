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
import dimple from 'dimple';
import moment from 'moment';

const DRAW_TIME = 400;

export default class LineGraph extends Component {
  componentDidMount() {
    const { stockData, sentimentData, onSelectDate } = this.props;
    const svg = dimple.newSvg(this.refs._graph, '100%', '100%');
    this.lineChart = new dimple.chart(svg); // eslint-disable-line
    this.lineChart.setBounds(30, 14, '100%,-40', '100%,-34');

    // intialize the axis
    this.x = this.lineChart.addTimeAxis('x', 'date', '%Y-%m-%d', '%b %d');
    this.dataY = this.lineChart.addMeasureAxis('y', 'last');
    this.dataY.ticks = 4;
    this.sentimentY = this.lineChart.addMeasureAxis('y', 'sentiment');
    this.sentimentY.ticks = 4;
    this.updateAxis();

    // initialize the series lines
    this.dataSeries = this.lineChart.addSeries('symbol', dimple.plot.line, [this.x, this.dataY]);
    this.dataSeries.data = stockData || [];
    this.dataSeries.lineMarkers = true;
    this.sentimentSeries = this.lineChart.addSeries('mattDamon', dimple.plot.line, [this.x, this.sentimentY]);
    this.sentimentSeries.data = sentimentData || [];
    this.sentimentSeries.lineMarkers = true;
    this.sentimentSeries.addEventHandler('click', e => onSelectDate(moment(e.xValue).format('YYYY-MM-DD')));

    // initialize the legend
    this.legend = this.lineChart.addLegend(60, 5, '100%,-50', 20, 'right');

    // lessss go
    this.lineChart.draw(DRAW_TIME);
  }

  /** When our props change, update the graphs data and min/max axis stuff */
  componentDidUpdate() {
    this.dataSeries.data = this.props.stockData || [];
    this.sentimentSeries.data = this.props.sentimentData || [];
    this.updateAxis();
    this.lineChart.draw(DRAW_TIME);
  }

  updateAxis() {
    const myDataNums = this.props.stockData.map(d => d.last);
    const mySentimentNums = this.props.sentimentData.map(d => d.sentiment);
    this.dataY.overrideMin = Math.min(...myDataNums);
    this.dataY.overrideMax = Math.max(...myDataNums);
    this.sentimentY.overrideMin = Math.min(...mySentimentNums);
    this.sentimentY.overrideMax = Math.max(...mySentimentNums);
  }

  render() {
    return <span className="graph" ref="_graph"></span>;
  }
}

LineGraph.propTypes = {
  stockData: PropTypes.array.isRequired,
  sentimentData: PropTypes.array,
  onSelectDate: PropTypes.func.isRequired
};
