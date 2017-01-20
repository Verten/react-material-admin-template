import userReducer from './index'
import { USER_ERROR, USER_REQUEST, FETCH_USER, FETCH_USER_DETAIL } from '../../constants/ActionTypes'
import { expect } from 'chai'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  user: null,
  users: null,
  didInvalidDate: false,
  isProcessing: false,
  error: null
})

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(
      userReducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  it('should handle USER_REQUEST', () => {
    const expectState = Immutable.fromJS({
      user: null,
      users: null,
      didInvalidDate: false,
      isProcessing: true,
      error: null,
    })
    expect(
      userReducer(undefined, {
        type: USER_REQUEST
      })
    ).to.deep.equal(expectState)
  })

  it('should handle USER_ERROR', () => {
    const expectState = Immutable.fromJS({
      user: null,
      users: null,
      didInvalidDate: true,
      isProcessing: false,
      error: Immutable.fromJS({
        error: 'Error',
      }),
    })
    expect(
      userReducer(undefined, {
        type: USER_ERROR,
        error: {
          error: 'Error'
        },
      })
    ).to.deep.equal(expectState)
  })

  it('should handle FETCH_USER', () => {
    const expectState = Immutable.fromJS({
      user: null,
      users: Immutable.fromJS(
        [
          { id: 1 },
          { id: 2 }
        ]
      ),
      didInvalidDate: false,
      isProcessing: false,
      error: null,
    })
    expect(
      userReducer(undefined, {
        type: FETCH_USER,
        users: [
          { id: 1 },
          { id: 2 }
        ],
      })
    ).to.deep.equal(expectState)
  })

  it('should handle FETCH_USER_DETAIL', () => {
    const expectState = Immutable.fromJS({
      user: Immutable.fromJS({
        name: 'test'
      }),
      users: null,
      didInvalidDate: false,
      isProcessing: false,
      error: null,
    })
    expect(
      userReducer(undefined, {
        type: FETCH_USER_DETAIL,
        user: { name: 'test' }
      })
    ).to.deep.equal(expectState)
  })
})
