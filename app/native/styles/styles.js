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
const accentColor2 = '#08306b';
const backgroundColor = '#f0f0f0';
const secondaryTextColor = '#969696';
const negativeColor = '#cb181d';
const positiveColor = '#2ca02c';

const leftPadding = 7;
const rightPadding = 7;

export const appStyle = StyleSheet.create({
  portfolioInsights: {
    flexDirection: 'column',
    flex: 1,
  },
});

export const headerStyle = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingBottom: 20,
    height: 30,
    alignItems: 'center',
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
    height: 40,
  },
  searcherWithResults: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: secondaryTextColor,
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: 5,
    paddingBottom: 5,
  },
  list: {
    flex: 1,
  },
  text: {
    padding: 5,
  },
});

export const companiesStyle = StyleSheet.create({
  companies: {
    flex: 1,
  },
});

export const companyStyle = StyleSheet.create({
  company: {
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export const avatarStyle = StyleSheet.create({
  avatar: {
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {
    color: accentColor,
    fontSize: 20,
    width: 70,
  },
  description: {
  },
  neutral: {
    color: secondaryTextColor,
    width: 70,
  },
  negative: {
    color: negativeColor,
    width: 70,
  },
  positive: {
    color: positiveColor,
    width: 70,
  },
  last: {
  },
});
