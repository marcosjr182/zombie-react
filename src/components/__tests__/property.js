import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Property from '../property'

const item = { name: 'Water', qty: 5 }
let wrapper = shallow(<Property name={item.name} value={item.qty} />)

describe('Property component', () => {

  it('should render a property correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should accept an optional columns props', () =>{
    wrapper = shallow(<Property name={item.name} value={item.qty} columns='3' /> )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
