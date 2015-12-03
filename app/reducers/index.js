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

import clone        from 'clone';
import assign       from 'object-assign';
import Constants    from '../constants/Constants';
import initialState from './initialState';

/**
 * Helper method to store the companies in the browser's local storage
 */
function _updateLocalStorage(companies) {
  localStorage.setItem(Constants.COMPANY_LOCAL_STORAGE, JSON.stringify(companies));
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case Constants.ADD_COMPANY:
    const newCompanies = [action.company, ...state.companies.companies];
    _updateLocalStorage(newCompanies);
    return assign({}, state, {
      companies: assign({}, state.companies, {
        companies: newCompanies
      })
    });

  case Constants.REMOVE_COMPANY:
    const symbol = action.company.symbol || action.company;
    // remove stock data
    const stockDataMap = clone(state.stockData);
    delete stockDataMap[symbol];
    // remove sentiment data
    const sentimentDataMap = clone(state.sentimentHistory);
    delete sentimentDataMap[symbol];
    // remove entity data
    const entityHistoryMap = clone(state.entityHistory);
    delete entityHistoryMap[symbol];
    // now remove company
    const newCompaniess = state.companies.companies.filter(c => c.symbol !== action.company.symbol);
    _updateLocalStorage(newCompanies);
    return assign({}, state, {
      stockData: stockDataMap,
      sentimentHistory: sentimentDataMap,
      entityHistory: entityHistoryMap,
      companies: assign({}, state.companies, {
        companies: newCompaniess
      })
    });

  case Constants.EDIT_ENTER:
    return assign({}, state, {
      companies: assign({}, state.companies, {
        editing: true
      })
    });

  case Constants.EDIT_CANCEL:
    return assign({}, state, {
      companies: assign({}, state.companies, {
        editing: false
      })
    });

  case Constants.SYMBOL_AND_DATE:
    return assign({}, state, {
      selectedCompany: action.symbol,
      selectedDate: action.date
    });

  case Constants.SELECT_COMPANY:
    return assign({}, state, {
      selectedCompany: action.symbol
    });

  case Constants.DESELECT_COMPANY:
    return assign({}, state, {
      selectedCompany: null
    });

  case Constants.STOCK_PRICE_DATA:
    return assign({}, state, {
      stockData: assign({}, state.stockData, action.data)
    });

  case Constants.SENTIMENT_HISTORY_LOADING:
    const newObj = {};
    newObj[action.symbol] = 'loading';
    return assign({}, state, {
      sentimentHistory: assign({}, state.sentimentHistory, newObj)
    });

  case Constants.SENTIMENT_HISTORY_DATA:
    const newSentObj = {};
    const newEntityObj = {};
    newSentObj[action.symbol] = action.data.sentiment;
    newEntityObj[action.symbol] = action.data.entities;
    return assign({}, state, {
      sentimentHistory: assign({}, state.sentimentHistory, newSentObj),
      entityHistory: assign({}, state.entityHistory, newEntityObj)
    });

  case Constants.COMPANIES_LOADING:
    return assign({}, state, {
      potentialCompanies: assign({}, state.potentialCompanies, {
        status: Constants.POTENTIAL_STATUS_LOADING
      })
    });

  case Constants.COMPANY_DATA:
    return assign({}, state, {
      potentialCompanies: assign({}, state.potentialCompanies, {
        status: Constants.POTENTIAL_STATUS_RECEIVED,
        companies: action.companies
      })
    });

  case Constants.CLEAR_POTENTIAL_COMPANIES:
    return assign({}, state, {
      potentialCompanies: assign({}, state.potentialCompanies, {
        status: Constants.POTENTIAL_STATUS_CLEAR,
        companies: []
      })
    });

  case Constants.STRING_DATA:
    return assign({}, state, {
      strings: action.strings
    });

  default:
    return state;
  }
}
