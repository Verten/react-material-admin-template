/**
 * Created by ebinhon on 1/19/2017.
 */
import API from '../../api'
import * as Utilities from '../../utilities'
import { USER_ERROR, USER_REQUEST, FETCH_USER, FETCH_USER_DETAIL } from '../../constants/ActionTypes'

// default error action
function _error() {
  return error => ({
    type: USER_ERROR,
    error
  })
}

// default request action
function userRequest() {
  return {
    type: USER_REQUEST
  }
}

function _fetchUser() {
  return users => ({
    type: FETCH_USER,
    users
  })
}

function _fetchUserDetail() {
  return user => ({
    type: FETCH_USER_DETAIL,
    user
  })
}

function shouldFetchUser(state) {
  const { users, isProcessing, didInvalidDate } = state.userReducer.toJS()
  if (!users || users.length === 0) {
    return true
  }
  if (isProcessing) {
    return false
  }
  return didInvalidDate
}

export function fetchUser() {
  const url = API[FETCH_USER]()
  const config = null
  return (dispatch, getState) => {
    if (shouldFetchUser(getState())) {
      return dispatch(Utilities.callAPI(url, config, userRequest(), _fetchUser(), _error()))
    }
  }
}

export function fetchUserDetail(id) {
  const url = API[FETCH_USER](id)
  const config = null
  return (dispatch) => {
    return dispatch(Utilities.callAPI(url, config, userRequest(), _fetchUserDetail(), _error()))
  }
}
