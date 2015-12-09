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

import React, { PropTypes, Component } from 'react';
import ReactBubbleChart  from 'react-bubble-chart';

const legend = [
  // reds from dark to light
  {color: '#67000d', textColor: '#fee0d2'},
  {color: '#a50f15', textColor: '#fee0d2'},
  '#cb181d',
  '#ef3b2c',
  '#fb6a4a',
  '#fc9272',
  '#fcbba1',
  '#fee0d2',
  // neutral grey
  '#f0f0f0',
  // blues from light to dark
  '#deebf7',
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  {color: '#08519c', textColor: '#deebf7'},
  {color: '#08306b', textColor: '#deebf7'}
];

const domain = {
  min: -1,
  max: 1
};

export default class EntityBubbleChart extends Component {
  formatData(entities) {
    return entities.map(e => ({
      value: e.count,
      _id: e.text,
      colorValue: e.averageSentiment
    })).sort((s1, s2) => s2.value - s1.value);
  }

  render() {
    const { entities } = this.props;
    const data = this.formatData(entities);

    return (
      <div className="entity-bubble-chart">
        <ReactBubbleChart
          legend={false}
          className=""
          colorLegend={legend}
          data={data}
          fixedDomain={domain}
        />
      </div>
    );
  }
}

EntityBubbleChart.propTypes = {
  entities: PropTypes.array.isRequired
};
