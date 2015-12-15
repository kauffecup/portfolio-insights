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
  ListView,
} from 'react-native';
import { connect } from 'react-redux/native';
import clone from 'clone';
import { companiesStyle } from '../styles/styles';
import RefreshableListView from 'react-native-refreshable-listview';

import Company from '../components/Company';

import {
  getSentimentHistory,
  removeCompany,
  selectSymbolAndDate,
  refreshCompanyData,
} from '../../actions/actions';

class Companies extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      value: '',
      dataSource: ds.cloneWithRows(this.props.companies),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.companies),
    });
  }

  render() {
    const { dispatch, strings, companies, editing, selectedDate } = this.props;
    return (
      <RefreshableListView
        style={companiesStyle.companies}
        dataSource={this.state.dataSource}
        loadData={() => dispatch(refreshCompanyData())}
        renderRow={c =>
          <Company key={c.symbol} {...c}
            strings={strings}
            editing={editing}
            selectedDate={selectedDate}
            onSelectDate={d => dispatch(selectSymbolAndDate(c.symbol, d))}
            onClick={() => dispatch(getSentimentHistory(c.symbol))}
            onRemove={() => dispatch(removeCompany(c))}
          />
        }
      />
    );
  }
}

Companies.propTypes = {
  dispatch: PropTypes.func.isRequired,
  strings: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  editing: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string,
};

/**
 * Here we're gonna select what state we want for this container.
 * We're gonna do a little bit of magic... we want both the strings
 * and the companies. But we're gonna add the stock data (which is
 * maintained in a separate state object) and the sentiment history
 * into our array of companies
 */
const select = state => {
  const myCompanies = [];
  state.companies.companies.map(c => {
    const myC = clone(c);
    myC.data = state.stockData[c.symbol] || [];
    myC.sentimentHistory = state.sentimentHistory[c.symbol] || [];
    myC.selected = state.selectedCompany === c.symbol;
    myC.entities = (myC.selected && state.selectedDate && state.entityHistory[c.symbol]
      && state.entityHistory[c.symbol][state.selectedDate]) || [];
    myCompanies.push(myC);
  });
  return {
    strings: state.strings,
    companies: myCompanies,
    editing: state.companies.editing,
    selectedDate: state.selectedDate,
  };
};

// Wrap the component to inject dispatch and state into it
export default connect(select)(Companies);
