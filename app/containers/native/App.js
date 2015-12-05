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

import React, { Component, Text, View, StyleSheet, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
// dumb components
import Header   from '../../components/native/Header';
import Searcher from '../../components/native/Searcher';
// actions
import {
  getStrings,
  getStockData,
  searchCompany,
  clearPotentialCompanies,
  addCompany,
  enterEdit,
  cancelEdit
} from '../../actions/actions';

class PortfolioInsights extends Component {
  /**
   * When we mount, load the strings and load our company data
   */
  componentDidMount() {
    this.props.dispatch(getStrings(this.props.language));
    // if we already have companies, request the stock data and
    // sentiment history to populate our visualizations
    const { dispatch } = this.props;
    if (this.props.companies.length) {
      const symbols = this.props.companies.map(c => c.symbol);
      dispatch(getStockData(symbols));
    }
  }

  render() {
    // injected by connect call
    const {dispatch, strings, potentialCompanies, companies, editing} = this.props;

    return (
      <View style={styles.portfolioInsights}>
        <Header strings={strings}
          editing={editing}
          onEdit={() => dispatch(enterEdit())}
          onCancel={() => dispatch(cancelEdit())} />
        <Searcher strings={strings}
          companies={companies}
          potentialCompanies={potentialCompanies.companies}
          loadingStatus={potentialCompanies.status}
          onSearch={v => dispatch(searchCompany(v))}
          onClear={() => dispatch(clearPotentialCompanies())}
          onCompanyAdd={c => dispatch(addCompany(c))} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  portfolioInsights: {
    flexDirection: 'column',
    flex: 1
  }
});

PortfolioInsights.propTypes = {
  editing: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  strings: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  potentialCompanies: PropTypes.object.isRequired,
  language: PropTypes.string
};

const select = state => ({
  strings: state.strings,
  companies: state.companies.companies,
  editing: state.companies.editing,
  potentialCompanies: state.potentialCompanies
});

// Wrap the component to inject dispatch and state into it
export default connect(select)(PortfolioInsights);
