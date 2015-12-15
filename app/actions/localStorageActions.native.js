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

import { AsyncStorage } from 'react-native';
import Constants from '../constants/Constants';

export function loadCompanies() {
  return AsyncStorage.getItem(Constants.COMPANY_LOCAL_STORAGE).then(c =>
    c ? JSON.parse(c) : []
  );
}

export function saveCompanies(companies) {
  return AsyncStorage.setItem(Constants.COMPANY_LOCAL_STORAGE, JSON.stringify(companies));
}
