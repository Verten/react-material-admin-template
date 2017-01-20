import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// need this for material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import UserListPage from './UserListPage'

function setup(propOverrides, stateOverrides) {
  const props = Object.assign({}, propOverrides)

  const middlewares = [thunk]
  const store = configureMockStore(middlewares)(Object.assign({}, stateOverrides))

  const enzymeWrapper = mount(
    <Provider store={store}>
      <UserListPage {...props}/>
    </Provider>,
    {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      }
    }
  )
  return {
    props,
    enzymeWrapper
  }
}

describe('<UserListPage/>', () => {

  beforeEach(() => {

  })

  it('should call componentWillMount', () => {
    const { enzymeWrapper } = setup({}, {
      userReducer: Immutable.fromJS({
        users: null,
        isProcessing: false,
        error: null
      })
    })
    console.info(enzymeWrapper.debug())
    expect(enzymeWrapper).to.be.true
  })
})
