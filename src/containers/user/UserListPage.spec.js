import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// need this for material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ConnectedUserListPage, { UserListPage } from './UserListPage'

function setup(propOverrides) {
  const props = Object.assign({
    actions: {
      fetchUser: sinon.spy(),
    },
    users: null,
    isProcessing: false,
    error: null,
  }, propOverrides)

  const enzymeWrapper = mount(
    <UserListPage {...props}/>
    ,
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

  it('should call componentDidMount and actions.fetchUser', () => {
    sinon.spy(UserListPage.prototype, 'componentDidMount')
    /* eslint-disable no-unused-vars */
    const { enzymeWrapper } = setup()
    expect(UserListPage.prototype.componentDidMount.calledOnce).to.be.true
    expect(enzymeWrapper.props().actions.fetchUser.calledOnce).to.be.true
  })

  it('should render UserList with props', () => {
    let preProps = {
      users: [{ id: 1 }, { id: 2 }],
      isProcessing: false,
    }
    const { enzymeWrapper } = setup(preProps)
    expect(enzymeWrapper.find('UserList').prop('data')).to.deep.equal(preProps.users)
    expect(enzymeWrapper.find('UserList').prop('isProcessing')).to.equal(preProps.isProcessing)
  })

  // for testing connect(mapStateToProps,mapDispatch)(UserListPage)
  it('should call mapStateToProps and mapDispatch correctly', () => {
    const state = {
      userReducer: Immutable.fromJS({
        users: null,
        isProcessing: false,
        error: null,
      })
    }
    const middlewares = [thunk]
    const store = configureMockStore(middlewares)(Object.assign({}, state))
    const enzymeWrapper = mount(
      <Provider store={store}>
        <ConnectedUserListPage />
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
    expect(enzymeWrapper.find('UserListPage').prop('users')).to.be.null
    expect(enzymeWrapper.find('UserListPage').prop('error')).to.be.null
    expect(enzymeWrapper.find('UserListPage').prop('isProcessing')).to.be.false
    expect(enzymeWrapper.find('UserListPage').prop('actions')).to.have.deep.property('fetchUser')
    expect(enzymeWrapper.find('UserListPage').prop('actions')).to.have.deep.property('fetchUserDetail')
  })

})
