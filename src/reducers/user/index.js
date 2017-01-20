/**
 * Created by ebinhon on 1/19/2017.
 */
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  user: null,
  users: null,
  didInvalidDate: false,
  isProcessing: false,
  error: null
})

function userReducer(state = initialState, action) {
  const operation = {
    USER_REQUEST: () => {
      return state.merge({
        isProcessing: true,
        didInvalidDate: false
      })
    },
    FETCH_USER: () => {
      let users = state.get('users') ? state.get('users').toJS() : state.get('users')
      users = action.users
      return state.merge({
        users: Immutable.fromJS(users),
        isProcessing: false,
        didInvalidDate: false,
        error: null
      })
    },
    FETCH_USER_DETAIL: () => {
      let user = state.get('user') ? state.get('user').toJS() : state.get('user')
      user = action.user
      return state.merge({
        user: Immutable.fromJS(user),
        isProcessing: false,
        didInvalidDate: false,
        error: null
      })
    },
    USER_ERROR: () => {
      let error = state.get('error') ? state.get('error').toJS() : state.get('error')
      error = action.error
      return state.merge({
        error: Immutable.fromJS(error),
        isProcessing: false,
        didInvalidDate: true
      })
    }
  }
  if (operation[action.type]) {
    return operation[action.type]()
  }
  return state
}

export default userReducer
