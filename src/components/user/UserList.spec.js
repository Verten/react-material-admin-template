import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { UserList } from './UserList'

function setup(propOverrides) {
  const props = Object.assign({
    data: null,
    isProcessing: false,
  }, propOverrides)

  const enzymeWrapper = shallow(<UserList {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('<UserList/>', () => {
  it('should render self with table', () => {
    const data = [{ id: 1 }, { id: 2 }]
    const props = {
      data,
      isProcessing: false,
    }
    const header = ['ID', 'Avatar', 'Name', 'Category', 'Edit']
    const { enzymeWrapper } = setup(props)
    const actualBody = enzymeWrapper.find('TableBody').children()
    const actualHeader = enzymeWrapper.find('TableHeader').find('TableRow > TableHeaderColumn')

    expect(actualHeader).to.have.length(5)
    actualHeader.forEach(function (node, index) {
      expect(node.children().text()).to.equal(header[index])
    })
    expect(actualBody).to.have.length(data.length)
  })

  it('should render self with loading when fetching data', () => {
    const props = {
      data: null,
      isProcessing: true,
    }
    const { enzymeWrapper } = setup(props)
    const actual = enzymeWrapper.find('TableBody').children().prop('status')

    expect(actual).to.equal('loading')
  })

  it('should not render TableRow when fetching empty data', () => {
    const props = {
      data: [],
      isProcessing: false,
    }
    const { enzymeWrapper } = setup(props)
    const actual = enzymeWrapper.find('TableBody').children()

    expect(actual).to.have.length(0)
  })

})
