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

import React, { Component, PropTypes, View, Text, StyleSheet } from 'react-native';

export default class Header extends Component {
  render() {
    const {strings, editing, onEdit, onCancel} = this.props;
    const linkString = editing ? strings.cancel : strings.edit;
    const linkClick  = editing ? onCancel       : onEdit;
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{strings.portfolioInsights}</Text>
        <Text style={styles.edit} onPress={linkClick}>{linkString}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 30,
    height: 30,
    alignItems: 'flex-start',
    backgroundColor: '#4292c6',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontSize: 15,
    flex: 1
  },
  edit: {
    color: '#fff',
    fontSize: 15
  }
});

Header.propTypes = {
  strings: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
