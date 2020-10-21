import { combineReducers } from 'redux'
import record from './Records'

export default (initialState) => {
  return combineReducers({
    records: record(initialState),
  })
}
