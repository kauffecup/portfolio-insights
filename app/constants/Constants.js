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

import keyMirror from 'keymirror';

export default keyMirror({
  COMPANY_LOCAL_STORAGE: null,
  COMPANIES_LOADING: null,
  COMPANY_DATA: null,

  ADD_COMPANY: null,
  REMOVE_COMPANY: null,
  SELECT_COMPANY: null,
  DESELECT_COMPANY: null,

  POTENTIAL_STATUS_CLEAR: null,
  POTENTIAL_STATUS_LOADING: null,
  POTENTIAL_STATUS_RECEIVED: null,
  CLEAR_POTENTIAL_COMPANIES: null,

  STOCK_PRICE_LOADING: null,
  STOCK_PRICE_DATA: null,

  STRING_DATA: null,

  TWEETS_LOADING: null,
  TWEETS_DATA: null,

  SENTIMENT_HISTORY_LOADING: null,
  SENTIMENT_HISTORY_DATA: null,

  EDIT_ENTER: null,
  EDIT_CANCEL: null,

  SYMBOL_AND_DATE: null
});
