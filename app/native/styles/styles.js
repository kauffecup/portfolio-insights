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

export const accentColor = '#4292c6';
export const accentColor2 = '#08306b';
export const backgroundColor = '#f0f0f0';
export const secondaryTextColor = '#969696';
export const negativeColor = '#cb181d';
export const positiveColor = '#2ca02c';

export const leftPadding = 15;
export const rightPadding = 15;

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
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: 5,
    paddingBottom: 5,
  },
  list: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: secondaryTextColor,
  },
  row: {
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: accentColor,
  },
  text: {
    color: '#fff',
  },
});

export const companiesStyle = StyleSheet.create({
  companies: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: secondaryTextColor,
  },
});

export const companyStyle = StyleSheet.create({
  company: {
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: 5,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 10,
  },
  chart: {
    height: 80,
    marginTop: 5,
  },
});

export const activityIndicatorStyle = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    marginTop: 0,
    height: 30,
  },
  description: {
    height: 0,
    width: 0,
  },
});

function getChange(color) {
  return {
    backgroundColor: color,
    color: '#fff',
    width: 50,
    padding: 2,
    textAlign: 'center',
    borderRadius: 5,
    marginLeft: 10,
  };
}
export const avatarStyle = StyleSheet.create({
  avatar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbol: {
    color: accentColor,
    fontSize: 20,
    width: 60,
  },
  description: {
    flex: 1,
  },
  neutral: getChange(secondaryTextColor),
  negative: getChange(negativeColor),
  positive: getChange(positiveColor),
  last: {
  },
});
