/**
 * Created by ebinhon on 1/22/2017.
 */
import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ConnectedUserDetailPage, { UserDetailPage } from './UserDetailPage'

function setup(propOverrides) {
  const props = Object.assign({
    actions: {
      fetchUserDetail: spy(),
    },
    user: null,
    isProcessing: false,
    params: null,
  }, propOverrides)

  const enzymeWrapper = mount(
    <UserDetailPage {...props}/>
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

describe('<UserDetailPage/>', () => {

  beforeEach(() => {

  })

  it('should call componentWillMount and actions.fetchUserDetail', () => {
    spy(UserDetailPage.prototype, 'componentWillMount')
    const preProps = {
      params: {
        id: 1,
      }
    }
    const { enzymeWrapper } = setup(preProps)
    expect(UserDetailPage.prototype.componentWillMount.calledOnce).to.be.true
    expect(enzymeWrapper.prop('actions').fetchUserDetail.calledOnce).to.be.true
  })

  // for testing connect(mapStateToProps,mapDispatch)(UserDetailPage)
  it('should call mapStateToProps and mapDispatch correctly', () => {
    const state = {
      userReducer: Immutable.fromJS({
        user: null,
        isProcessing: false,
        error: null,
      })
    }
    const props = {
      params: {
        id: 1,
      },
    }
    const middlewares = [thunk]
    const store = configureMockStore(middlewares)(Object.assign({}, state))
    const enzymeWrapper = mount(
      <Provider store={store}>
        <ConnectedUserDetailPage {...props}/>
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
    expect(enzymeWrapper.find('UserDetailPage').prop('user')).to.be.null
    expect(enzymeWrapper.find('UserDetailPage').prop('isProcessing')).to.be.false
    expect(enzymeWrapper.find('UserDetailPage').prop('error')).to.be.null
    expect(enzymeWrapper.find('UserDetailPage').prop('actions')).to.have.deep.property('fetchUser')
    expect(enzymeWrapper.find('UserDetailPage').prop('actions')).to.have.deep.property('fetchUserDetail')
  })
})
