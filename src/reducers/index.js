import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'
import userReducer from './user'

const rootReducer = combineReducers(Object.assign({}, {
  userReducer,
  routing: routeReducer,
}));

export default rootReducer;
