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
import classNames from 'classnames';

export default class Avatar extends Component {
  render() {
    const {symbol, description, change, last, loading, onClick} = this.props;
    const hC = typeof change === 'number';
    const hL = typeof last === 'number';
    const mainClass = classNames('avatar', { loading: loading });
    const cClass = classNames('change', {
      neg: hC && (change < 0),
      neut: hC && (change === 0),
      pos: hC && (change > 0)
    });
    return (
      <div className={mainClass} onClick={onClick}>
        <h4 className="symbol">{symbol}</h4>
        <div className="description">{description}</div>
        {hC ? <div className={cClass}>{change}</div> : null}
        {hL ? <div className="last">{last}</div> : null}
      </div>
    );
  }
}

Avatar.propTypes = {
  symbol: PropTypes.string.isRequired,
  description: PropTypes.string,
  change: PropTypes.number,
  last: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
