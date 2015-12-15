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

import React, { Component, View, PropTypes } from 'react-native';
import { connect }  from 'react-redux/native';
import { appStyle } from '../styles/styles';
import Constants    from '../../constants/Constants';
// fellow containers
import Companies from './Companies';
// dumb components
import Header   from '../components/Header';
import Searcher from '../components/Searcher';
// actions
import {
  getStrings,
  initialize,
  searchCompany,
  clearPotentialCompanies,
  addCompany,
  enterEdit,
  cancelEdit,
} from '../../actions/actions';

class PortfolioInsights extends Component {
  /**
   * When we mount, load the strings and load our company data
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getStrings(this.props.language));
    dispatch(initialize());
  }

  render() {
    // injected by connect call
    const {dispatch, strings, potentialCompanies, companies, editing} = this.props;

    return (
      <View style={appStyle.portfolioInsights}>
        <Header strings={strings}
          editing={editing}
          onEdit={() => dispatch(enterEdit())}
          onCancel={() => dispatch(cancelEdit())}
        />
        <Searcher strings={strings}
          companies={companies}
          potentialCompanies={potentialCompanies.companies}
          loadingStatus={potentialCompanies.status}
          onSearch={v => dispatch(searchCompany(v))}
          onClear={() => dispatch(clearPotentialCompanies())}
          onCompanyAdd={c => dispatch(addCompany(c))}
        />
        {potentialCompanies.status === Constants.POTENTIAL_STATUS_CLEAR ? <Companies /> : null}
      </View>
    );
  }
}

PortfolioInsights.propTypes = {
  editing: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  strings: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  potentialCompanies: PropTypes.object.isRequired,
  language: PropTypes.string,
};

const select = state => ({
  strings: state.strings,
  companies: state.companies.companies,
  editing: state.companies.editing,
  potentialCompanies: state.potentialCompanies,
});

// Wrap the component to inject dispatch and state into it
export default connect(select)(PortfolioInsights);
