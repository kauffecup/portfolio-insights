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

import { StyleSheet } from 'react-native';

const accentColor = '#4292c6';

export const appStyle = StyleSheet.create({
  portfolioInsights: {
    flexDirection: 'column',
    flex: 1,
  },
});

export const headerStyle = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 30,
    height: 30,
    alignItems: 'flex-start',
    backgroundColor: accentColor,
    flexDirection: 'row',
  },
  icon: {
    resizeMode: 'contain',
    width: 45,
    height: 15,
    marginRight: 3,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
  },
  edit: {
    color: '#fff',
    fontSize: 15,
  },
});

export const searcherStyle = StyleSheet.create({
  searcher: {
    flex: 1,
  },
  input: {
    height: 40,
  },
  text: {
    padding: 5,
  },
});
