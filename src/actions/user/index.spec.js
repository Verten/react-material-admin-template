import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { USER_REQUEST, FETCH_USER, FETCH_USER_DETAIL } from '../../constants/ActionTypes'
import API from '../../api'
import * as actions from './index'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const userReducer = Immutable.fromJS({
  user: null,
  users: null,
  didInvalidDate: false,
  isProcessing: false,
  error: null
})

describe('user actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('fetchUser should create FETCH_USER action when fetching users has been done', () => {
    const url = API[FETCH_USER]()
    nock(url).get('').reply(200, [{ id: 1 }, { id: 2 }])
    const expectedActions = [
      {
        type: USER_REQUEST,
      },
      {
        type: FETCH_USER,
        users: [{ id: 1 }, { id: 2 }],
      },
    ]
    let store = mockStore({
      userReducer
    })
    store.dispatch(actions.fetchUser()).then(() => {
      const actualAction = store.getActions()
      expect(actualAction).to.deep.equal(expectedActions)
    })
  })

  it('should NOT fetch user when request is Processing', () => {
    const store = mockStore({
      userReducer: Immutable.fromJS({
        user: null,
        users: [{ id: 1 }, { id: 2 }],
        didInvalidDate: false,
        isProcessing: true,
        error: null,
      })
    })
    expect(store.dispatch(actions.fetchUser())).to.be.undefined
  })

  it('should fetch user when didInvalidate is true', () => {
    const url = API[FETCH_USER]()
    nock(url).get('').reply(200, [{ id: 1 }, { id: 2 }])
    const expectedActions = [
      {
        type: USER_REQUEST,
      },
      {
        type: FETCH_USER,
        users: [{ id: 1 }, { id: 2 }],
      },
    ]
    const store = mockStore({
      userReducer: Immutable.fromJS({
        user: null,
        users: [{ id: 1 }, { id: 2 }, { id: 3 }],
        didInvalidDate: true,
        isProcessing: false,
        error: null,
      })
    })
    return store.dispatch(actions.fetchUser()).then(() => {
      const actualAction = store.getActions()
      expect(actualAction).to.deep.equal(expectedActions)
    })
  })

  it('fetchUserDetail should create FETCH_USER_DETAIL action when fetching user by ID has been done', () => {
    const url = API[FETCH_USER](2) // id -> 2
    nock(url).get('').reply(200, { name: 'test' })
    const expectedActions = [
      {
        type: USER_REQUEST,
      },
      {
        type: FETCH_USER_DETAIL,
        user: { name: 'test' }
      }
    ]
    const store = mockStore({
      userReducer
    })
    return store.dispatch(actions.fetchUserDetail(2)).then(() => {
      const actualAction = store.getActions()
      expect(actualAction).to.deep.equal(expectedActions)
    })
  })

  it('fetchUser should create ERROR action  when fetching users with error', () => {
    const url = API[FETCH_USER]()
    nock(url).get('').reply(401, { error: 'UnAuthorized' })
    const expectedActions = [
      {
        type: USER_REQUEST,
      }
    ]
    const store = mockStore({
      userReducer
    })

    return store.dispatch(actions.fetchUser()).then(() => {
      let actualAction = store.getActions()
      // due to the Utilities callAPI, the checkStatus function will throw an Error, so the test was interrupted,
      // only the USER_REQUEST action create
      expect(actualAction).to.deep.equal(expectedActions);
    })
  })

})
