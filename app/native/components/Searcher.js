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

import React, { Component, PropTypes, View, TextInput, ListView, Text, StyleSheet } from 'react-native';
import Constants from '../../constants/Constants';

/**
 * A Searcher.
 * Has an input! As you type in the input it searches for companies that match
 * what you're typing and displays those in an autocomplete drop down. It excludes
 * the companies that have already been added from the drop down, and limits the drop down
 * to 15 companies
 */
export default class Searcher extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      value: '',
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { companies, potentialCompanies } = nextProps;
    const { value } = this.state;
    // some potential companies magic. goes through these steps:
    // 1. filter out companies that match the current value. this allows us to immediately
    //    filter down the list as the user's typing and network requests may/may not be happening
    //    in the background. makes it feel snappier
    // 2. filter out companies that have already been added by the user
    // 3. limit the results to 15. this prevents the page feeling sluggish
    const regex = new RegExp('^' + value, 'i');
    const data = potentialCompanies.filter(pC =>
      value ? regex.test(pC.description) : false
    ).filter(pc =>
      !companies.some(c => (c.description === pc.description) && (c.symbol === pc.symbol))
    ).slice(0, 15);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  /**
   * When focusing the input, if there are 2 or more characters and nothing in the drop down,
   * issue a searchCompany call
   */
  handleFocus() {
    if (this.state.value.length > 1 && !this.props.potentialCompanies.length) {
      this.props.onSearch(this.state.value);
    }
  }

  /**
   * When adding a company... add the company, clear and refocus the input
   */
  handleClick(company) {
    this.props.onCompanyAdd(company);
    this.setState({value: ''});
    // this.refs.input.getDOMNode().focus();
  }

  /**
   * Where some of the magic happens.
   * As the user's typing debounce a searchCompany call by 300ms.
   */
  handleChange(value) {
    this.setState({value: value});
    if (!value) {
      this.props.onClear();
    }
    if (this._searchTimeout) {
      clearTimeout(this._searchTimeout);
    }
    this._searchTimeout = setTimeout(() => {
      if (this.state.value.length > 1) {
        this.props.onSearch(this.state.value);
      }
      delete this._searchTimeout;
    }, 300);
  }

  /**
   * It's render time.
   */
  render() {
    const { loadingStatus, potentialCompanies } = this.props;
    const { value, dataSource } = this.state;

    // if we're cleared or there's nothing in the input, don't display anything in the dropdown
    let pcComponent;
    if (loadingStatus === Constants.POTENTIAL_STATUS_CLEAR || !value) {
      pcComponent = null;
    // if we're loading and don't have any companies loaded already, show the loading message
    } else if (loadingStatus === Constants.POTENTIAL_STATUS_LOADING && !potentialCompanies.length) {
      pcComponent = <Text style={styles.text}>{this.props.strings.loading}</Text>;
    // otherwise we've gotten stuff back, if we don't have anythin' show the no results message
    } else if (!potentialCompanies.length) {
      pcComponent = <Text style={styles.text}>{this.props.strings.noResults}</Text>;
    // if none of these cases were hit, we proceed on as usual with our potential companies array
    } else {
      pcComponent = (<ListView
        style={styles.list}
        dataSource={dataSource}
        renderRow={pC => <Text style={styles.text}>{pC.description + '(' + pC.symbol + ')'}</Text>}
      />);
    }

    // once we've done our magic, go on with rendering as normal
    return (
      <View style={styles.searcher} onFocus={this.handleFocus.bind(this)}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={this.handleChange.bind(this)}
          placeholder={this.props.strings.companySearch}
          ref="input"
        />
        {pcComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searcher: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
  },
  text: {
    padding: 5,
  },
});

Searcher.propTypes = {
  strings: PropTypes.object.isRequired,
  potentialCompanies: PropTypes.array.isRequired,
  loadingStatus: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onCompanyAdd: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
};
