import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import <%= componentCC %> from '../../src/js/components/<%= component %>'

describe('<%= component %>.js', () => {
  let wrapper

  before(() => {
    wrapper = shallow(
      <<%= componentCC %>>
        <div className="test-container">my <%= componentCC %> content</div>
      </<%= componentCC %>>
    )
  })

  it('should renders the component', () => {
    expect(wrapper.length).to.eql(1)
  })
})
