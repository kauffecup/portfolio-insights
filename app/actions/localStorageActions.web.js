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

import Constants from '../constants/Constants';

export function loadCompanies() {
  return new Promise((resolve) => {
    // /** Configure the companies either from the url or from local storage */
    let companies = [];
    let symbols = /[&?]symbols=([^&]+)/.exec(location.href);
    symbols = symbols && symbols[1].split(',');
    /** @type {Array.<Companies>} The array of companies initialized from url param or local storage */
    if (symbols && symbols.length) {
      companies = symbols.map(c => ({ symbol: c }) );
    } else {
      companies = localStorage.getItem(Constants.COMPANY_LOCAL_STORAGE);
      companies = companies ? JSON.parse(companies) : [];
    }
    resolve(companies);
  });
}

export function saveCompanies(companies) {
  return new Promise((resolve) => {
    localStorage.setItem(Constants.COMPANY_LOCAL_STORAGE, JSON.stringify(companies));
    resolve();
  });
}
