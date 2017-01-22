import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { UserDetail } from './UserDetail'

function setup(propOverrides) {
  const props = Object.assign({
    data: null,
    isProcessing: false,
  }, propOverrides)

  const enzymeWrapper = shallow(<UserDetail {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('<UserDetail/>', () => {
  it('should render self when fetching user has been done', () => {
    const props = {
      data: { name: 'test' },
      isProcessing: false,
    }
    const { enzymeWrapper } = setup(props)
    const actual = enzymeWrapper.find('form').children().children()
    expect(actual).to.have.length(6)
  })

  it('should render loading when is fetching user or user is null', () => {
    const props = {
      data: null,
      isProcessing: true,
    }
    const { enzymeWrapper } = setup(props)
    const actual = enzymeWrapper.find('form').children()
    expect(actual).to.have.length(1)
    expect(actual.prop('status')).to.equal('loading')
  })

  it('Link to should equal "/user" ', () => {
    const preProps = {
      data: { name: 'test' },
    }
    /* eslint-disable no-unused-vars */
    const { props, enzymeWrapper } = setup(preProps)
    const backLink = enzymeWrapper.find('Link')
    expect(backLink).to.have.length(1)
    expect(backLink.prop('to')).to.equal('/users')
  })
})
