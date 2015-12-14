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
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { headerStyle } from '../styles/styles';

export default class Header extends Component {
  render() {
    const {strings, editing, onEdit, onCancel} = this.props;
    const linkString = editing ? strings.cancel : strings.edit;
    const linkClick  = editing ? onCancel       : onEdit;
    return (
      <View style={headerStyle.header}>
        <Image
          style={headerStyle.icon}
          source={require('../images/ibm.png')}
        />
        <Text style={headerStyle.title}>{strings.portfolioInsights}</Text>
        <TouchableHighlight onPress={linkClick} underlayColor="transparent">
          <Text style={headerStyle.edit}>{linkString}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Header.propTypes = {
  strings: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
