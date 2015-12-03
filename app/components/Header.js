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
import IBMsvg from '../svgs/IBM.svg';

export default class Header extends Component {
  render() {
    const {strings, editing, onEdit, onCancel} = this.props;
    const linkString = editing ? strings.cancel : strings.edit;
    const linkClick  = editing ? onCancel       : onEdit;
    return (
      <div className="portfolio-insights-title">
        <div className="da-logo" dangerouslySetInnerHTML={{__html: IBMsvg}}></div>
        <h1 className="portfolio-insights-title">{strings.portfolioInsights}</h1>
        <a href="javascript:void(0)" onClick={linkClick}>{linkString}</a>
      </div>
    );
  }
}

Header.propTypes = {
  strings: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
